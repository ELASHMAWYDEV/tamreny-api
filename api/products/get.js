const express = require("express");
const router = express.Router();
const ProductModel = require("../../models/Product");

router.post("/", async (req, res) => {
  try {
    let products = [];
    if (req.body._id) {
      let productSearch = await ProductModel.findOne({ _id: req.body._id });

      if (!productSearch) {
        return res.json({
          status: false,
          errors: ["هذا المنتج غير مسجلة في قاعدة البيانات"],
        });
      }

      products = [...products, productSearch.toObject()];
    } else {
      let productsSearch = await ProductModel.find({});

      if (productsSearch.length == 0) {
        return res.json({
          status: false,
          errors: ["لا يوجد منتجات لعرضها"],
        });
      }

      products = [...products, ...productsSearch];
    }

    /********************************************************/
    //Edit the image to be url
    products.map((protein) => {
      protein.mainImage = `${req.protocol}://${req.headers.host}/images/products/${protein.mainImage}`;
    });

    return res.json({
      status: true,
      products,
    });

    /********************************************************/
  } catch (e) {
    console.log(`Error in /products/get, error: ${e.message}`, e);
    res.json({
      status: false,
      errors: [e.message],
    });
  }
});

module.exports = router;
