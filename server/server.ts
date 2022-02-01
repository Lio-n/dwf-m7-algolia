import "dotenv/config";
// # Algolia
import { shops_index } from "./lib/algolia";

// # Models
import { Shop } from "./db/models/shop";

import * as express from "express";
import * as cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const port: number = 3000;

// $ Create Shop
app.post("/shops", async (req, res) => {
  const { name, category, address, lat, lng } = req.body;
  try {
    // & Shop
    const [shop, created] = await Shop.findOrCreate({
      where: { name },
      defaults: { name, category, address, lat, lng },
    });

    if (!created) {
      res.status(400).json({ message: "Shop Already Created" });
    } else {
      // * Add an object or Replacing the old record
      shops_index.saveObject({
        objectID: shop.get("id"),
        name,
        category,
        address,
        _geoloc: { lat, lng },
      });

      res.status(201).json({ message: "Shop Created" });
    }
  } catch (err) {
    res.status(401).json({ err });
  }
});

// $ Get All Shops
app.get("/shops", async (req, res) => {
  const allShops = await Shop.findAll();

  res.status(200).json({ allShops });
});

// $ Get One Shop
app.get("/shops/:id", async (req, res) => {
  const { id } = req.params;

  const shop = await Shop.findByPk(id);

  if (shop !== null) {
    res.status(200).json({ shop });
  } else {
    res.status(404).json({ message: "Product Not Found" });
  }
});

// $ Update One Shop
app.patch("/shops/:id", async (req, res) => {
  const { id } = req.params;
  const propToUpdate = req.body;

  // * Create the Properity 'objectID' with it's 'id'
  propToUpdate.objectID = id;

  // * Get Item 'Shop' from Database: 'Heroku'
  const shop_db = await Shop.findByPk(id);

  if (shop_db !== null) {
    // * Update in Database
    shop_db.update(propToUpdate);

    // * Update a subset of the record : 'Algolia'
    shops_index.partialUpdateObject(propToUpdate);

    res.status(200).json({ shop: shop_db });
  } else {
    res.status(404).json({ message: "Product Not Found" });
  }
});

// $ Get Shops Nearby
app.get(`/shops-nearby`, async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat && !lng) {
    res.status(400).json({ message: "All inputs are required" });
  } else {
    const { hits } = await shops_index.search("", {
      aroundLatLng: [lat, lng].join(","),
      aroundRadius: 4000,
    });

    res.status(200).json(hits);
  }
});

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
