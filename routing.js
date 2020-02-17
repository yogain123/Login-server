const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { createUser, getUser, deleteUser } = require("./user");
const { getToken, verifyToken } = require("./config");

router.get("/", (req, res, next) => {
  res.send("Index !!");
});

router.post("/register", async function(req, res, next) {
  try {
    let reqData = req.body;
    if (!reqData.password) {
      throw {
        status: false,
        info: "password is required"
      };
    }
    if (!reqData.email) {
      throw {
        status: false,
        info: "email is required"
      };
    }
    let userDetails = await getUser(reqData.email);
    if (userDetails) {
      throw {
        status: false,
        info: "You Already have an Account"
      };
    }

    reqData.password = bcrypt.hashSync(reqData.password);

    await createUser(reqData);
    res.send({
      status: true,
      info: "User Successfully Created"
    });
  } catch (error) {
    return res.send(error);
  }
});

router.post("/login", async function(req, res, next) {
  try {
    let reqData = req.body;
    let userDetails = await getUser(reqData.email);
    if (!userDetails)
      throw {
        status: false,
        info: "User Not Created"
      };

    let checkPasswordValidation = bcrypt.compareSync(
      reqData.password,
      userDetails.password
    );
    if (!checkPasswordValidation)
      throw {
        status: false,
        info: "Password is incorrect"
      };

    let token = getToken(reqData.email);

    // res.header("apiKey", token).send({
    //   status: true,
    //   info: "Successfully Loged In"
    // });

    res.send({
      status: true,
      info: "Successfully Loged In",
      apiKey: token
    });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/logout", async function(req, res, next) {
  let result = verifyToken(req.headers.apikey);
  if (result.status) {
    return res.send({
      status: true,
      info: "Logged out successfully, please remove token from browser"
    });
  }
  return res.send({
    status: false,
    info: "Error While Logging out"
  });
});

module.exports = router;
