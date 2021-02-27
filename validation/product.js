module.exports = async ({ title, description, price, coachBrief, files }) => {
  try {
    let errors = [];

    //Required
    if (!(files && files.mainImage)) errors.push("يجب رفع صورة للمنتج");
    if (!title) errors.push("يجب وضع عنوان للمنتج");
    if (!description) errors.push("يجب كتابة تفاصيل المنتج");
    if (!price) errors.push("يجب تحديد سعر المنتج");

    //Send any empty errors
    if (errors.length !== 0)
      return {
        status: false,
        errors,
      };

    //Length
    if (description.length <= 50) errors.push("وصف المنتج قصير جدا");

    //Image validation
    let mainImage = files.mainImage;
    let extention = mainImage.title.split(".").pop();

    if (!["jpg", "png", "jpeg"].includes(extention))
      errors.push("يجب أن يكون امتداد الصورة png أو jpeg أو jpg فقط");

    //Send any empty errors
    if (errors.length !== 0)
      return {
        status: false,
        errors,
      };

    return {
      status: true,
      title,
      description,
      price,
      coachBrief,
      mainImage,
    };
  } catch (e) {
    return {
      status: false,
      errors: [e.message],
    };
  }
};
