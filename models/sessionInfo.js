const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true
  },
  deviceId: {
    type: Number,
    required: true
  },
  assetId: {
    type: Number,
    required: true
  },
  timeStamp: {
    type: Number,
    required: true
  },
  sequenceNumber: {
    type: Number,
    required: true
  }
});

const SessionInfo = mongoose.model("SessionInfo", sessionSchema);

module.exports = SessionInfo;
