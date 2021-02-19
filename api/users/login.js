const express = require("express");
const router = express.Router();
const validation = require("../../validation/users/login");
const { createToken } = require("../../helpers/jwt");

router.post("/", async (req, res) => {
  try {
    const user = req.body;

    //Validation
    const validateUser = await validation(user);
    if (!validateUser.status) {
      return res.json(validateUser);
    }

    /********************************************************/

    //Send the jwt token with the success response
    const accessToken = await createToken({ _id: validateUser.user._id });

    res.cookie("access_token", accessToken);
    res.cookie("user_data", JSON.stringify(validateUser.user));
    return res.json({
      status: true,
      messages: ["تم تسجيل الدخول بنجاح"],
      user: validateUser.user,
      accessToken,
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
