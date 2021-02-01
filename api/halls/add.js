const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const HallModel = require("../../models/Hall");
const validation = require("../../validation/hall");

router.post("/", async (req, res) => {
  try {
    const article = req.body;

    //Validation
    const validateArticle = await validation({ ...article, files: req.files });
    if (!validateArticle.status) {
      return res.json(validateArticle);
    }

    /********************************************************/

    let { title, content, mainImage } = validateArticle;

    //Save the image
    const mainImageUniqueName = `${uuidv4()}.${mainImage.name
      .split(".")
      .pop()}`;
    await mainImage.mv(
      path.join(__dirname, "..", "..", "images", "articles", mainImageUniqueName)
    );

    /********************************************************/

    //Save the article to DB
    const saveArticle = await HallModel.create({
      title,
      content,
      mainImage: mainImageUniqueName,
    });

    if (!saveArticle) {
      return res.json({
        status: false,
        errors: ["حدث خطأ غير متوقع ، يرجي المحاولة فيما بعد"],
      });
    }

    /********************************************************/

    //Send the success response
    return res.json({
      status: true,
      messages: ["تم اضافة المقال بنجاح"],
      article: saveArticle,
    });

    /********************************************************/
  } catch (e) {
    console.log(`Error in /users/register, error: ${e.message}`, e);
    res.json({
      status: false,
      errors: [e.message],
    });
  }
});

module.exports = router;
