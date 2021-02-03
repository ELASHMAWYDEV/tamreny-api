const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const ProductModel = require("../../models/Product");
const validation = require("../../validation/product");

router.post("/", async (req, res) => {
  try {
    const product = req.body;

    //Validation
    const validateProduct = await validation({ ...product, files: req.files });
    if (!validateProduct.status) {
      return res.json(validateProduct);
    }

    /********************************************************/
    //Validate _id
    if (!product._id) {
      return res.json({
        status: false,
        errors: ["هذا المنتج غير موجود بقاعدة البيانات"],
      });
    }

    /********************************************************/
    //Check if product exist on DB
    let productSearch = await ProductModel.findOne({ _id: product._id });

    if (!productSearch) {
      return res.json({
        status: false,
        errors: ["هذا المنتج غير موجودة في قاعدة البيانات"],
      });
    }
    /********************************************************/

    let { title, description, price, coachBrief, mainImage } = validateProduct;

    /********************************************************/
    //Check if image is not changed
    if (mainImage.name != productSearch.mainImage) {
      //Save the new image
      const mainImageUniqueName = `${uuidv4()}.${mainImage.name
        .split(".")
        .pop()}`;
      await mainImage.mv(
        path.join(
          __dirname,
          "..",
          "..",
          "images",
          "products",
          mainImageUniqueName
        )
      );

      //delete the old image
      fs.existsSync(
        path.join(
          __dirname,
          "..",
          "..",
          "images",
          "products",
          productSearch.mainImage
        )
      )
        ? fs.unlinkSync(
            path.join(
              __dirname,
              "..",
              "..",
              "images",
              "products",
              productSearch.mainImage
            )
          )
        : null;

      /********************************************************/
      //Edit the product on DB
      const result = await ProductModel.updateOne(
        { _id: product._id },
        {
          title,
          description,
          price,
          coachBrief,
          mainImage: mainImageUniqueName,
        }
      );

      if (result.nModified == 0) {
        return res.json({
          status: false,
          errors: ["لم تقم بإجراء أي تغيير"],
        });
      }
    } else {
      //Edit the product on DB
      const result = await ProductModel.updateOne(
        { _id: product._id },
        {
          title,
          description,
          price,
          coachBrief,
        }
      );

      if (result.nModified == 0) {
        return res.json({
          status: false,
          errors: ["لم تقم بإجراء أي تغيير"],
        });
      }
    }

    /********************************************************/
    //Get the new product
    productSearch = await ProductModel.findOne({ _id: product._id });

    /********************************************************/
    //Send the success response
    return res.json({
      status: true,
      messages: ["تم تعديل المنتج بنجاح"],
      product: productSearch,
    });

    /********************************************************/
  } catch (e) {
    console.log(`Error in /products/edit, error: ${e.message}`, e);
    res.json({
      status: false,
      errors: [e.message],
    });
  }
});

module.exports = router;
