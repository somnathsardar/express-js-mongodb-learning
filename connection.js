const mongoose = require("mongoose");

// Defining function to connect to database
const connectToDb = async () => mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//Exporting the function
module.exports = connectToDb;