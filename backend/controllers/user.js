const User = require("../models/user");
const bcrypt = require("bcrypt");
const { sendVerificationEmail } = require("../helpers/mailer");
const { PASSWORD_HASH_NUM } = process.env;
const jwt = require("jsonwebtoken");
//const bcrypt = require("bcrypt-nodejs");
const tokenTime = "30m";
const logInTokenTime = "7d";
const {
  validateEmail,
  validateLength,
  validName,
  validPassword,
  validateUsername,
} = require("../helpers/validation");
const { generateToken, decodeToken, passwordEncrypt, compareEncrypts } = require("../helpers/tokens");

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
    const cryptedPassword = await passwordEncrypt(password);
    //const cryptedPassword = await bcrypt.hash(password, +PASSWORD_HASH_NUM);

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
    const token = generateToken({ id: user._id.toString() }, logInTokenTime);
    res.send({
      id: user._id,
      username: user.user_name,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token,
      verified: user.verified,
      message:
        "Registration was Successful, Please activate your email to start",
    });
    //res.json(user);
  } catch (err) {
    console.log("error occoured", err);
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.activateAccount = async (req, res) => {
  try {
    const { token } = req.body;
    const user = decodeToken(token);
    const check = await User.findById(user.id);
    if (check.verified == true) {
      return res
        .status(400)
        .json({ message: "this email is already activated" });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res
        .status(200)
        .json({ message: "Account has beeen activated successfully." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message:
          "the email address you entered is not connected to an account.",
      });
    }
    const check = await compareEncrypts(password, user.password);
    if (!check) {
      return res.status(400).json({
        message: "Invalid credentials.Please try again.",
      });
    }
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Logged in succesfully",
    });
    

  } catch (error) {

  }
}