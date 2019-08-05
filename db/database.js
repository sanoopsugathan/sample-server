const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://127.0.0.1:27017/sequence-store",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  err => {
    if (err) console.log("Error connecting to DB " + err);
  }
);
