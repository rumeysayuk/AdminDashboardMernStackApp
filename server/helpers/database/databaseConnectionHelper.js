const mongoose = require("mongoose")

const databaseConnectionHelper = async () => {
  return await mongoose.connect()
}