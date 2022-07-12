const asyncErrorWrapper = require("express-async-handler")
const CustomError = require("../helpers/error/CustomError")
const User = require("../models/User")

const login = asyncErrorWrapper(async (req, res, next) => {
   const {email, password} = req.body
   if (!(email && password)) return next(new CustomError("Email or password is required", 400))
   const user = await User.findOne({$or: [{email: email}]}).select("+password")
   if (!user) return next(new CustomError("User not found", 400))
   if (user.isBlocked === true) return next(new CustomError("Your account is blocked", 400));
   if (!bcrypt.compareSync(password, user.password)) return next(new CustomError("Invalid credentials", 400));
   sendJwtToClient(user, res, (user.role === "admin" ? true : false));
})