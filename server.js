const path = require("path");
require("./db/database"); //starts DB connection
const express = require("express");
const getNextSeq = require("./utils/sequence-generator-2");
const SequenceNumber = require("./models/seqNumberModel");
const SessionInfo = require("./models/sessionInfo");
const generateM3U8 = require("./utils/m3u8Generator");

const videoDirectoryPath = path.join(__dirname, "./video_hls");
const app = express();

let currentIdx = 0;

app.get("/playVideo", async (req, res, next) => {
  try {
    //generate unique playlist for the user
    let assetObj = await SequenceNumber.findOne({
      assetId: req.query.assetId
    });
    let sequenceNumber = 1;
    if (assetObj) {
      sequenceNumber = assetObj.sequenceNumber;
    } else {
      //TODO DB shall be pre populated
      assetObj = await SequenceNumber.create({
        assetId: req.query.assetId,
        playUrlA: "./video_hls/Sample6Sec_WMA.m3u8",
        playUrlB: "./video_hls/Sample6Sec_WMB.m3u8",
        sequenceNumber: 1
      });
    }
    let { currentSequenceIndex, currentSequence } = getNextSeq(sequenceNumber);
    console.log("Generated sequence " + currentSequence);
    currentIdx = 0;

    await SequenceNumber.updateOne(
      { assetId: req.query.assetId },
      { sequenceNumber: currentSequenceIndex }
    );

    await SessionInfo.create({
      userId: req.query.userId,
      assetId: req.query.assetId,
      deviceId: 12,
      timeStamp: Date.now(),
      sequenceNumber: currentSequenceIndex
    });

    let playUrl = generateM3U8(
      assetObj.playUrlA,
      assetObj.playUrlB,
      assetObj.assetId,
      currentSequence
    );
    res.status(200).redirect(playUrl);
  } catch (err) {
    console.log("error");
  }
});

app.use(async (req, res, next) => {
  let filename = path.basename(req.url);
  let extension = path.extname(filename);

  if (extension === ".ts") {
    res
      .status(200)
      .redirect(
        "https://apple-watermarking-poc-input-bucket2.s3.ap-south-1.amazonaws.com/take2_6Second" +
          req.url
      );
  } else {
    next();
  }
}, express.static(videoDirectoryPath));

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
