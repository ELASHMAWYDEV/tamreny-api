const express = require("express");
const router = express.Router();
const ImageExerciseModel = require("../../models/ImageExercise");

router.post("/", async (req, res) => {
  try {
    let exercises = [];
    if (req.body._id) {
      let exerciseSearch = await ImageExerciseModel.findOne({
        _id: req.body._id,
      });

      if (!exerciseSearch) {
        return res.json({
          status: false,
          errors: ["هذا التمرين غير مسجل في قاعدة البيانات"],
        });
      }

      exercises = [...exercises, exerciseSearch.toObject()];
    } else {
      let exercisesSearch = await ImageExerciseModel.find({});

      if (exercisesSearch.length == 0) {
        return res.json({
          status: false,
          errors: ["لا يوجد تمارين"],
        });
      }

      exercises = [...exercises, ...exercisesSearch];
    }

    /********************************************************/
    //Edit the image to be url
    let finalImages = [];
    for (exercise of exercises) {
      for (image of exercise.images) {
        finalImages.push(
          `${req.protocol}://${req.headers.host}/images/image-exercises/${image}`
        );
      }
      exercise.images = finalImages;
      finalImages = [];
    }

    return res.json({
      status: true,
      exercises,
    });

    /********************************************************/
  } catch (e) {
    console.log(`Error in /users/login, error: ${e.message}`, e);
    res.json({
      status: false,
      errors: [e.message],
    });
  }
});

module.exports = router;
