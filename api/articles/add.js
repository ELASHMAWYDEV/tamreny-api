const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const ArticleModel = require("../../models/Article");
const validation = require("../../validation/article");

router.post("/", async (req, res) => {
  try {
    const article = req.body;

    //Check for permissions
    if (!(req.user && req.user.role === "admin")) {
      return res.json({
        status: false,
        errors: ["ليس لديك صلاحية الوصول الي هذه البيانات"],
      });
    }

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
      path.join(
        __dirname,
        "..",
        "..",
        "images",
        "articles",
        mainImageUniqueName
      )
    );

    /********************************************************/

    //Save the article to DB
    let saveArticle = await ArticleModel.create({
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

    saveArticle = saveArticle.toObject();
    //Send the success response
    return res.json({
      status: true,
      messages: ["تم اضافة المقال بنجاح"],
      article: {
        ...saveArticle,
        mainImage: `${req.protocol}://${req.headers.host}/images/articles/${saveArticle.mainImage}`,
      },
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
