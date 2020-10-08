var glicko = require("glicko-two");
exports = class Player {
  consructor(pdata, id) {
    (this.score = 0),
      (this.errors = 0),
      (this.c = false),
      (this.cc = false),
      (this.f = [false, false, false]),
      (this.name = pdata.userName),
      (this.q = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
      (this.col = pdata.nameCOl),
      (this.titled = pdata.titled),
      (this.tabr = pdata.tabr),
      (this.jumped = false),
      (this.active = true),
      (this.correct = 0),
      (this.bonusesright = 0),
      (this.bonuseswrong = 0),
      (this.id = id),
      (this.rooms = { gameroom: {} }),
      (this.data = pdata),
      (this.rating = new glicko.Player({
        defaultRating: 1000,
        rating: pdata.ratings.openOnline.rt,
        ratingDeviation: pdata.ratings.openOnline.rd,
        tau: 0.5,
        volatility: pdata.ratings.openOnline.rv
      })),
      (this.negatives = 0),
      (this.positives = 0),
      (this.timedif = 0),
      (this.quizmaster = false),
      (this.typestaken = []),
      (this.typesright = []),
      (this.typeswrong = []),
      (this.seat = 1),
      (this.standing = false),
      (this.teamscore = 0);
  }
  settimedif(time) {
    this.timedif = Date.now() - time;
  }
  createGame() {
    (this.rooms.gameroom.name = this.name), (this.quizmaster = true);
  }
  joinGame(gamedata) {
    this.rooms.gameroom = gamedata;
  }
  correct(t, q) {
    (this.q[q] = 20),
      (this.standing = false),
      this.correct++,
      (this.positives += 20),
      (this.score += 20);
    if (this.correct === 4) {
      (this.active = false), (this.positives += 10), (this.score += 10);
    }
    this.typestaken.push(t), this.typesright.push(t), (this.teamscore += 20);
  }
  error(t, q) {
    (this.q[q] = "e"), (this.standing = false), this.errors++;
    if (this.errors === 3) {
      (this.active = false),
        this.negative(),
        (this.score -= 10),
        (this.teamscore -= 10);
    }
    this.typestaken.push(t), this.typeswrong.push(t);
  }
  negative() {
    this.negatives -= 10;
  }
  bonus(q) {
    (this.q[q] = "b"),
      (this.standing = false),
      (this.positives += 10),
      this.bonusesright++,
      (this.teamscore += 10);
  }
  bonuswrong(q) {
    (this.q[q] = "x"), (this.standing = false), this.bonuseswrong++;
  }
  setascap(){
    this.c = true
  }
  setascocap(){
    this.cc = true
  }
};
