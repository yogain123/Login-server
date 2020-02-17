const User = require("./model/user");

exports.deleteUser = async email => {
  try {
    let data = await User.remove({ email });
    console.log({ data });
    if (!data.deletedCount) {
      return {
        status: false,
        message: "No Such User"
      };
    } else {
      return {
        status: false,
        message: "No Such User"
      };
    }
  } catch (error) {
    throw {
      status: false,
      message: "Something went Wrong"
    };
  }
};

exports.getUser = async email => {
  try {
    let data = await User.findOne({ email });
    return data && data._doc;
  } catch (error) {
    throw {
      status: false,
      message: "Something went Wrong"
    };
  }
};

exports.createUser = async reqData => {
  try {
    let user = new User(reqData);
    await user.save();
  } catch (error) {
    throw {
      status: false,
      message: "Something went Wrong"
    };
  }
};
