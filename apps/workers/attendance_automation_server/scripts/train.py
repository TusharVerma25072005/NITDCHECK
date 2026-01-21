#!/usr/bin/env python3
"""
Script to build or update the face recognition dataset.
Usage: python scripts/train.py
"""

import os
import sys
import logging
import warnings
from insightface.app import FaceAnalysis

warnings.filterwarnings("ignore")
sys.stdout = open('/dev/null', 'w')

# Add the parent directory to the path to import modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from config import *
from log_setup import setup_logger
from worker.preprocessing_worker import preproces
from worker.dataset_worker import save_or_append_index

logger = setup_logger()
logger.handlers = [h for h in logger.handlers if not isinstance(h, logging.StreamHandler)]
logger.setLevel(logging.ERROR)
file_handler = logging.FileHandler('train.log')
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

def main():
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

if __name__ == "__main__":
    main()
