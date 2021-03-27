const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const HallModel = require("../../models/Hall");
const validation = require("../../validation/hall");

router.post("/", async (req, res) => {
  try {
    let hall = req.body;

    console.log(hall);

    //Check for permissions
    if (!(req.user && req.user.role === "admin")) {
      return res.json({
        status: false,
        errors: ["ليس لديك صلاحية الوصول الي هذه البيانات"],
      });
    }

    //Validation
    const validateHall = await validation({ ...hall, files: req.files });
    if (!validateHall.status) {
      return res.json(validateHall);
    }

    /********************************************************/

    let { name, city, brief, subscriptions, lat, lng, images } = validateHall;

    let imagesToSave = [];

    //Save the images
    for (let image of images) {
      const imageUniqueName = `${uuidv4()}.${image.name.split(".").pop()}`;
      await image.mv(
        path.join(__dirname, "..", "..", "images", "halls", imageUniqueName)
      );

      imagesToSave.push(imageUniqueName);
    }

    /********************************************************/

    //Save the article to DB
    const saveHall = await HallModel.create({
      name,
      city,
      brief,
      subscriptions,
      location: {
        coordinates: [lng, lat],
      },
      images: images.length != 0 ? imagesToSave : ["404.png"],
    });

    if (!saveHall) {
      return res.json({
        status: false,
        errors: ["حدث خطأ غير متوقع ، يرجي المحاولة فيما بعد"],
      });
    }

    /********************************************************/

    //Send the success response
    return res.json({
      status: true,
      messages: ["تم اضافة القاعة بنجاح"],
      hall: saveHall,
    });

    /********************************************************/
  } catch (e) {
    console.log(`Error in /halls/add, error: ${e.message}`, e);
    res.json({
      status: false,
      errors: [e.message],
    });
  }
});

module.exports = router;
