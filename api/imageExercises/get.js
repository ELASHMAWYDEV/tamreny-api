const express = require("express");
const router = express.Router();
const ImageExercisesCategory = require("../../models/ImageExercisesCategory");

router.post("/", async (req, res) => {
  try {
    let exercises = [];
    if (req.body._id) {
      let exerciseSearch = await ImageExercisesCategory.findOne({
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
      let exercisesSearch = await ImageExercisesCategory.find({});

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
    exercises.map((exercise) => {
      exercise.images.map((image) => {
        image = `${req.protocol}://${req.headers.host}/images/image-exercises/${image}`;
      });
    });

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
