var reqs = 0; //https://bit.ly/2L7uHDj
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const app = express();
const server = http.Server(app);
//var p2p = require("socket.io-p2p-server").Server;
const io = socketio(server); // Attach socket.io to our server
const email = "NazareneBibleQuizOnline@bible-quiz-online.glitch.me";
const hbs = require("hbs");
const webPush = require("web-push");
var bodyParser = require("body-parser");
var fs = require("fs");
const fileUpload = require("express-fileupload");
const f = require("./functions");
const db = require("./database");
const normalSocketManager = require("./normalSocketmanager");
const quizzingSocketManager = require("./quizzingSocketManager");
//var Jimp = require("jimp");
var cors = require("cors");
var Jimp = require("jimp");
var s_b = "b";
const questionsstarterlist = [
  "g",
  "g",
  "g",
  "g",
  "g",
  "g",
  "g",
  "g",
  "g",
  "g",
  "g",
  "a",
  "a",
  "a",
  "a",
  "v",
  "r",
  "q",
  "x",
  s_b
];
//const db = require("./database");
/*app.use(frameguard({
  action: 'SAMEORIGIN'
}))*/
app.use(express.json()); // for parsing application/json
app.use(
  express.urlencoded({
    extended: true
  })
); // for parsing application/x-www-form-urlencoded
app.use(fileUpload());

//app.post("/test", (req, res) => {
//console.log(req.body); // so when you run
/*
  fetch('/quote', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: { 'Content-Type': 'application/json' }, 👈 don't forget this! thx
        body: JSON.stringify(ch: "h1"
keysright: {i: 3, t: 7, p: 2, g: 1, s: 5, o: 1, a: 6, m: 2, v: 1, w: 3, n: 1}
keyswrong: {}
pass: "Z3NNZXR4US84T210bXFoRA=="
prompt: 0
right: 32
score: 25
user: "koalastrikermi"
versesdone: 1
wrong: 0), // body data type must match "Content-Type" header
    });
    that in the console when veiwing the page its sopposed to log the body but it ist working plz help
  */
//console.log('form body:', req.body, req.get('content-type'));
//res.end(); // 👈 don't forget this!
//});
/*const testFolder = __dirname+'/public/css';

fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    console.log("\"/css/"+file+"\",");
  });
});*/

if (!process.env.VPU || !process.env.VPR) {
  console.log(
    "You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY " +
      "environment variables. You can use the following ones:"
  );
  console.log(webPush.generateVAPIDKeys());
  //return;
}
webPush.setVapidDetails(
  "https://serviceworke.rs/",
  process.env.VPU,
  process.env.VPR
);
const options = {
  TTL: 1 * 60 * 60 * 24
};
/*const admin = require("firebase-admin");
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
var tscoresref = db.tscoresref;
var chatref = db.collection("chats");
let FieldValue = admin.firestore.FieldValue;*/
var usertimouts = {};
var payload = "hi there";
//var Sequelize = require('sequelize');
//const Op = Sequelize.Op;
var log = console.log;
var chat = [];
var onlinepls = {};
var gamerooms = {};
var playersDATA = {};
var emailmsg = `<b>welcome to Nazarene Bible Quizing Online</b> <br>
We hope that you enjoy your experience with our site<br>
if you have ant question or concerns plz email <a href = "mailto:bible-quiz-develepers@googlegroups.com">bible-quiz-develepers@googlegroups.com</a>`;
var sendmail = f.sendmail;
/*var newD = function(c, n, data) {
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
};*/
//var onlineplayers = {};
//var Admins = ["koalastrikermi"];
/*console.log(getuser("koalastrikermi").userName)
if(getuser("koalastrikermi")!==false){
  console.log("yay it worked!!!!!!")
  console.log(getuser("koalastrikermi"))
}*/
//sendmail("koalastrikermi@gmail.com")
/*var users2 = [
"Jaidenmcd@icloud.com",
"Koalaknightmi",
"MaddieJoy",
"Pink koala",
"River gal",
"koalastrikermi",
"koalastrikermi2",
"koalastrikermi7",
"maddie2005"
]
for(var i = 0;i<users2.length;i++){
updateOne("users", users2[i],
            ratings: {
              openOnline:{ rt: 1000, rd: 350, rv: 0.6 },
              teamsOnline:{ rt: 1000, rd: 350, rv: 0.6 }
            })*/
