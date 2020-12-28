const VideoCategoryModel = require("../models/VideoExercisesCategory");

module.exports = async ({ categoryId, title, description, videoUrl }) => {
  try {
    let errors = [];

    //Required
    if (!categoryId) errors.push("يجب تحديد القسم");
    if (!title) errors.push("يجب وضع عنوان للتمرين");
    if (!description) errors.push("يجب كتابة وصف للتمرين");
    if (!videoUrl) errors.push("يجب وضع رابط الفيديو");

    //Send any empty errors
    if (errors.length != 0)
      return {
        status: false,
        errors,
      };

    /******************************************************/

    //Check if category exist
    let categorySearch = await VideoCategoryModel.findOne({ _id: categoryId });
    if (!categorySearch)
      return {
        status: false,
        errors: ["القسم الذي اخترته غير موجود في قاعدة البيانات"],
      };

    /******************************************************/

    //Length
    if (title.length <= 5) errors.push("العنوان قصير جدا");
    if (description.length <= 20) errors.push("وصف التمرين قصير جدا");

    //Url validation
    if (
      videoUrl.toLowerCase().indexOf("youtube.com") == -1 &&
      videoUrl.toLowerCase().indexOf("youtu.be") == -1
    )
      errors.push("يجب وضع رابط من اليوتيوب فقط");

    //Send any errors
    if (errors.length != 0)
      return {
        status: false,
        errors,
      };

    return {
      status: true,
      categoryId,
      title,
      description,
      videoUrl,
    };
  } catch (e) {
    return {
      status: false,
      errors: [e.message],
    };
  }
};
