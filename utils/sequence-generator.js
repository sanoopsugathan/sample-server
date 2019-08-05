const hashIds = require("hashids");

const userId = 3010203041;
const deviceId = 3000299031;
const timeStamp = Date.now();

console.log("timestamp = " + timeStamp);
console.log("userId = " + userId.toString(16));
encodeTime(timeStamp);
encodeUserId(userId);

function encodeUserId(userId) {
  userId = userId & 0xff; // 8 bits
  console.log("userId  " + userId.toString(16));

  let sequence = "";

  //8 bit sequence to encode user id for a particular timestamp
  for (let i = 0; i < 8; i++) {
    sequence += userId & 0x1 ? "B" : "A";
    userId = userId >> 1;
  }
  console.log("encoded sequence " + sequence);
}

function encodeTime(timestamp) {
  let date = new Date(timestamp);
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let hour = date.getHours();
  let mins = date.getMinutes();

  console.log("Date " + date);

  console.log("year " + year); //2 bits
  console.log("month " + month); //4 bits
  console.log("day " + day); // 5 bits
  console.log("hour " + hour); // 6 bits
  console.log("mins " + mins); // 6 bits

  let encodedYear = (year - 2019) % 4;

  let encodedTime =
    (encodedYear << 21) + (month << 17) + (day << 12) + (hour << 6) + mins;

  console.log("encoded time " + encodedTime.toString(16));

  let sequence = "";

  //23 bit sequence to encode time
  for (let i = 0; i < 23; i++) {
    sequence += encodedTime & 0x1 ? "B" : "A";
    encodedTime = encodedTime >> 1;
  }
  console.log("encoded sequence " + sequence);
}

//using hash id

let hash = new hashIds();
let encoded = hash.encode(timeStamp, userId, deviceId);

console.log("HashID encoded " + encoded.toString(16));
