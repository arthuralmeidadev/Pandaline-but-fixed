import fs from "fs-extra";

async function homepage(req, res, next) {
  try {
    const products = await fs.readJSON("./src/data/products.json");
    const campaigns = await fs.readJSON("./src/data/campaigns.json");
    const config = await fs.readJSON("./src/data/service.config.json");
    return res.render("homepage", { products, campaigns, config });

  } catch (error) {
    next(error);
  };
};

async function viewProduct(req, res, next) {
  const requestedProductId = req.query.id;
  try {
    const products = await fs.readJSON("./src/data/products.json");
    const product = products.find(product => product.id === requestedProductId);
    return res.render("product-overview", { product });

  } catch (error) {
    next(error);
  };
};

export default {
  homepage,
  viewProduct
};