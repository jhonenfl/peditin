const mongoose = require('mongoose');

/// Connect to Mongod Server ///
const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("🟢 Connect to MongoDB");
  } catch (err) {
    console.error("🔴 Error connecting to MongoDB:", err);
    process.exit(1);
  }
}

module.exports = ConnectDB;