#!/usr/bin/env python3
"""
Script to recognize attendance from an image.
Usage: python scripts/recognize.py <year> <class_id> <teacher_id>
"""

import os
import sys
import argparse
from insightface.app import FaceAnalysis

# Suppress stdout to avoid console output
sys.stdout = open(os.devnull, 'w')

# Add the parent directory to the path to import modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from config import *
from log_setup import setup_logger
from worker.dataset_worker import load_index_and_idmap
from worker.recognizer_worker import recognize
from worker.json_worker import save_attendance_json

logger = setup_logger()

def main():
    """Recognize faces in an image and log attendance."""
    parser = argparse.ArgumentParser(description="Recognize attendance from image")
    parser.add_argument("year", help="Year for recognition")
    parser.add_argument("branch", help="Branch for recognition")
    parser.add_argument("class_id", help="Class ID for attendance logging")
    parser.add_argument("teacher_id", help="Teacher ID for attendance logging")
    args = parser.parse_args()

    logger.info(f"Starting attendance recognition for class {args.class_id}...")

    model_subdir = f"{args.year}_{args.branch}"
    model_path = os.path.join(MODEL_DIR, model_subdir)
    if not os.path.exists(os.path.join(model_path, "faiss_index.bin")):
        logger.error(f"Model not found for year {args.year} and branch {args.branch}. Please build the dataset first using scripts/train.py")
        return

    app = FaceAnalysis(name=FACE_ANALYSIS_MODEL)
    app.prepare(ctx_id=0)

    index, id_map = load_index_and_idmap(model_path, logger)

    recognized_students = recognize(app, IMAGE_PATH, index, id_map)

    # Filter out "Unknown" students
    present_students = {student for student in recognized_students if student != "Unknown"}

    if present_students:
        filepath = save_attendance_json(present_students, args.class_id, args.teacher_id, ATTENDANCE_LOGS_DIR)
        logger.info(f"Attendance logged for {len(present_students)} students: {sorted(present_students)}")
        logger.info(f"Attendance record saved to: {filepath}")
        # Delete the input image after processing
        if os.path.exists(IMAGE_PATH):
            os.remove(IMAGE_PATH)
            logger.info(f"Input image deleted: {IMAGE_PATH}")
    else:
        logger.info("No students recognized in the image.")

if __name__ == "__main__":
    main()
