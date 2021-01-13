var gamerooms = {};
var playersDATA = {};
const db = require("./database");
const Match = require("./match")
const Player = require("./player");

exports.quizzingSocketManager = function(io) {
  var Oquizzing = io.of("/Oquizzing").on("connection", function(socket) {
  console.log("conection")
  Oquizzing.emit("playtime", gamerooms);
  socket.emit("getusername");
  setInterval(() => {
    socket.emit("playtime", gamerooms);
  }, 3000);
  socket.on("userdata", function(data) {
    let pdata = playersDATA[socket.id];
    console.log("got username");
    let query = db.usersref
      .doc(data.user)
      .get()
      .then(user => {
        //console.log(user.data().userName)
        if (user.data().password === data.pass) {
          playersDATA[socket.id] = user.data();
          playersDATA[socket.id].rooms = { gameroom: {} };
          //console.log(playersDATA[socket.id])
        }
      });
  });
  socket.on("create match", function(data) {
    console.log(data)
    let pdata = playersDATA[socket.id];
    let m = new Match(
      data.type,
      pdata.userName,
      pdata.userName,
      pdata.nameCOl,
      "team1",
      "team2",
      data.name
    );
    console.log(m)
    gamerooms[pdata.userName] = m;
    playersDATA[socket.id].rooms.gameroom.name = pdata.userName;
    playersDATA[socket.id].quizmaster = true;
    socket.join(pdata.userName);
    r = socket.rooms;
    console.log(r);
    socket.emit(
      "Omatch joined",
      {
        u: gamerooms[pdata.userName],
        id: socket.id
      },
      true
    );
  });
  socket.on("join match", function(key) {
    let pdata = playersDATA[socket.id];
    playersDATA[socket.id].rooms.gameroom.name = key;
    gamerooms[key] = gamerooms[key].addPlayer(socket.id,pdata.userName,pdata,socket)
    console.log(gamerooms)
    Oquizzing.emit("playtime", gamerooms);
    socket.join(key)
    r = socket.rooms;
    console.log(r);
    socket.emit("Omatch joined", { u: gamerooms[key], id: socket.id }, false);
    socket.to(key).emit("player joined", { u: gamerooms[key], id: socket.id });
  });
  /*
  socket.on("start match", function(data, n) {
    console.log(data, n);
    gamerooms[n].hidden = true;
    socket.to(n).emit("match begun", data);
    socket.broadcast.emit("match state change");
  });
  socket.on("jumped", function(jt) {
    let gamedata = gamerooms[playersDATA[socket.id].rooms.gameroom.name];
    if (gamedata.jumped) {
      if (
        Date(
          gamerooms[playersDATA[socket.id].rooms.gameroom.name].jt
        ).getTime() > Date(jt.getTime())
      ) {
        gamerooms[playersDATA[socket.id].rooms.gameroom.name].jumped = true;
        gamerooms[playersDATA[socket.id].rooms.gameroom.name].jt = jt;
        gamerooms[playersDATA[socket.id].rooms.gameroom.name].jumper =
          playersDATA[socket.id];
        socket
          .to(playersDATA[socket.id].rooms.gameroom.name)
          .emit("someone jumped", gamerooms[playersDATA[socket.id]]);
      } else {
        socket.emit("sry to slow");
      }
    } else {
      gamerooms[playersDATA[socket.id].rooms.gameroom.name].jumped = true;
      gamerooms[playersDATA[socket.id].rooms.gameroom.name].jt = jt;
      gamerooms[playersDATA[socket.id].rooms.gameroom.name].jumper =
        playersDATA[socket.id];
      socket
        .to(playersDATA[socket.id].rooms.gameroom.name)
        .emit("someone jumped", gamerooms[playersDATA[socket.id]]);
    }
  });
  socket.on("correct", function(quizzer) {});
  socket.on("incorrect", function(quizzer) {});
  socket.on("timout", function(quizzer) {});
  socket.on("challenge", function(quizzer) {});
  socket.on("appeal", function(quizzer) {});
  socket.on("foul", function(quizzer) {});
  socket.on("end match", function(data) {});
  socket.on("disconnecting", function() {
    r = socket.rooms;
  });
  socket.on("disconnect", function() {
    let pdata = playersDATA[socket.id];
    socket.broadcast.emit("leave", socket.id);
    console.log(pdata);
    if (pdata !== undefined) {
      if (pdata.rooms !== undefined) {
        if (gamerooms[pdata.rooms.gameroom.name] !== undefined) {
          gamerooms[pdata.rooms.gameroom.name].playerNum -= 1;
          if (pdata.rooms.gameroom.team === 1) {
            gamerooms[pdata.rooms.gameroom.name].team1.playersnum -= 1;
            delete gamerooms[pdata.rooms.gameroom.name].team1.players[
              socket.id
            ];
          } else {
            gamerooms[pdata.rooms.gameroom.name].team2.playersnum -= 1;
            delete gamerooms[pdata.rooms.gameroom.name].team2.players[
              socket.id
            ];
          }
          gamerooms[pdata.rooms.gameroom.name].ratingavg = Math.round(
            (rtsum(gamerooms[pdata.rooms.gameroom.name].team1.players) +
              rtsum(gamerooms[pdata.rooms.gameroom.name].team2.players)) /
              gamerooms[pdata.rooms.gameroom.name].playerNum
          );
          if (
            gamerooms[pdata.rooms.gameroom.name].playerNum === 0 ||
            pdata.userName === pdata.rooms.gameroom.name
          ) {
            delete gamerooms[pdata.rooms.gameroom.name];
            socket.to(pdata.rooms.gameroom.name).emit("match end");
            socket.broadcast.emit("match state change");
          } else {
            socket
              .to(pdata.rooms.gameroom.name)
              .emit("update", gamerooms[pdata.rooms.gameroom.name]);
          }
        }
      }
      delete playersDATA[socket.id];
    }
  });*/
});
};