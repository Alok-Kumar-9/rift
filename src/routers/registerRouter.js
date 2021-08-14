const express = require("express");
const registerRouter = new express.Router();
const User = require("../models/users");
const config = require("../config");
const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

const updateList = async (mob, arr) => {
  try {
    let results = await User.updateOne(
      {
        mobile: mob,
      },
      {
        $push: { order: { $each: arr } },
      }
    );
  } catch (err) {
    console.log("error");
  }
};

registerRouter.post("/register", async (req, res) => {
  try {
    const userMob = req.body.mobile;
    const reww = await User.find({ mobile: userMob });
    if (reww.length !== 0) {
      res.render("main", {
        mobile: userMob,
      });
    } else {
      const dataa = new User({
        mobile: userMob,
      });
      const results = await dataa.save();
      res.render("main", {
        mobile: userMob,
      });
    }
  } catch (err) {
    res.render("error");
  }
});

registerRouter.post("/addUser", async (req, res) => {
  let userMob = req.body.mobile;
  client.verify.services(process.env.SERVICE_ID).verifications.create({
    to: `+${userMob}`,
    channel: `sms`,
  });
  res.render("otppage", {
    mobile: userMob,
  });
});

registerRouter.post("/finalregister", async (req, res) => {
  let userMob = req.body.mobile;
  let otp = req.body.otp;

  const dataa = await client.verify
    .services(process.env.SERVICE_ID)
    .verificationChecks.create({
      to: `+${userMob}`,
      code: `${otp}`,
    });

  if (dataa.status == "approved") {
    try {
      //const userMob = req.body.mobile;
      const reww = await User.find({ mobile: userMob });
      if (reww.length !== 0) {
        res.render("main", {
          mobile: userMob,
        });
      } else {
        const dataa = new User({
          mobile: userMob,
        });
        const results = await dataa.save();
        res.render("main", {
          mobile: userMob,
        });
      }
    } catch (err) {
      res.render("error");
    }
  } else {
    res.render("error");
  }
});

registerRouter.post("/addArr", async (req, res) => {
  try {
    let aaq = [];
    aaq = req.body.array;
    await updateList(req.body.mobile, aaq);
    res.status(200).send({ rre: "Success" });
  } catch (err) {
    res.render("error");
    res.status(404).send({ rre: "Error" });
  }
});

module.exports = registerRouter;
