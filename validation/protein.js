module.exports = async ({ name, description, files }) => {
  try {
    let errors = [];

    //Required
    if (!(files && files.mainImage)) errors.push("يجب رفع صورة للمكمل الغذائي");
    if (!name) errors.push("يجب وضع عنوان للمكمل الغذائي");
    if (!description) errors.push("يجب كتابة محتوي المقال");

    //Send any empty errors
    if (errors.length != 0)
      return {
        status: false,
        errors,
      };

    //Length
    if (description.length <= 50) errors.push("وصف المكمل الغذائي قصير جدا");

    //Image validation
    let mainImage = files.mainImage;
    let extention = mainImage.name.split(".").pop();

    if (!["jpg", "png", "jpeg"].includes(extention))
      errors.push("يجب أن يكون امتداد الصورة png أو jpeg أو jpg فقط");

    //Send any empty errors
    if (errors.length != 0)
      return {
        status: false,
        errors,
      };

    return {
      status: true,
      name,
      description,
      mainImage,
    };
  } catch (e) {
    return {
      status: false,
      errors: [e.message],
    };
  }
};
