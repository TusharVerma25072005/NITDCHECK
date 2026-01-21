import json
from datetime import datetime

def save_attendance_json(
    absent_students,
    class_id,
    teacher_id,
    output_dir="attendance_logs"
):
    record = {
        "timestamp": datetime.now().isoformat(timespec="seconds"),
        "class_id": class_id,
        "teacher_id": teacher_id,
        "absent_students": sorted(list(absent_students))
    }

    filename = f"{class_id}_{record['timestamp'].replace(':', '-').split('T')[0]}.json"
    filepath = f"{output_dir}/{filename}"

    with open(filepath, "w") as f:
        json.dump(record, f, indent=4)

    return filepath