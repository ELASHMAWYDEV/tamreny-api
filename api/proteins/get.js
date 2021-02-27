const express = require("express");
const router = express.Router();
const ProteinModel = require("../../models/Protein");

router.post("/", async (req, res) => {
  try {
    let proteins = [];
    if (req.body._id) {
      let proteinSearch = await ProteinModel.findOne({ _id: req.body._id });

      if (!proteinSearch) {
        return res.json({
          status: false,
          errors: ["هذا المكمل الغذائي غير مسجلة في قاعدة البيانات"],
        });
      }

      proteins = [...proteins, proteinSearch.toObject()];
    } else {
      let proteinsSearch = await ProteinModel.find({});

      if (proteinsSearch.length === 0) {
        return res.json({
          status: false,
          errors: ["لا يوجد مكملات غذائية لعرضها"],
        });
      }

      proteins = [...proteins, ...proteinsSearch];
    }

    /********************************************************/
    //Edit the image to be url
    proteins.map((protein) => {
      protein.mainImage = `${req.protocol}://${req.headers.host}/images/proteins/${protein.mainImage}`;
    });

    return res.json({
      status: true,
      proteins,
    });

    /********************************************************/
  } catch (e) {
    console.log(`Error in /proteins/get, error: ${e.message}`, e);
    res.json({
      status: false,
      errors: [e.message],
    });
  }
});

module.exports = router;
