const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const ProteinModel = require("../../models/Protein");
const validation = require("../../validation/protein");

router.post("/", async (req, res) => {
  try {
    const protein = req.body;

    //Check for permissions
    if (!(req.user && req.user.role === "admin")) {
      return res.json({
        status: false,
        errors: ["ليس لديك صلاحية الوصول الي هذه البيانات"],
      });
    }

    //Validation
    const validateProtein = await validation({ ...protein, files: req.files });
    if (!validateProtein.status) {
      return res.json(validateProtein);
    }

    /********************************************************/

    let { name, description, mainImage } = validateProtein;

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
        "proteins",
        mainImageUniqueName
      )
    );

    /********************************************************/

    //Save the protein to DB
    const saveProtein = await ProteinModel.create({
      name,
      description,
      mainImage: mainImageUniqueName,
    });

    if (!saveProtein) {
      return res.json({
        status: false,
        errors: ["حدث خطأ غير متوقع ، يرجي المحاولة فيما بعد"],
      });
    }

    /********************************************************/

    //Send the success response
    return res.json({
      status: true,
      messages: ["تم اضافة المكمل الغذائي بنجاح"],
      protein: saveProtein,
    });

    /********************************************************/
  } catch (e) {
    console.log(`Error in /proteins/add, error: ${e.message}`, e);
    res.json({
      status: false,
      errors: [e.message],
    });
  }
});

module.exports = router;
