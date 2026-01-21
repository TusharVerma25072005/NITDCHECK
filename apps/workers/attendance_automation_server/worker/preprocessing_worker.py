import cv2
import os
import numpy as np

def preproces(app, path):
    embeddings = []
    labels = []
    # `path` is expected to be a branch directory containing student subfolders.
    # Iterate student folders directly and collect embeddings from their images.
    if not os.path.isdir(path):
        return labels, np.array([])

    for student_id in os.listdir(path):
        student_path = os.path.join(path, student_id)

        # Skip non-directory entries inside branch
        if not os.path.isdir(student_path):
            continue

        for img_name in os.listdir(student_path):
            img_path = os.path.join(student_path, img_name)

            # Only process regular files
            if not os.path.isfile(img_path):
                continue

            img = cv2.imread(img_path)
            if img is None:
                continue

            faces = app.get(img)
            if len(faces) == 0:
                continue

            emb = faces[0].embedding
            embeddings.append(emb)
            labels.append(student_id)


    if len(embeddings) == 0:
        return labels, np.array([])

    embeddings = np.array(embeddings).astype("float32")
    embeddings /= np.linalg.norm(embeddings, axis=1, keepdims=True)

    return labels, embeddings