/*db.db.collection("users")
  .get()
  .then(function(querySnapshot) {
    //console.log(querySnapshot.docs)
    querySnapshot.forEach(function(doc) {
      //console.log(doc.data());
      db.updateOne("users", doc.id, {
        "timeonline":  0
      });
    });
  });
//});
//}
*/
/*
function getstuff (u){
  let promise = db.tscoresref.get()
  async function f() {
    let result = await promise;
    console.log(result)
  }
  f()
    /*.then(function(querySnapshot) {
      //console.log(querySnapshot.docs)
      querySnapshot.forEach(function(doc) {
        //console.log(doc.data());
        updateOne("typequizzingscores", doc.id, {
          lowerusername: doc.data().userName.toLowerCase()
        });
      });
    });
}
*/
//var chatrooms = {};
/*var gop2p = function(socket, room) {
  p2p(socket, null, room);
};*/
/*var push = (push = (opt, to, webPush) => {
  if (to === "") {
    let query = subsref.get().then(subs => {
      subs.forEach(sub => {
        //console.log(sub.data().sub);
        return webPush.sendNotification(sub.data().sub, opt).catch(err => {
          if (err.statusCode === 410) {
            console.log("Subscription is no longer valid: ", err);
            subsref.doc(sub.id).delete();
          } else {
            console.log(err);
          }
        });
      });
    });
  } else {
    let query = subsref
      .where("userName", "==", to)
      .get()
      .then(subs => {
        if (subs.empty) {
          console.log("No matching documents.5");
          return;
        }
        subs.forEach(sub => {
          //console.log(sub.data().sub);
          return webPush.sendNotification(sub.data().sub, opt).catch(err => {
            if (err.statusCode === 410) {
              console.log("Subscription is no longer valid: ", err);
              subsref.doc(sub.id).delete();
            } else {
              console.log(err);
            }
          });
        });
      });
  }
});*/
var timeSince = f.timeSince;
var totime = f.totime;
var asort = f.asort;
//made by porter on khan academy https://www.Khanacademy.org/profile/battleboy21
String.prototype.pad = f.pad;
/*hbs.registerHelper('filter', function (context, options) {
  var a = context.sort(function (a, b) {
    return b.score - a.score;
  });
  return options.fn(this) + "<td>" + a[0].score + "</td>"
});*/
var getquestionset = function(n) {
  let a = [];
  for (var i = 0; i < n; i++) {
    a.push(i);
  }
  return a;
};

