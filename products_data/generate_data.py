import uuid

import json
def generate_product(
    *,
    base_name: str,          # varmala / varmala_clock / varmala_photoframe
    number: int,             # 1101, 1103, ...
    category: str,           # Varmala / Clocks / Photo Frames
    price: int,
    start_id: int,
    dimensions: str,
    materials: str = "Resin, Dried Flowers",
    rating: float = 4.8,
    review_count: int = 40,
    in_stock: int = 5,
    colors=None
):
    if colors is None:
        colors = ["white", "gold"]

    return {
        "id": start_id,
        "name": base_name+"_"+str(number),
        "description": f"Handcrafted resin {category.lower()} with premium finish.",
        "price": price,
        "category": category,
        "image_url": f"/attached_assets/generated_images/{base_name}_{number}.jpg",
        "rating": rating,
        "review_count": review_count,
        "in_stock": in_stock,
        "colors": colors,
        "dimensions": dimensions,
        "materials": materials
    }


products = []
current_id = 0

odd_numbers = range(1101, 1220, 1)

CONFIG = {
    "varmala": {
        "category": "Varmala",
        "price": 2999,
        "dimensions": "18 x 18 inches",
        "num_of_items": 20
    },
    "clocks": {
        "category": "Clocks",
        "price": 1599,
        "dimensions": "16 inch diameter",
        "num_of_items": 22
    },
    "photoframes": {
        "category": "Photo Frames",
        "price": 1199,
        "dimensions": "12 x 16 inches",
        "num_of_items": 22
    },
    "wall-arts": {
        "category": "Photo Frames",
        "price": 1299,
        "dimensions": "12 x 16 inches",
        "num_of_items": 17
    },
    "pyramids": {
        "category": "Photo Frames",
        "price": 1699,
        "dimensions": "12 x 16 inches",
        "num_of_items": 7
    },
    "pooja-platter": {
        "category": "Photo Frames",
        "price": 599,
        "dimensions": "12 x 16 inches",
        "num_of_items": 14
    },
    "nameplates": {
        "category": "Photo Frames",
        "price": 599,
        "dimensions": "12 x 16 inches",
        "num_of_items": 18
    }
}

for base_name, cfg in CONFIG.items():
    num_of_items = cfg.get("num_of_items", 19)
    for num in range(1101, 1101+num_of_items):
        current_id += 1
        products.append(
            generate_product(
                base_name=base_name,
                number=num,
                category=cfg["category"],
                price=cfg["price"],
                start_id=current_id,
                dimensions=cfg["dimensions"]
            )
        )

with open("productsnew.json", "w") as f:
    json.dump(products, f, indent=2)