var jwt = require("jsonwebtoken");

exports.getToken = function(email) {
  let token = jwt.sign({ email }, "supersecret");
  return token;
};

exports.verifyToken = function(token) {
  try {
    jwt.verify(token, "supersecret");
    return {
      status: true
    };
  } catch (error) {
    return {
      status: false
    };
  }
};
