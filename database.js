const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(
    "bible-quiz-e1ef4-firebase-adminsdk-8xtsw-567ec07b71.json"
  ),
  databaseURL: "https://bible-quiz-e1ef4.firebaseio.com",
  storageBucket: "bible-quiz-e1ef4.appspot.com"
});
var bucket = admin.storage().bucket();

var db = admin.firestore();
var usersref = db.collection("users");
var subsref = db.collection("subs");
var tscoresref = db.collection("typequizzingscores");
var chatref = db.collection("chats");
let FieldValue = admin.firestore.FieldValue;

var newD = function(c, n, data) {
  let docRef = db.collection(c).doc(n);
  data.createdAt = new Date().toISOString();
  data.updatedAt = FieldValue.serverTimestamp();
  docRef.set(data);
};
var newD2 = function(c, data, t) {
  data.createdAt = new Date().toISOString();
  data.updatedAt = FieldValue.serverTimestamp();
  let addDoc = db
    .collection(c)
    .add(data)
    .then(ref => {
      if (t) {
        t(ref);
      }
    });
};
var updateOne = function(c, n, data) {
  let dRef = db.collection(c).doc(n);
  data.updatedAt = FieldValue.serverTimestamp();
  dRef.update(data);
};

module.exports = {
  newD:newD,
  newD2:newD2,
  updateOne:updateOne,
  chatref:chatref,
  FieldValue:FieldValue,
  db:db,
  usersref:usersref,
  subsres:subsref,
  tscoresref:tscoresref,
  chatref:chatref,
  bucket:bucket
}