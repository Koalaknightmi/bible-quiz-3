var onlineplayers = {};
var usertimouts = {};
var challenges = {};
var db = require("./database");
const f = require("./functions");
const fs = require("fs")
var Jimp = require("jimp");
var Admins = ["koalastrikermi"];

exports.normalSocketManager = function(io) {
  io.sockets.on("connection", function(socket) {
    let ip = socket.request.connection.remoteAddress;
    /*socket.on('message', function (data) {
    User.findOne({
      where: {
        userName: data.user
      }
    }).then(user => {
      data.col = user.dataValues.nameCOl;
    });
    data.timesince = (new Date().toISOString())
    chat.unshift(data);
    console.log(chat);
    io.emit("message",chat);
  });*/
    socket.on("getusers", function() {
      let users = [];
      db.db
        .collection("users")
        .get()
        .then(function(querySnapshot) {
          //console.log(querySnapshot.docs)
          querySnapshot.forEach(function(doc) {
            console.log(doc.data());
            users.push({username:doc.data().userName,rating:doc.data().ratings.challenge,online:doc.data().online})
          });
        socket.emit("send user list", users);
        });
    });
    socket.on("create study challenge", (user)=>{
      challenges[user] = {}
      onlineplayers[socket.id].challenge = {
        
      }
      db.updateOne("users", onlineplayers[socket.id].userName, {
        challenge:{}
      });
    })
    socket.on("vapidPublicKey", data => {
      socket.emit("vpk", process.env.VPU);
    }); // listen to the event
    socket.on("register", function(data, sub) {
      console.log(ip);
      console.log(sub);
      let used = false;
      let query = db.usersref.get().then(users => {
        users.forEach(user => {
          //console.log(user);
          if (user.id.toLowerCase() === data.name.toLowerCase()) {
            used = true;
          }
        });
        if (!used) {
            /*Jimp.read(
              __dirname + "/public/images/avatar generic.png",
              (err, img) => {
                if (err) throw err;

                img.write(
                  __dirname + "/public/images/users/" + data.name + ".png"
                ); // save
              }
            );*/
          
          let imgpath = "imgs/users/"+data.name+".png"
          let file2 = db.bucket.file(imgpath);
          file2.save(fs.readFileSync(__dirname +'/public/images/avatar generic.png', {encoding:'utf8', flag:'r'}),{contentType: "image/png", metadata: {contentType: "image/png"}, gzip: true }, function(err) {
            if (!err) {
              // File written successfully.
              console.log("img saved")
            }
          });
            db.newD("users", data.name, {
              id: 1,
              userName: data.name,
              lowerusername: data.name.toLowerCase(),
              email: data.email,
              password: data.pass,
              lastLogin: new Date().toISOString(),
              isAdmin: (Admins.indexOf(data.name) > -1),
              visitNum: 0,
              nameCOl: "blue",
              ratings: {
                openOnline: { rt: 1000, rd: 350, rv: 0.6 },
                teamsOnline: { rt: 1000, rd: 350, rv: 0.6 }
              },
              gamesPlayed: 0,
              online: true,
              tournaments: "",
              friends: [],
              monthScore: 0,
              allTimeScore: 0,
              profileIMG: data.name,
              state: data.state,
              ipAD: ip,
              banned: false,
              challenge: {
                active: false,
                opponent: "",
                time: 0
              }
            });
            db.newD2("subs", {
              userName: data.name,
              sub: sub
            });
            onlineplayers[socket.id] = {
                userName: data.name,
                time: 0,
                challenge: false,
                cameonline: Date.now()
              };
            //console.log('user ' + data.name + ' registered');
            socket.emit("registered", data.name);
            //var id = socket.id;
            //sendmail(data.email);
            /*db.collection("users").get().then(users => {
            io.emit("leaderboard", users);
            //console.log(users);
          })*/
        } else {
          socket.emit("already used", data.name);
          console.log(data.name + " username already used");
        }
      });
    });
    socket.on("login attempt", function(data) {
      //console.log("login attempt" + JSON.stringify(data));
      let match = false;
      let query = db.usersref
        .where("userName", "==", data.user)
        .get()
        .then(users => {
          if (users.empty) {
            console.log("No matching documents.");
            socket.emit("login failed");
            return;
          }
          users.forEach(user => {
            //console.log(user.data().userName)
            if (user.data().password === data.pass) {
              match = true;
              let otheronline = false
              if(user.data().online){
                console.log("tab already open")
                otheronline = true
              }
              onlineplayers[socket.id] = {
                userName: data.user,
                time: user.data().challenge.time,
                challenge: user.data().challenge,
                cameonline: Date.now(),
                otheronline:otheronline
              };
            }
          });
          if (match) {
            db.updateOne("users", data.user, {
              visitNum: db.FieldValue.increment(1),
              lastLogin: new Date().toISOString(),
              online: true
            });
            if (data.sub) {
              db.newD2("subs", {
                userName: data.user,
                sub: data.sub
              });
            }
            //push(payload, "",webPush)
            socket.emit("logged in", data.user);
          } else {
            socket.emit("login failed");
          }
        });
      /*User.findOne({
      where: {
        userName: data.user
      }
    }).then(users => {
      if (users === null) {
        socket.emit("login failed");
        //console.log("login failed " + data.user + " is not regestered");
      }
      else if (users.dataValues.password === data.pass) {
        //console.log(users);
        //console.log(users.dataValues.password);
        User.update({
          lastLogin: new Date(),
          visitNum: users.visitNum + 1,
          online: true
        }, {
          where: {
            userName: data.user
          }
        });
        subs.create({
          userName: data.name,
          sub: data.sub
        })
        
        //console.log("logged in:"+users.password+" = "+data.pass);
        var id = socket.id;
        var newplayer = {
          id: id,
          user: data.user
        };
        onlineplayers[id] = newplayer;
        console.log("player initalized " + data.user);
        io.emit("in game players", {
          id: id,
          onlineplayers: onlineplayers
        });
        //console.log(onlineplayers);
        /*User.findAll().then(users => {
          for (var i in users) {
            //console.log(users[i].dataValues.id, users[i].dataValues.userName);
          }
          //socket.emit("leaderboard", users);
          socket.emit("logged in", data.user);
          onlinepls[socket.id] = {
            user: data.user
          };
          chat.unshift({
            col: "black",
            user: 'bot',
            message: data.user + ' is online now',
            timesince: new Date().toISOString()
          });
          io.emit("message", chat);
        })
      }
      else {
        socket.emit("login failed");
        //console.log("login failed " + users.password + "!==" + data.pass);
      }
    })
    /*socket.on("player moved", function (data) {
      if(!onlineplayers[data.id]) return;
      onlineplayers[data.id].x = data.x;
      onlineplayers[data.id].z = data.z;
      onlineplayers[data.id].y = data.y;
      //console.log(onlineplayers);
      socket.broadcast.emit("ingame players moved", data);
    });
  });*/
      /*socket.on("quoted", (data) => {
      //console.log(data)
      User.findOne({
        where: {
          userName: data.user
        }
      }).then(user => {
        if (user === null) {
          socket.emit("login failed");
          //console.log("login failed " + data.user + " is not regestered");
        }
        else if (user.dataValues.password === data.pass) {
      if (data.prompt === 0) {
        prompt = false;
      }
      else {
        prompt = true;
      }
      
        typequizzingscores.create({
          ch: data.ch,
          userName: data.user,
          score: data.score,
          type: "quoted-" + prompt,
          profileIMG: user.dataValues.profileIMG,
          nameCOL: user.dataValues.nameCOl
        });
        
        }
        else {
          socket.emit("login failed");
        }  
      })
    })
    socket.on("completed", (data) => {
      User.findOne({
        where: {
          userName: data.user
        }
      }).then(user => {
        if (user === null) {
          socket.emit("login failed");
          //console.log("login failed " + data.user + " is not regestered");
        }
        else if (user.dataValues.password === data.pass) {
      if (data.prompt === 0) {
        prompt = false;
      }
      else {
        prompt = true;
      }
        typequizzingscores.create({
          ch: data.ch,
          userName: data.user,
          score: data.score,
          type: "completed-" + prompt,
          profileIMG: user.dataValues.profileIMG,
          nameCOL: user.dataValues.nameCOl
        });
        }
        else {
          socket.emit("login failed");
        }  
      })*/
    });
    socket.on("idle", user => {
      //console.log(user + " left")
      usertimouts[user] = setTimeout(function() {
        db.updateOne("users", user, {
          online: false
        });
      }, 2000 * 60 * 4.9);
    });
    socket.on("active", user => {
      //console.log(user + " came back")
      clearTimeout(usertimouts[user]);
    });
    /*socket.on('getleaderboard', function (fn) {
    typequizzingscores.findAll().then(scores => {
      console.log(scores); 
      fn(scores);
    })
  });*/
    socket.on("disconnect", function() {
      console.log(onlineplayers)
      if (!onlineplayers[socket.id]) return;
      console.log(onlineplayers[socket.id].cameonline - Date.now())
      db.updateOne("users", onlineplayers[socket.id].userName, {
        online: false
      });
      let otheronline = false
      if(onlineplayers[socket.id].otheronline){
        otheronline = true
        for(var i in onlineplayers){
          if(onlineplayers[i].userName === onlineplayers[socket.id].userName){
            otheronline = true
            break;
          } else{
            otheronline = false
          }
        }
      }
      if(otheronline){
        console.log("tab already open")
      } else {
        db.updateOne("users", onlineplayers[socket.id].userName, {
          timeonline: db.FieldValue.increment((onlineplayers[socket.id].cameonline - Date.now())*-1)
        });
      }
      onlineplayers[socket.id] = null
      delete onlineplayers[socket.id]
      /*
    User.update({
      online: false
    }, {
        where: {
          userName: onlineplayers[socket.id].user
        }
      });delete onlineplayers[socket.id];
    // Update clients with the new player killed 
    socket.broadcast.emit('leave', socket.id);
    if (!onlinepls) return;
    if (onlinepls[socket.id] !== undefined) {
      var l = onlinepls[socket.id].user;
      chat.unshift({
        col: "black",
        user: 'bot',
        message: l + ' is offline now',
        timesince: new Date().toISOString()
      });
    }
    delete onlinepls[socket.id];

    io.emit("message", chat);*/
    });
  });
};
//setInterval(() => console.log(onlineplayers),1000)