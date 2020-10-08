var gamerooms = {};
var playersDATA = {};
const db = require("./database");
const Match = require("./match")
const Player = require("./player");

exports.quizzingSocketManager = function(io) {
  var Oquizzing = io.of("/Oquizzing").on("connection", function(socket) {
  Oquizzing.emit("playtime", gamerooms);
  setInterval(() => {
    //console.log(gamerooms.koalastrikermi2.playerdata);
    socket.emit("playtime", gamerooms);
  }, 3000);
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
      pdata,
      data.name
    );
    gamerooms[pdata.userName] = m;
    playersDATA[socket.id].rooms.gameroom.name = pdata.userName;
    playersDATA[socket.id].quizmaster = true;
    socket.join(pdata.userName, function() {
      r = Object.keys(socket.rooms);
      console.log(r);
    });
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
    let player = new glicko.Player({
      defaultRating: 1000,
      rating: pdata.ratings.openOnline.rt,
      ratingDeviation: pdata.ratings.openOnline.rd,
      tau: 0.5,
      volatility: pdata.ratings.openOnline.rv
    });
    let ndata = {
      user: pdata.userName,
      state: pdata.state,
      ratingdt: player,
      pcol: pdata.nameCOl,
      score: 0,
      id: socket.id,
      titled: pdata.titled,
      tabr: pdata.tabr,
      jumped: false,
      active: true,
      correct: 0
    };
    playersDATA[socket.id].rooms.gameroom.name = key;
    if (gamerooms[key].team1.playersnum <= gamerooms[key].team2.playersnum) {
      playersDATA[socket.id].rooms.gameroom.team = 1;
      gamerooms[key].team1.players[socket.id] = ndata;
      gamerooms[key].team1.playersnum += 1;
      if (gamerooms[key].team1.playersnum === 1) {
        gamerooms[key].team1.avg = pdata.ratings.openOnline.rt;
        gamerooms[key].scoresheet.team1.push({
          score: 0,
          errors: 0,
          c: "c",
          f: [false, false, false],
          name: pdata.userName,
          q: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          col: pdata.nameCOl,
          titled: pdata.titled,
          tabr: pdata.tabr,
          jumped: false,
          active: true,
          correct: 0
        });
      } else {
        gamerooms[key].team1.avg =
          rtsum(gamerooms[key].team1.players) / gamerooms[key].team1.playersnum;
        gamerooms[key].scoresheet.team1.push({
          score: 0,
          errors: 0,
          c: "",
          f: [false, false, false],
          name: pdata.userName,
          q: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          col: pdata.nameCOl,
          titled: pdata.titled,
          tabr: pdata.tabr,
          jumped: false,
          active: true,
          correct: 0
        });
      }
    } else {
      playersDATA[socket.id].rooms.gameroom.team = 2;
      gamerooms[key].team2.players[socket.id] = ndata;
      gamerooms[key].team2.playersnum += 1;
      if (gamerooms[key].team2.playersnum === 1) {
        gamerooms[key].team2.avg = pdata.ratings.openOnline.rt;
        gamerooms[key].scoresheet.team2.push({
          score: 0,
          errors: 0,
          c: "c",
          f: [false, false, false],
          name: pdata.userName,
          q: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          col: pdata.nameCOl,
          titled: pdata.titled,
          tabr: pdata.tabr,
          jumped: false,
          active: true,
          correct: 0
        });
      } else {
        gamerooms[key].team2.avg =
          rtsum(gamerooms[key].team2.players) / gamerooms[key].team2.playersnum;
        gamerooms[key].scoresheet.team2.push({
          score: 0,
          errors: 0,
          c: "",
          f: [false, false, false],
          name: pdata.userName,
          q: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          col: pdata.nameCOl,
          titled: pdata.titled,
          tabr: pdata.tabr,
          jumped: false,
          active: true,
          correct: 0
        });
      }
    }
    gamerooms[key].playerNum++;
    gamerooms[key].ratingavg = Math.round(
      (rtsum(gamerooms[key].team1.players) +
        rtsum(gamerooms[key].team2.players)) /
        gamerooms[key].playerNum
    );

    Oquizzing.emit("playtime", gamerooms);
    socket.join(key, function() {
      r = Object.keys(socket.rooms);
      console.log(r);
      socket.emit("Omatch joined", { u: gamerooms[key], id: socket.id }, false);
    });
    socket.to(key).emit("player joined", { u: gamerooms[key], id: socket.id });
  });
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
    r = Object.keys(socket.rooms);
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
  });
});
};