hbs.registerPartials(__dirname + "/veiws/partials");
app.set("view engine", "hbs");
app.set("views", __dirname + "/veiws/");
app.use((req, res, next) => {
  reqs++;
  var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  var host = req.headers.host;
  var origin = req.headers.origin;
  //console.log(reqs, req.get("User-Agent"));
  if (req.get("User-Agent") === "FreshpingBot/1.0 (+https://freshping.io/)") {
    console.log("yay " + new Date().getHours());
    if (new Date().getHours() === 4 && new Date().getMinutes() > 54) {
      db.usersref.get().then(function(querySnapshot) {
        //console.log(querySnapshot.docs)
        querySnapshot.forEach(function(doc) {
          //console.log(doc.data());
          if (doc.id === "koalastrikermi") {
            db.updateOne("users", "koalastrikermi", {
              test: doc.data().test + 1
            });
          }
        });
      });
    }
  }
  next();
});
app.use(express.static("public"));
app.get("/", function(request, response) {
  //ip = request.headers["x-forwarded-for"];
  //console.log(request)
  response.sendFile(__dirname + "/public/html/index.html");
});
app.get("/img/user/:u", function(request, res) {
  let s = request.params.u;
  /*fs.readFile(s+".txt", function(err, data) {
    res.writeHead(200, {
      "Content-Type": "text"
    });
    res.write(data);
    res.end();
  });*/
  var file = db.bucket.file("imgs/users/" + s + ".png");
  file
    .createReadStream()
    .on("error", function(err) {
      console.log("error");
    })
    .pipe(res);
});
app.get("/gettext/:s", cors(), function(request, res) {
  let s = request.params.s;
  /*fs.readFile(s+".txt", function(err, data) {
    res.writeHead(200, {
      "Content-Type": "text"
    });
    res.write(data);
    res.end();
  });*/
  var file = db.bucket.file("scripture texts/" + s + ".txt");
  file
    .createReadStream()
    .on("error", function(err) {
      console.log("error");
    })
    .pipe(res);
});
app.get("/leaderboardfetch", function(request, res) {
  db.tscoresref.get().then(scores => {
    let data = [];
    scores.forEach(doc => {
      let dta = doc.data();
      dta.profileIMG = "/img/user/" + dta.userName;
      //dta.profileIMG = "/img/user/" + encodeURI(dta.userName);
      data.push(dta);
    });
    res.writeHead(200, {
      "Content-Type": "json"
    });
    //console.log(data)
    res.write(JSON.stringify(data));
    res.end();
  });
});
app.post("/postquote", (req, res) => {
  console.log(req.body);
  var data = req.body;
  let match = false;
  let query = db.usersref
    .where("userName", "==", data.user)
    .get()
    .then(users => {
      if (users.empty) {
        console.log("No matching documents.");
        //socket.emit("login failed");
        return;
      }
      users.forEach(user => {
        console.log(user.data().userName);
        if (user.data().password === data.pass) {
          match = true;
        }
        console.log(match);
        if (match) {
          if (data.prompt === 0) {
            prompt = false;
          } else {
            prompt = true;
          }
          db.newD2("typequizzingscores", {
            ch: data.ch,
            userName: data.user,
            lowerusername: data.user,
            score: data.score,
            type: "quoted-" + prompt,
            profileIMG: user.data().profileIMG,
            nameCOl: user.data().nameCOl,
            right: data.right,
            wrong: data.wrong,
            keyswrong: data.keyswrong,
            keysright: data.keysright,
            versesdone: data.versesdone,
            versesdone2: data.versesdone2
          });
        }
        res.writeHead(200, {
          "Content-Type": "application/json"
        });
        res.end();
      });
    });
});
app.post("/vpostquote", (req, res) => {
  console.log(req.body);
  var data = req.body;
  let match = false;
  let query = db.usersref
    .where("userName", "==", data.user)
    .get()
    .then(users => {
      if (users.empty) {
        console.log("No matching documents.");
        //socket.emit("login failed");
        return;
      }
      users.forEach(user => {
        console.log(user.data().userName);
        if (user.data().password === data.pass) {
          match = true;
        }
        if (match) {
          if (data.prompt === 0) {
            prompt = false;
          } else {
            prompt = true;
          }
          db.newD2("typequizzingscores", {
            ch: data.ch,
            userName: data.user,
            score: data.score,
            type: "quoted-" + prompt + "-v",
            profileIMG: user.data().profileIMG,
            nameCOl: user.data().nameCOl
          });
        }
        res.writeHead(200, {
          "Content-Type": "application/json"
        });
        res.end();
      });
    });
});
app.post("/postcomplete", (req, res) => {
  //console.log(req.body)
  var data = req.body;
  let query = db.usersref
    .where("userName", "==", data.user)
    .get()
    .then(users => {
      if (users.empty) {
        console.log("No matching documents.");
        //socket.emit("login failed");
        return;
      }
      users.forEach(user => {
        //console.log(user.data().userName,user.data().password.toString()===data.pass.toString())
        if (user.data().password === data.pass) {
          if (data.prompt === 0) {
            prompt = false;
          } else {
            prompt = true;
          }
          db.newD2(
            "typequizzingscores",
            {
              ch: data.ch,
              userName: data.user,
              lowerusername: data.user,
              score: data.score,
              type: "completed-" + prompt,
              profileIMG: user.data().profileIMG,
              nameCOl: user.data().nameCOl,
              right: data.right,
              wrong: data.wrong,
              keyswrong: data.keyswrong,
              keysright: data.keysright,
              versesdone: data.versesdone,
              versesdone2: data.versesdone2
            },
            function(t) {
              //log(t.tscoresref.doc('lOAzzxeAPQWvBjoRmMWk'))
            }
          );
        }
        res.writeHead(200, {
          "Content-Type": "application/json"
        });
        res.write(JSON.stringify(data));
        res.end();
      });
    });
});
app.post("/vpostcomplete", (req, res) => {
  console.log(req.body);
  var data = req.body;
  let match = false;
  let query = db.usersref
    .where("userName", "==", data.user)
    .get()
    .then(users => {
      if (users.empty) {
        console.log("No matching documents.");
        //socket.emit("login failed");
        return;
      }
      users.forEach(user => {
        console.log(user.data().userName);
        if (user.data().password === data.pass) {
          match = true;
        }
        if (match) {
          if (data.prompt === 0) {
            prompt = false;
          } else {
            prompt = true;
          }
          db.newD2("typequizzingscores", {
            ch: data.ch,
            userName: data.user,
            score: data.score,
            type: "completed-" + prompt + "-v",
            profileIMG: user.data().profileIMG,
            nameCOl: user.data().nameCOl
          });
        }
        res.writeHead(200, {
          "Content-Type": "application/json"
        });
        res.end();
      });
    });
});
app.post("/setProfileImg", (req, res) => {
  //console.log(req,req.get('content-type'))
  let match = false;
  let query = db.usersref
    .where("userName", "==", req.body.user)
    .get()
    .then(users => {
      if (users.empty) {
        console.log("No matching documents.");
        //socket.emit("login failed");
        return;
      }
      users.forEach(user => {
        console.log(user.data().password === req.body.pass);
        if (user.data().password === req.body.pass) {
          match = true;
          console.log("matched");
        }
      });
      if (match) {
        let ncol = req.body.namecol;
        //console.log(req.body)
        if (req.body.ncolorchange === "true") {
          db.updateOne("users", req.body.user, {
            nameCOl: ncol
          });
          let tscoresquery = db.tscoresref
            .where("userName", "==", req.body.user)
            .get()
            .then(scores => {
              scores.forEach(user => {
                //console.log(user.id, ncol)
                db.updateOne("typequizzingscores", user.id, {
                  nameCOl: ncol
                });
              });
            });
        }
        if (req.files !== null) {
          let sampleFile = req.files.file;
          //console.log(req.files.file.data);
          //console.log(req.file, req);
          /*sampleFile.mv(
            __dirname + "/public/images/users/" + sampleFile.name,
            function(err) {
              if (err) return res.status(500); /*.send(err);*//*

              Jimp.read(
                __dirname + "/public/images/users/" + sampleFile.name,
                (err, img) => {
                  if (err) throw err;

                  fs.unlink(
                    __dirname + "/public/images/users/" + sampleFile.name,
                    function(err) {
                      if (err) throw err;
                      console.log("File deleted!");
                    }
                  );
                  img.write(
                    __dirname + "/public/images/users/" + req.body.user + ".png"
                  ); // save
                }
              );
              //res.sendFile(__dirname + '/public/images/users/' + req.body.user + '.png');
            }
          );*/
          let imgpath = "imgs/users/"+req.body.user+".png"
          let file2 = db.bucket.file(imgpath);
          file2.save(sampleFile.data,{contentType: "image/png", metadata: {contentType: "image/png"},gzip: true }, function(err) {
            if (!err) {
              // File written successfully.
              console.log("img saved")
            }
          });/**/
        }
        res.writeHead(200, {
          "Content-Type": "text"
        });
        res.write("sucsess");
        res.end();
      }
    });
});
app.post("/createquestion", (req, res) => {
  console.log(req.body);
  let data = req.body;
  let type = data.type,
    ref = data.refrence,
    question = data.question,
    answer = data.answer,
    creator = data.creator;
  let addDoc = db
    .collection("questions")
    .doc(type)
    .collection("questions")
    .add({
      type: type,
      question: question,
      answer: answer,
      creator: creator,
      createdAt: new Date().toISOString(),
      refrence: ref
    })
    .then(ref => {
      res.writeHead(200, {
        "Content-Type": "text"
      });
      res.write("sucsess");
      res.end();
    });
});
app.get("/user/:user", function(request, res) {
  var userdata = {};
  var typequizzingscores = [];
  var friendsdata = [];
  var scoresdata = [];
  var username = request.params.user;

  let userquery = db.usersref
    .where("userName", "==", username)
    .get()
    .then(users => {
      console.log(username);
      //console.log(users)
      if (users.empty) {
        console.log("No matching documents.1");
        //socket.emit("login failed");
        //return;
      }
      users.forEach(user => {
        let dt = user.data();
        dt.email = "";
        //console.log(new Date(dt.lastLogin))
        dt.lastLogin = timeSince(new Date(dt.lastLogin));
        dt.state = dt.state.toUpperCase();
        dt.profileIMG = "/img/user/"+dt.profileIMG;
        userdata = dt;
      });
      //console.log(userdata)
      if (userdata.friends.length > 0) {
        for (var i = 0; i < userdata.friends.length; i++) {
          log(userdata.friends[i]);
          let friendquery = db.usersref
            .where("userName", "==", userdata.friends[i])
            .get()
            .then(users => {
              //console.log(users.empty)
              //console.log(users)
              if (users.empty) {
                console.log("No matching documents.2");
                //socket.emit("login failed");
                return;
              }
              users.forEach(user => {
                let dta = user.data();
                dta.state = dta.state.toUpperCase();
                dta.profileIMG =
                  "/img/user/" + dta.profileIMG;
                friendsdata.push(dta);
              });
              //log(friendsdata)
            });
        }
        var ts = {};
        var cts = [];
        var qts = [];
        var cpts = [];
        var qpts = [];
        let tscoresquery = db.tscoresref
          .where("userName", "==", username)
          .get()
          .then(scores => {
            if (scores.empty) {
              console.log("No matching documents.3");
              // socket.emit("login failed");
              // return;
              res.render("user", {
                userdata: userdata,
                scoresdata: {},
                friendsdata: friendsdata,
                ts: {}
              });
            } else {
              //console.log(scores.empty)
              scores.forEach(score => {
                let scdt = score.data();
                //log(scdt.type)
                scdt.time = scdt.createdAt;
                scdt.createdAt = timeSince(new Date(scdt.createdAt));
                if (scdt.type.indexOf("quote") !== -1) {
                  scdt.score = totime(scdt.score);
                }
                if (scdt.type === "quoted-true") {
                  scdt.type = "quoted with prompt";
                  qpts.push(scdt);
                } else if (scdt.type === "quoted-false") {
                  scdt.type = "quoted without prompt";
                  qts.push(scdt);
                } else if (scdt.type === "completed-false") {
                  scdt.type = "completed without prompt";
                  cts.push(scdt);
                } else {
                  scdt.type = "completed with prompt";
                  cpts.push(scdt);
                }
                typequizzingscores.push(scdt);
                //console.log()
                //friendsdata.push(score.data())
              });
              cts = asort(cts, "hl", "score");
              cpts = asort(cpts, "hl", "score");
              qpts = asort(qpts, "lh", "score");
              qts = asort(qts, "lh", "score");
              ts = {
                c: cts,
                cp: cpts,
                q: qts,
                qp: qpts
              };
              //console.log(typequizzingscores)
              typequizzingscores = typequizzingscores.sort(function(a, b) {
                //console.log(a, b);
                if (a.time._seconds === undefined) {
                  a = new Date(a.time).getTime();
                } else {
                  a = a.time._seconds;
                }
                if (b.time._seconds === undefined) {
                  b = new Date(b.time).getTime();
                } else {
                  b = b.time._seconds;
                }

                return b - a;
              });
              res.render("user", {
                userdata: userdata,
                scoresdata: typequizzingscores,
                friendsdata: friendsdata,
                ts: ts
              });
            }
          });
      } else {
        var ts = {};
        var cts = [];
        var qts = [];
        var cpts = [];
        var qpts = [];
        let tscoresquery = db.tscoresref
          .where("userName", "==", username)
          .get()
          .then(scores => {
            if (scores.empty) {
              console.log("No matching documents.");
              //socket.emit("login failed");
              res.render("user", {
                userdata: userdata,
                scoresdata: typequizzingscores,
                friendsdata: friendsdata,
                ts: ts
              });
            } else {
              //console.log(scores.empty)
              scores.forEach(score => {
                let scdt = score.data();
                //log(scdt.type)
                scdt.time = scdt.createdAt;
                scdt.createdAt = timeSince(new Date(scdt.createdAt));
                if (scdt.type.indexOf("quote") !== -1) {
                  scdt.score = totime(scdt.score);
                }
                if (scdt.type === "quoted-true") {
                  scdt.type = "quoted with prompt";
                  qpts.push(scdt);
                } else if (scdt.type === "quoted-false") {
                  scdt.type = "quoted without prompt";
                  qts.push(scdt);
                } else if (scdt.type === "completed-false") {
                  scdt.type = "completed without prompt";
                  cts.push(scdt);
                } else {
                  scdt.type = "completed with prompt";
                  cpts.push(scdt);
                }
                typequizzingscores.push(scdt);
                //console.log()
                //friendsdata.push(score.data())
              });
              cts = asort(cts, "hl", "score");
              cpts = asort(cpts, "hl", "score");
              qpts = asort(qpts, "lh", "score");
              qts = asort(qts, "lh", "score");
              ts = {
                c: cts,
                cp: cpts,
                q: qts,
                qp: qpts
              };
              //console.log(typequizzingscores)
              typequizzingscores = typequizzingscores.sort(function(a, b) {
                //console.log(a, b);
                if (a.time._seconds === undefined) {
                  a = new Date(a.time).getTime();
                } else {
                  a = a.time._seconds;
                }
                if (b.time._seconds === undefined) {
                  b = new Date(b.time).getTime();
                } else {
                  b = b.time._seconds;
                }

                return b - a;
              });
              res.render("user", {
                userdata: userdata,
                scoresdata: typequizzingscores,
                friendsdata: friendsdata,
                ts: ts
              });
            }
          });
      }
    });
  /**/
});
app.get("/team/:team", function(request, res) {
  var userdata = {};
  var typequizzingscores = [];
  var friendsdata = [];
  var scoresdata = [];
  var username = request.params.team;

  let userquery = db.usersref
    .where("userName", "==", username)
    .get()
    .then(users => {
      console.log(username);
      //console.log(users)
      if (users.empty) {
        console.log("No matching documents.1");
        //socket.emit("login failed");
        //return;
      }
      users.forEach(user => {
        let dt = user.data();
        dt.email = "";
        //console.log(new Date(dt.lastLogin))
        dt.lastLogin = timeSince(new Date(dt.lastLogin));
        dt.state = dt.state.toUpperCase();
        dt.profileIMG = "/img/user/" + dt.profileIMG;
        userdata = dt;
      });
      //console.log(userdata)
      if (userdata.friends.length > 0) {
        for (var i = 0; i < userdata.friends.length; i++) {
          log(userdata.friends[i]);
          let friendquery = db.usersref
            .where("userName", "==", userdata.friends[i])
            .get()
            .then(users => {
              //console.log(users.empty)
              //console.log(users)
              if (users.empty) {
                console.log("No matching documents.2");
                //socket.emit("login failed");
                return;
              }
              users.forEach(user => {
                let dta = user.data();
                dta.state = dta.state.toUpperCase();
                dta.profileIMG =
                  "/img/user/" + dta.profileIMG;
                friendsdata.push(dta);
              });
              //log(friendsdata)
            });
        }
        var ts = {};
        var cts = [];
        var qts = [];
        var cpts = [];
        var qpts = [];
        let tscoresquery = db.tscoresref
          .where("userName", "==", username)
          .get()
          .then(scores => {
            if (scores.empty) {
              console.log("No matching documents.3");
              // socket.emit("login failed");
              // return;
              res.render("user", {
                userdata: userdata,
                scoresdata: {},
                friendsdata: friendsdata,
                ts: {}
              });
            } else {
              //console.log(scores.empty)
              scores.forEach(score => {
                let scdt = score.data();
                //log(scdt.type)
                scdt.time = scdt.createdAt;
                scdt.createdAt = timeSince(new Date(scdt.createdAt));
                if (scdt.type.indexOf("quote") !== -1) {
                  scdt.score = totime(scdt.score);
                }
                if (scdt.type === "quoted-true") {
                  scdt.type = "quoted with prompt";
                  qpts.push(scdt);
                } else if (scdt.type === "quoted-false") {
                  scdt.type = "quoted without prompt";
                  qts.push(scdt);
                } else if (scdt.type === "completed-false") {
                  scdt.type = "completed without prompt";
                  cts.push(scdt);
                } else {
                  scdt.type = "completed with prompt";
                  cpts.push(scdt);
                }
                typequizzingscores.push(scdt);
                //console.log()
                //friendsdata.push(score.data())
              });
              cts = asort(cts, "hl", "score");
              cpts = asort(cpts, "hl", "score");
              qpts = asort(qpts, "lh", "score");
              qts = asort(qts, "lh", "score");
              ts = {
                c: cts,
                cp: cpts,
                q: qts,
                qp: qpts
              };
              //console.log(typequizzingscores)
              typequizzingscores = typequizzingscores.sort(function(a, b) {
                //console.log(a, b);
                if (a.time._seconds === undefined) {
                  a = new Date(a.time).getTime();
                } else {
                  a = a.time._seconds;
                }
                if (b.time._seconds === undefined) {
                  b = new Date(b.time).getTime();
                } else {
                  b = b.time._seconds;
                }

                return b - a;
              });
              res.render("user", {
                userdata: userdata,
                scoresdata: typequizzingscores,
                friendsdata: friendsdata,
                ts: ts
              });
            }
          });
      } else {
        var ts = {};
        var cts = [];
        var qts = [];
        var cpts = [];
        var qpts = [];
        let tscoresquery = db.tscoresref
          .where("userName", "==", username)
          .get()
          .then(scores => {
            if (scores.empty) {
              console.log("No matching documents.");
              //socket.emit("login failed");
              res.render("user", {
                userdata: userdata,
                scoresdata: typequizzingscores,
                friendsdata: friendsdata,
                ts: ts
              });
            } else {
              //console.log(scores.empty)
              scores.forEach(score => {
                let scdt = score.data();
                //log(scdt.type)
                scdt.time = scdt.createdAt;
                scdt.createdAt = timeSince(new Date(scdt.createdAt));
                if (scdt.type.indexOf("quote") !== -1) {
                  scdt.score = totime(scdt.score);
                }
                if (scdt.type === "quoted-true") {
                  scdt.type = "quoted with prompt";
                  qpts.push(scdt);
                } else if (scdt.type === "quoted-false") {
                  scdt.type = "quoted without prompt";
                  qts.push(scdt);
                } else if (scdt.type === "completed-false") {
                  scdt.type = "completed without prompt";
                  cts.push(scdt);
                } else {
                  scdt.type = "completed with prompt";
                  cpts.push(scdt);
                }
                typequizzingscores.push(scdt);
                //console.log()
                //friendsdata.push(score.data())
              });
              cts = asort(cts, "hl", "score");
              cpts = asort(cpts, "hl", "score");
              qpts = asort(qpts, "lh", "score");
              qts = asort(qts, "lh", "score");
              ts = {
                c: cts,
                cp: cpts,
                q: qts,
                qp: qpts
              };
              //console.log(typequizzingscores)
              typequizzingscores = typequizzingscores.sort(function(a, b) {
                //console.log(a, b);
                if (a.time._seconds === undefined) {
                  a = new Date(a.time).getTime();
                } else {
                  a = a.time._seconds;
                }
                if (b.time._seconds === undefined) {
                  b = new Date(b.time).getTime();
                } else {
                  b = b.time._seconds;
                }

                return b - a;
              });
              res.render("user", {
                userdata: userdata,
                scoresdata: typequizzingscores,
                friendsdata: friendsdata,
                ts: ts
              });
            }
          });
      }
    });
  /**/
});

normalSocketManager.normalSocketManager(io);
//quizzingSocketManager.quizzingSocketManager(io)

setInterval(() => {
  //tp.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

server.listen(3000, () => console.log("server started"));
