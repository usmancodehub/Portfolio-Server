require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("./models/Admin");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const username = "admin";
    const password = "admin123";

    const exists = await Admin.findOne({ username });
    if (exists) {
      console.log("⚠️  Admin already exists");
    } else {
      await Admin.create({ username, password });
      console.log(
        `✅ Admin created → username: ${username} | password: ${password}`
      );
    }
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
})();