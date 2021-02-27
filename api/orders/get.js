const express = require("express");
const router = express.Router();
const OrderModel = require("../../models/Order");

router.post("/", async (req, res) => {
  try {
    let orders = [];

    //Check for permissions
    if (!req.user) {
      return res.json({
        status: false,
        errors: ["ليس لديك صلاحية الوصول الي هذه البيانات"],
      });
    }

    if (req.body._id && req.user.role === "admin") {
      let orderSearch = await OrderModel.findOne({ _id: req.body._id });

      if (!orderSearch) {
        return res.json({
          status: false,
          errors: ["هذا الطلب غير مسجل في قاعدة البيانات"],
        });
      }

      orders = [...orders, orderSearch.toObject()];
    } else if (req.body._id && req.user.role !== "admin") {
      let orderSearch = await OrderModel.findOne({
        _id: req.body._id,
        userId: req.user._id,
      });

      if (!orderSearch) {
        return res.json({
          status: false,
          errors: ["حدثت مشكلة ويبدو أننا غير قادرين علي عرض هذا الطلب"],
        });
      }

      orders = [...orders, orderSearch.toObject()];
    } else {
      //Check for permissions
      if (req.user.role !== "admin") {
        return res.json({
          status: false,
          errors: ["ليس لديك صلاحية الوصول الي هذه البيانات"],
        });
      }

      let ordersSearch = await OrderModel.find({});

      if (ordersSearch.length === 0) {
        return res.json({
          status: false,
          errors: ["لا يوجد طلبات لعرضها"],
        });
      }

      orders = [...orders, ...ordersSearch];
    }

    /********************************************************/
    //Edit the image to be url
    orders.map((order) => {
      if (order.paymentImage) {
        order.paymentImage = `${req.protocol}://${req.headers.host}/images/orders/${order.mainImage}`;
      } else {
        delete order.paymentImage;
      }
    });

    return res.json({
      status: true,
      orders,
    });

    /********************************************************/
  } catch (e) {
    console.log(`Error in /orders/get, error: ${e.message}`, e);
    res.json({
      status: false,
      errors: [e.message],
    });
  }
});

module.exports = router;
