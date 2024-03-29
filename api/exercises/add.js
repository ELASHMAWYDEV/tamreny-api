const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const ImageExerciseModel = require("../../models/ImageExercise");
const VideoExerciseModel = require("../../models/VideoExercise");
const imageValidation = require("../../validation/imageExercise");
const videoValidation = require("../../validation/videoExercise");

router.post("/", async (req, res) => {
  try {
    const exercise = req.body;

    //Validation
    let validateExercise, saveExercise;
    switch (+exercise.type) {
      //Image
      case 1:
        validateExercise = await imageValidation({
          ...exercise,
          files: req.files,
        });
        if (!validateExercise.status) {
          return res.json(validateExercise);
        }

        let { categoryId, title, description, images } = validateExercise;

        /********************************************************/

        let imagesToSave = [];
        //Save the images
        for (let image of images) {
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
        saveExercise = await ImageExerciseModel.create({
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

      //Video
      case 2:
        validateExercise = await videoValidation({
          ...exercise,
        });
        if (!validateExercise.status) {
          return res.json(validateExercise);
        }

        //Save the exercise to DB
        saveExercise = await VideoExerciseModel.create({
          categoryId: validateExercise.categoryId,
          title: validateExercise.title,
          description: validateExercise.description,
          videoId: validateExercise.videoId,
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

      default:
        return res.json({
          status: false,
          errors: ["يجب تحديد نوع القسم"],
        });
    }

    /********************************************************/
  } catch (e) {
    console.log(`Error in /exercises/add, error: ${e.message}`, e);
    res.json({
      status: false,
      errors: [e.message],
    });
  }
});

module.exports = router;
