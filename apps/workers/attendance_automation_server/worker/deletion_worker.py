import shutil
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from config import DATASET_DIR

def clear_year_datasets():
    """Clear the contents of each year folder in the dataset directory, leaving the year folders intact."""
    if not os.path.exists(DATASET_DIR):
        print("⚠️ Dataset directory does not exist:", DATASET_DIR)
        return

    for year_dir in os.listdir(DATASET_DIR):
        year_path = os.path.join(DATASET_DIR, year_dir)
        if os.path.isdir(year_path):
            print(f"🧹 Clearing contents of {year_dir}...")
            for item in os.listdir(year_path):
                item_path = os.path.join(year_path, item)
                if os.path.isdir(item_path):
                    shutil.rmtree(item_path)
                    print(f"  🗑️ Deleted: {item}")
                else:
                    os.remove(item_path)
                    print(f"  🗑️ Deleted: {item}")
            print(f"✅ Cleared {year_dir}")

    print("🎉 All year datasets cleared, structure preserved.")

if __name__ == "__main__":
    clear_year_datasets()
