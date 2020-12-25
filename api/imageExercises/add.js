const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const ImageExerciseModel = require("../../models/ImageExercise");
const validation = require("../../validation/imageExercise");

router.post("/", async (req, res) => {
  try {
    const exercise = req.body;

    //Validation
    const validateExercise = await validation({
      ...exercise,
      files: req.files,
    });
    if (!validateExercise.status) {
      return res.json(validateExercise);
    }

    /********************************************************/

    let { categoryId, title, description, images } = validateExercise;

    let imagesToSave = [];
    //Save the images
    for (image of images) {
      const imageUniqueName = `${uuidv4()}.${image.name.split(".").pop()}`;
      await image.mv(
        path.join(
          __dirname,
          "..",
          "..",
          "images",
          "image-exercises",
          imageUniqueName
        )
      );

      imagesToSave.push(imageUniqueName);
    }

    /********************************************************/

    //Save the exercise to DB
    const saveExercise = await ImageExerciseModel.create({
      categoryId,
      title,
      description,
      images: imagesToSave,
    });

    if (!saveExercise) {
      return res.json({
        status: false,
        errors: ["حدث خطأ غير متوقع ، يرجي المحاولة فيما بعد"],
      });
    }

    /********************************************************/

    //Send the success response
    return res.json({
      status: true,
      messages: ["تم اضافة التمرين بنجاح"],
      exercise: saveExercise,
    });

    /********************************************************/
  } catch (e) {
    console.log(`Error in /imageExercises/add, error: ${e.message}`, e);
    res.json({
      status: false,
      errors: [e.message],
    });
  }
});

module.exports = router;
