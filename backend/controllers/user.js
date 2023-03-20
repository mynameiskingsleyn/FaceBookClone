const User = require("../models/user");
const bcrypt = require("bcrypt");
const { sendVerificationEmail } = require("../helpers/mailer");
const { PASSWORD_HASH_NUM } = process.env;
//const bcrypt = require("bcrypt-nodejs");
const tokenTime = "30m";
const {
  validateEmail,
  validateLength,
  validName,
  validPassword,
  validateUsername,
} = require("../helpers/validation");
const { generateToken } = require("../helpers/tokens");

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      user_name,
      email,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;
    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "invalid email address",
      });
    }
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message:
          "this email address already exist try with a different email address",
      });
    }
    if (
      !validateLength(
        first_name,
        validName.first_name_min_len,
        validName.first_name_max_len
      )
    ) {
      let min = validName.first_name_min_len;
      let max = validName.first_name_max_len;

      return res.status(400).json({
        message: `firstname must be between ${min} and ${max}`,
      });
    }
    if (
      !validateLength(
        last_name,
        validName.last_name_min_len,
        validName.last_name_max_len
      )
    ) {
      let min = validName.last_name_min_len;
      let max = validName.last_name_max_len;

      return res.status(400).json({
        message: `lastname mus be between ${min} and ${max}`,
      });
    }
    if (!validateLength(password, validPassword.min, validPassword.max)) {
      let min = validPassword.min;
      let max = validName.max;

      return res.status(400).json({
        message: `password must be between ${min} and ${max}`,
      });
    }
    const cryptedPassword = await bcrypt.hash(password, PASSWORD_HASH_NUM);

    let tempUsername = user_name ? user_name : first_name + last_name;
    let newUsername = await validateUsername(User, tempUsername);
    const user = await new User({
      first_name,
      last_name,
      user_name: newUsername,
      email,
      password: cryptedPassword,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      tokenTime
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    console.log(emailVerificationToken);
    sendVerificationEmail(user.email, user.first_name, url);
    res.json(user);
  } catch (err) {
    console.log("error occoured", err);
    res.status(500).json({
      message: err.message,
    });
  }
};
