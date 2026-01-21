# TODO List for Dataset Reorganization and Attendance System Update

## Dataset Reorganization

- [x] Create branch subfolders in each year directory (e.g., dataset/1st_year/branch1/)
- [x] Move existing student folders into appropriate branch subfolders
- [x] Update preprocessing_worker.py to handle branch-level iteration
- [x] Update main.py to accept branch argument for recognition
- [x] Update scripts/recognize.py to accept branch argument
- [x] Update README.md to reflect new dataset structure

## Code Updates

- [x] Update main.py: Modify build_dataset() to save models per year-branch combination
- [x] Update main.py: Update recognize_attendance() to accept branch parameter and use year-branch model path
- [x] Update main.py: Add --branch to argument parser
- [x] Update scripts/train.py: Mirror changes from main.py for dataset building
- [x] Update scripts/recognize.py: Add branch argument and pass to recognition function
- [x] Update README.md: Reflect new dataset structure, usage with --branch, and command examples
- [x] Update TODO.md: Mark completed items and add any new tasks

## Testing

- [x] Test dataset building with new structure (Successful: Processed 1st_year/branch1 with 5 faces)
- [ ] Test recognition with year, branch, class_id inputs
- [ ] Verify attendance logs and model saving
- [ ] Check for any errors in logs

## Documentation

- [ ] Update usage examples in README.md
- [ ] Ensure all command-line arguments are documented
