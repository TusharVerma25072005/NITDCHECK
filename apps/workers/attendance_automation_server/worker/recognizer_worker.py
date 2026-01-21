import cv2
import numpy as np
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import RECOGNITION_THRESHOLD

def recognize(app, path, index, id_map):
    test_img = cv2.imread(path)
    faces = app.get(test_img)

    recognized_students = []

    for face in faces:
        query = face.embedding.astype("float32")
        query /= np.linalg.norm(query)

        D, I = index.search(query.reshape(1, -1), k=1)

        if D[0][0] > RECOGNITION_THRESHOLD:
            recognized_students.append(id_map[I[0][0]])
        else:
            recognized_students.append("Unknown")

    return set(recognized_students)
