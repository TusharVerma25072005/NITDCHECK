import os
import sys
import cv2

from insightface.app import FaceAnalysis

def diagnose(path):
    app = FaceAnalysis(name="buffalo_l")
    app.prepare(ctx_id=0)

    for root, dirs, files in os.walk(path):
        for fname in files:
            fpath = os.path.join(root, fname)
            print(f"--- {fpath} ---")
            img = cv2.imread(fpath)
            if img is None:
                print("Unreadable image (cv2.imread returned None)")
                continue
            try:
                faces = app.get(img)
                print(f"Readable. Faces detected: {len(faces)}")
            except Exception as e:
                print(f"Error running face detection: {e}")

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python diagnose_faces.py <dataset_path>")
        sys.exit(1)
    diagnose(sys.argv[1])
