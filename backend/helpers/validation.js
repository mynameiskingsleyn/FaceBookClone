//var User = require("../models/User");
exports.validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
};

exports.validateLength = (text, min, max) => {
  if (text.length > max || text.length < min) {
    return false;
  }
  return true;
};

exports.validateUsername = async (User, user_name) => {
  let a = false;
  let counter = 1;

  do {
    let numbLen = Math.floor(counter / 10) + 1;
    console.log(numbLen);
    let check = await User.findOne({ user_name });
    if (check) {
      //change username
      user_name += (+new Date() * Math.random())
        .toString()
        .substring(0, numbLen);
      a = true;
      counter++;
    } else {
      a = false;
    }
  } while (a);
  return user_name;
};

exports.validName = {
  first_name_min_len: 3,
  last_name_min_len: 3,
  first_name_max_len: 20,
  last_name_max_len: 20,
};
exports.validPassword = {
  min: 6,
  max: 15,
};
