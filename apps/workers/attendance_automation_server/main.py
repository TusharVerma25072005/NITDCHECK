import os
import sys
from insightface.app import FaceAnalysis
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from config import *
from log_setup import setup_logger
from worker.preprocessing_worker import preproces
from worker.dataset_worker import save_or_append_index, load_index_and_idmap
from worker.recognizer_worker import recognize
from worker.json_worker import save_attendance_json

logger = setup_logger()

def build_dataset():
    """Build or update the face recognition dataset from images in dataset directory."""
    logger.info("Starting dataset building process...")

    app = FaceAnalysis(name=FACE_ANALYSIS_MODEL)
    app.prepare(ctx_id=0)

    # Process all year directories
    for year_dir in os.listdir(DATASET_DIR):
        year_path = os.path.join(DATASET_DIR, year_dir)
        if os.path.isdir(year_path):
            logger.info(f"Processing {year_dir}...")

            # Process each branch within the year
            for branch_dir in os.listdir(year_path):
                branch_path = os.path.join(year_path, branch_dir)
                if os.path.isdir(branch_path):
                    logger.info(f"Processing {year_dir}/{branch_dir}...")

                    labels, embeddings = preproces(app, branch_path)

                    if len(labels) > 0:
                        model_subdir = f"{year_dir}_{branch_dir}"
                        success = save_or_append_index(embeddings, labels, os.path.join(MODEL_DIR, model_subdir), logger)
                        if success:
                            logger.info(f"Successfully processed {len(labels)} faces from {year_dir}/{branch_dir}")
                        else:
                            logger.error(f"Failed to save embeddings for {year_dir}/{branch_dir}")
                    else:
                        logger.warning(f"No faces found in {year_dir}/{branch_dir}")

    logger.info("Dataset building completed.")

def recognize_attendance(year, branch, class_id, teacher_id, image_path=None):
    """Recognize faces in an image and log attendance."""
    logger.info(f"Starting attendance recognition for class {class_id}...")

    # Prefer branch-specific model (year_branch). If missing, fall back to year-level model (year).
    model_subdir = f"{year}_{branch}"
    model_path = os.path.join(MODEL_DIR, model_subdir)

    index_file = os.path.join(model_path, "faiss_index.bin")
    if not os.path.exists(index_file):
        # Try year-level model (for older saved models or if dataset was built per-year)
        year_model_path = os.path.join(MODEL_DIR, year)
        year_index_file = os.path.join(year_model_path, "faiss_index.bin")
        if os.path.exists(year_index_file):
            logger.warning(f"Branch-specific model not found for {year}/{branch}; falling back to year-level model.")
            model_path = year_model_path
        else:
            logger.error(f"Model not found for year {year} and branch {branch}. Please build the dataset first.")
            return None

    app = FaceAnalysis(name=FACE_ANALYSIS_MODEL)
    app.prepare(ctx_id=0)

    index, id_map = load_index_and_idmap(model_path, logger)

    # Use provided image path if supplied, otherwise fall back to default IMAGE_PATH from config
    if image_path is None:
        image_path = IMAGE_PATH

    recognized_students = recognize(app, image_path, index, id_map)

    # Filter out "Unknown" students
    present_students = {student for student in recognized_students if student != "Unknown"}

    if present_students:
        filepath = save_attendance_json(present_students, class_id, teacher_id, ATTENDANCE_LOGS_DIR)
        logger.info(f"Attendance logged for {len(present_students)} students: {sorted(present_students)}")
        logger.info(f"Attendance record saved to: {filepath}")
        # Delete the input image after processing
        if os.path.exists(image_path):
            os.remove(image_path)
            logger.info(f"Input image deleted: {image_path}")
        return filepath
    else:
        logger.info("No students recognized in the image.")
        return None

def main():
    """Main function to run the attendance automation server."""
    import argparse

    parser = argparse.ArgumentParser(description="Attendance Automation Server")
    parser.add_argument("--build-dataset", action="store_true", help="Build/update the face recognition dataset")
    parser.add_argument("--year", type=str, help="Year for recognition")
    parser.add_argument("--branch", type=str, help="Branch for recognition")
    parser.add_argument("--class-id", type=str, help="Class ID for attendance logging")
    parser.add_argument("--teacher-id", type=str, help="Teacher ID for attendance logging")
    parser.add_argument("--image-path", type=str, help="Path to classroom image for recognition")

    args = parser.parse_args()

    if args.build_dataset:
        build_dataset()
    if args.year and args.branch and args.class_id and args.teacher_id:
        # If an image path was provided, override the default IMAGE_PATH from config
        if args.image_path:
            recognize_attendance(args.year, args.branch, args.class_id, args.teacher_id, args.image_path)
        else:
            recognize_attendance(args.year, args.branch, args.class_id, args.teacher_id)
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
