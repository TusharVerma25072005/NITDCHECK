import os

# Base directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Dataset configuration
DATASET_DIR = os.path.join(BASE_DIR, "dataset")

# Model configuration
MODEL_DIR = os.path.join(BASE_DIR, "encodings")

# Attendance logs configuration
ATTENDANCE_LOGS_DIR = os.path.join(BASE_DIR, "attendance_logs")

# Face analysis model
FACE_ANALYSIS_MODEL = "buffalo_l"

# Recognition threshold (distance threshold for FAISS)
RECOGNITION_THRESHOLD = 0.35

# GPU context (0 for CPU, 1 for GPU)
FACE_ANALYSIS_CTX_ID = 0

# Image path for recognition
IMAGE_PATH = os.path.join(BASE_DIR, "attendance_logs", "images", "image.png")
