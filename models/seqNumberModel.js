const mongoose = require("mongoose");

const sequenceSchema = new mongoose.Schema({
  assetId: {
    type: Number,
    required: true
  },
  playUrlA: {
    type: String,
    required: true
  },
  playUrlB: {
    type: String,
    required: true
  },
  sequenceNumber: {
    type: Number,
    required: true
  }
});

const SequenceNumber = mongoose.model("SequenceNumber", sequenceSchema);

module.exports = SequenceNumber;
