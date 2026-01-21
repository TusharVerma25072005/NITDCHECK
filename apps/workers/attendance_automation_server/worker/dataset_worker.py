import faiss
import json
import os
import numpy as np

def save_or_append_index(embeddings, labels, save_path, logger):
    try:
        os.makedirs(save_path, exist_ok=True)
        index_path = os.path.join(save_path, "faiss_index.bin")
        id_map_path = os.path.join(save_path, "id_map.json")

        embeddings = embeddings.astype("float32")
        embeddings /= np.linalg.norm(embeddings, axis=1, keepdims=True)

        if os.path.exists(index_path) and os.path.exists(id_map_path):
            logger.info("Existing index found. Appending new embeddings.")
            index = faiss.read_index(index_path)
            index.add(embeddings)

            with open(id_map_path, "r") as f:
                existing_labels = json.load(f)

            updated_labels = existing_labels + labels
        else:
            logger.info("No existing index found. Creating new index.")
            dim = embeddings.shape[1]
            index = faiss.IndexFlatIP(dim)
            index.add(embeddings)
            updated_labels = labels

        faiss.write_index(index, index_path)
        with open(id_map_path, "w") as f:
            json.dump(updated_labels, f, indent=4)

        logger.info(f"FAISS index successfully saved at {save_path}")
        return True

    except Exception as e:
        logger.error(f"Failed to save vector DB: {e}")
        return False



def load_index_and_idmap(load_path, logger):
    index = faiss.read_index(os.path.join(load_path, "faiss_index.bin"))
    with open(os.path.join(load_path, "id_map.json"), "r") as f:
        id_map = json.load(f)
    logger.info("Data loaded successfully")
    return index, id_map
