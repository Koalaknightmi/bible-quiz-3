const titles = [
  {
    title: "bibleSuperGrandMaster",
    requiredrt: 2700,
    lossrt: 2600,
    abr: "BSGM"
  },
  {
    title: "bibleGrandMaster",
    requiredrt: 2500,
    lossrt: 2400,
    abr: "BGM"
  },
  {
    title: "bibleMaster",
    requiredrt: 2200,
    lossrt: 2100,
    abr: "BM"
  },
  {
    title: "bibleExpert",
    requiredrt: 2000,
    lossrt: 1900,
    abr: "BE"
  }
];
const db = require("./database");
const Player = require("./player");
var rtsum = function(a) {
  var a2 = 0;
  for (var i in a) {
    a2 += a[i].ratingdt.rating;
  }
  return a2;
};
function checktitlereq(user, rt) {
  titles.sort(function(a, b) {
    return a.requiredrt - b.requiredrt;
  });
  titles.forEach(function(t) {
    //console.log(t);
    if (rt >= t.requiredrt) {
      db.updateOne("users", user, {
        titled: true,
        title: t.title,
        tabr: t.abr
      });
      console.log(t.title);
    }
  });
}
function checktitleloss(user, rt) {
  titles.sort(function(a, b) {
    return b - a;
  });
  titles.forEach(function(t, i, a) {
    console.log(t);
    if (rt <= t.lossrt && t.title === "bibleExpert") {
      db.updateOne("users", user, { titled: false, title: "", tabr: "" });
    } else if (rt <= t.lossrt) {
      db.updateOne("users", user, {
        titled: true,
        title: a[i + 1].title,
        tabr: a[i + 1].abr
      });
    }
  });
}
var gamerooms = {};
exports = class match {
  constructor(type, id, creator, col, n1, n2, n, socket) {
    this.type = type;
    this.id = id;
    this.creator = creator;
    this.quizmaster = creator;
    this.team1 = {
      players: {},
      errors: 0,
      timeouts: 2,
      playersnum: 0,
      avg: 0,
      name: n1,
      coach: "",
      coachdata: {},
      collected3: false,
      collected4: false,
      collected5: false
    };
    this.team2 = {
      players: {},
      errors: 0,
      timeouts: 2,
      playersnum: 0,
      avg: 0,
      name: n2,
      coach: "",
      coachdata: {},
      collected3: false,
      collected4: false,
      collected5: false
    };
    this.scoresheet = {
      cq: 1,
      q: 20,
      t: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20
      ],
      team1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      team2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      team1bonuses: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      team2bonuses: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      team1score: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      team2score: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      team1sc: 0,
      team2sc: 0,
      team1bsc: 0,
      team2bsc: 0
    };
    this.playerNum = 0;
    this.creatorcol = col;
    this.qcol = "";
    this.questions = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20
    ];
    this.question = 0;
    this.hidden = false;
    this.jumped = false;
    this.ratingavg = 0;
    this.playersnum = 0;
    this.qmdata = {};
    this.skdata = {};
    this.jt = "";
    this.jumper = {};
    this.name = n;
    this.timeouttime = 120;
    this.sk = "";
    this.socket = socket;
  }
  nextQuestion() {
    this.question += 1;
  }
  changeQM() {}
  jumped(t, id, team) {
    if (this.jt === "") {
      this.jt = t + this[team].players[id].timedif;
      this.jumper = this[team].players[id];
    } else if (t + this[team].players[id].timedif < this.jt) {
      this.jt = t + this[team].players[id].timedif;
      this.jumper = this[team].players[id];
    }
    this.socket.emit("somone jumped", this.jumper, this.question);
    this.jumper.standing = true;
  }
  setQType(type) {
    this.scoresheet.t[this.question] = type;
  }
  correct(team) {
    this.jumper.correct(this.scoresheet.t[this.question], this.question);
    this.question += 1;
    if ((this.jumper.active = false)) {
      for (var i in this[team].players) {
        if (i !== this.jumper.id) {
          if (!this[team].players[i].active) {
            this[team].players[i].active = true;
          }
        }
      }
    }
    if (this.jumper.correct === 4 && this.jumper.errors === 0) {
      this.scoresheet[team + "sc"] += 10;
    }
    if (this.checkteambonus(team) >= 3 && !this[team].collected3) {
      this.jumper.positives += 10;
    }
    if (this.checkteambonus(team) >= 4 && !this[team].collected4) {
      this.jumper.positives += 10;
    }
    if (this.checkteambonus(team) >= 5 && !this[team].collected5) {
      this.jumper.positives += 10;
    }
    this.scoresheet[team + "sc"] += 20;
    this.scoresheet[team + "score"][this.question] = this.scoresheet[
      team + "sc"
    ];
    this.jt = "";
    this.jumper.standing = false;
    this.jumper = {};
    this.socket.emit("correct", this);
  }
  bonus(correct, team) {
    if (correct) {
      this.scoresheet[team + "bonuses"][this.question] = 10;
      this.scoresheet[team + "sc"] += 10;
      this.jumper.bonus(this.question);
      this.jumper.standing = false;
      this.jumper = {};
    } else {
      this.jumper.bonuswrong(this.question);
      this.jumper.standing = false;
      this.jumper = {};
    }
    this.scoresheet[team + "score"][this.question] = this.scoresheet[
      team + "sc"
    ];
  }
  incorrect(team) {
    this.jumper.error(this.scoresheet.t[this.question], this.question);
    if ((this.jumper.active = false)) {
      for (var i in this[team].players) {
        if (i !== this.jumper.id) {
          if (!this[team].players[i].active) {
            this[team].players[i].active = true;
          }
        }
      }
    }
    this.jumper.standing = false;
    let ap = this.getopposingplayer(team, this.jumper.seat);
    ap.standing = true;
    if (this.jumper.errors === 3) {
      this.scoresheet[team + "sc"] -= 10;
      this.scoresheet[team + "bonuses"][this.question] = -10;
    } else if (this[team].errors >= 5) {
      this.scoresheet[team + "sc"] -= 10;
      this.jumper.negative();
      this.scoresheet[team + "bonuses"][this.question] = -10;
    } else if (this.question >= 16) {
      this.scoresheet[team + "sc"] -= 10;
      this.jumper.negative();
      this.scoresheet[team + "bonuses"][this.question] = -10;
    }
    this.scoresheet[team + "score"][this.question] = this.scoresheet[
      team + "sc"
    ];
    this.jt = "";
    this.jumper = {};
    if (ap !== "") {
      this.jumper = ap;
      this.jumper.standing = true;
    }
    this.socket.emit("incorrect", this);
  }
  getopposingplayer(team, seat) {
    if (team === "team1") {
      for (var i in this.team2.players) {
        if (this.team2.players[i].seat === seat) {
          return this.team2.players[i];
        } else {
          return "";
        }
      }
    } else {
      for (var i in this.team1.players) {
        if (this.team1.players[i].seat === seat) {
          return this.team1.players[i];
        } else {
          return "";
        }
      }
    }
  }
  checkteambonus(team) {
    let corjumpers = 0;
    for (var i in this[team].players) {
      if (this[team].players[i].correct > 0) {
        corjumpers++;
      }
    }
    return corjumpers;
  }
  sub() {}
  timeout() {
    let that = this;
    setTimeout(function() {
      that.socket.emit("timeout over");
    }, 1000 * 60 * 2);
  }
  captainChange(t, newcap) {
    for (var i in this["team" + t].players) {
      this["team" + t].players[i].c = false;
    }
    this["team" + t].players[newcap].setascap();
  }
  cocaptainChange(t, newcap) {
    for (var i in this["team" + t].players) {
      this["team" + t].players[i].cc = false;
    }
    this["team" + t].players[newcap].setascocap();
  }
  addPlayer(id, name, user) {
    let that = this;
    let query = db.usersref
      .doc(name)
      .get()
      .then(user => {
        return new Player(id, user.data());
      })
      .then(user => {
        this.socket.emit("gettime");
        if (that.type.indexOf("open") !== -1) {
          if (that.team1.playersnum <= that.team2.playersnum) {
            user.seat = Object.keys(that.team1.players).length;
            that.team1.players[id] = user;
            that.team1.playersnum++;
            that.scoresheet.team1.push(user);
            that.team1.avg = rtsum(that.team1.players) / that.team1.playersnum;
            this.socket.on("time sync",function(time){
              that.team1.players[id].timediff = time - Date.now()
            });
          } else {
            user.seat = Object.keys(that.team1.players).length;
            that.team2.players[id] = user;
            that.scoresheet.team1.push(user);
            that.team2.playersnum++;
            that.team2.avg = rtsum(that.team2.players) / that.team2.playersnum;
            this.socket.on("time sync",function(time){
              that.team2.players[id].timediff = time - Date.now()
            });
          }
        }
        that.playersnum++;
        that.ratingavg =
          (rtsum(that.team1.players) + rtsum(that.team2.players)) /
          that.playersnum;
      });
  }
  addCoach(id, name, team) {
    let that = this;
    let query = db.usersref
      .doc(name)
      .get()
      .then(user => {
        return new Player(id, user.data());
      })
      .then(user => {
        if (that.type.indexOf("open") !== -1) {
          if (that.team1.name === team) {
            that.team1.coach = name;
            that.team1.coachdata = user;
          } else {
            that.team2.coach = name;
            that.team2.coachdata = user;
          }
        }
      });
  }
  addQM(id, name) {
    let that = this;
    let query = db.usersref
      .doc(name)
      .get()
      .then(user => {
        return new Player(id, user.data());
      })
      .then(user => {
        that.qmdata = user;
        that.quizmaster = name;
      });
  }
  addsk(id, name) {
    let that = this;
    let query = db.usersref
      .doc(name)
      .get()
      .then(user => {
        return new Player(id, user.data());
      })
      .then(user => {
        that.skdata = user;
        that.sk = name;
      });
  }
  tiecheck() {
    return this.scoresheet.team1sc === this.scoresheet.team2sc;
  }
  endMatch() {}
  startMatch() {}
};
