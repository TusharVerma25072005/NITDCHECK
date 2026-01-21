# Attendance Automation Server

A face recognition-based attendance automation system using InsightFace and FAISS for efficient face embeddings search.

## Features

- **Face Recognition**: Uses InsightFace for accurate face detection and recognition
- **Efficient Search**: FAISS vector database for fast similarity search
- **Modular Architecture**: Separate workers for preprocessing, dataset management, recognition, and logging
- **Attendance Logging**: Automatic JSON-based attendance records with timestamps
- **Scalable Dataset**: Support for multiple student years/classes

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd attendance_automation_server
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

## Project Structure

```
attendance_automation_server/
├── main.py                 # Main application entry point
├── config.py              # Configuration settings
├── log_setup.py           # Logging configuration
├── requirements.txt       # Python dependencies
├── dataset/               # Student face images organized by year
│   ├── 1st_year/
│   ├── 2nd_year/
│   ├── 3rd_year/
│   └── 4th_year/
├── model/                 # FAISS index and ID mappings
├── attendance_logs/       # JSON attendance records
├── worker/                # Modular worker components
│   ├── preprocessing_worker.py
│   ├── dataset_worker.py
│   ├── recognizer_worker.py
│   ├── deletion_worker.py
│   └── json_worker.py
└── scripts/               # Utility scripts
```

## Dataset Preparation

Organize student face images in the `dataset/` directory with the following structure:

```
dataset/
├── 1st_year/
│   ├── branch1/
│   │   ├── student_001/
│   │   │   ├── img1.jpg
│   │   │   ├── img2.jpg
│   │   │   └── img3.jpg
│   │   └── student_002/
│   │       ├── img1.jpg
│   │       └── img2.jpg
│   └── branch2/
│       └── ...
├── 2nd_year/
│   └── ...
```

- Each year should have branch subdirectories
- Each branch should contain student subdirectories
- Each student should have their own subdirectory with multiple clear face images (3-5 recommended)
- Use high-quality, well-lit images
- Ensure faces are clearly visible and not obstructed

## Usage

### 1. Build the Face Recognition Dataset

Train the model with student face images:

```bash
python main.py --build-dataset
```

This will:

- Process all images in the dataset directory
- Extract face embeddings using InsightFace
- Create/update FAISS index for efficient search
- Save the model to the `model/` directory

### 2. Recognize Attendance from Image

Process a classroom image to mark attendance:

```bash
python main.py --year 1st_year --branch branch1 --class-id CS101 --teacher-id T001
```

This will:

- Detect faces in the provided image (placed at `attendance_logs/images/image.png`)
- Match faces against the trained model for the specified year and branch
- Log attendance for recognized students
- Save attendance record as JSON in `attendance_logs/`

### Command Line Options

- `--build-dataset`: Build/update the face recognition model
- `--year <year>`: Year for recognition (e.g., 1st_year)
- `--branch <branch>`: Branch for recognition (e.g., branch1)
- `--class-id <id>`: Class identifier for attendance logging
- `--teacher-id <id>`: Teacher identifier for attendance logging

## Attendance Records

Attendance records are saved as JSON files in the `attendance_logs/` directory with the following format:

```json
{
  "timestamp": "2024-01-15T10:30:00",
  "class_id": "CS101",
  "teacher_id": "T001",
  "present_students": ["student_001", "student_003", "student_005"]
}
```

## Configuration

Modify `config.py` to customize:

- Dataset and model directories
- Face analysis model parameters
- Recognition thresholds
- Logging settings

## Troubleshooting

### Common Issues

1. **No faces detected**: Ensure images are clear and well-lit
2. **Low recognition accuracy**: Add more training images per student
3. **Model not found**: Run `--build-dataset` before recognition
4. **Import errors**: Install all dependencies from requirements.txt

### Logs

Check `logs/pipeline.log` for detailed execution logs and error messages.

## Dependencies

- insightface: Face analysis and recognition
- faiss-cpu: Vector similarity search
- opencv-python: Image processing
- numpy: Numerical computations

## License

[Add your license information here]
