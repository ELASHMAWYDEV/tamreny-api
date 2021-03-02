module.exports = async ({ title, content, files, edit = false }) => {
  try {
    let errors = [];

    //Required
    if (!(files && files.mainImage)) errors.push("يجب رفع صورة للمقال");
    if (!title) errors.push("يجب وضع عنوان للمقال");
    if (!content) errors.push("يجب كتابة محتوي المقال");

    //Send any empty errors
    if (errors.length !== 0)
      return {
        status: false,
        errors,
      };

    //Length
    if (title.length <= 10) errors.push("العنوان قصير جدا");
    if (content.length <= 50) errors.push("محتوي المقال قصير جدا");

    //Image validation
    let mainImage = files.mainImage;
    let extention = mainImage.name.split(".").pop();

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
      content,
      mainImage,
    };
  } catch (e) {
    return {
      status: false,
      errors: [e.message],
    };
  }
};
