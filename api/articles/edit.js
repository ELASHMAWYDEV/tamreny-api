const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const ArticleModel = require("../../models/Article");
const validation = require("../../validation/article");

router.post("/", async (req, res) => {
  try {
    const article = req.body;

    //Validation
    const validateArticle = await validation({ ...article, files: req.files });
    if (!validateArticle.status) {
      return res.json(validateArticle);
    }

    /********************************************************/
    //Validate _id
    if (!article._id) {
      return res.json({
        status: false,
        errors: ["رقم المقالة غير موجود ؟"],
      });
    }

    /********************************************************/
    //Check if article exist on DB
    let articleSearch = await ArticleModel.findOne({ _id: article._id });

    if (!articleSearch) {
      return res.json({
        status: false,
        errors: ["هذه المقالة غير موجودة في قاعدة البيانات"],
      });
    }
    /********************************************************/

    let { title, content, mainImage } = validateArticle;

    /********************************************************/
    //Check if image is not changed
    if (mainImage.name != articleSearch.mainImage) {
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
          "articles",
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
          "articles",
          articleSearch.mainImage
        )
      )
        ? fs.unlinkSync(
            path.join(
              __dirname,
              "..",
              "..",
              "images",
              "articles",
              articleSearch.mainImage
            )
          )
        : null;

      /********************************************************/
      //Edit the article on DB
      const result = await ArticleModel.updateOne(
        { _id: article._id },
        {
          title,
          content,
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
      //Edit the article on DB
      const result = await ArticleModel.updateOne(
        { _id: article._id },
        {
          title,
          content,
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
    //Get the new article
    articleSearch = await ArticleModel.findOne({ _id: article._id });

    /********************************************************/
    //Send the success response
    return res.json({
      status: true,
      messages: ["تم تعديل المقال بنجاح"],
      article: articleSearch,
    });

    /********************************************************/
  } catch (e) {
    console.log(`Error in /articles/edit, error: ${e.message}`, e);
    res.json({
      status: false,
      errors: [e.message],
    });
  }
});

module.exports = router;
