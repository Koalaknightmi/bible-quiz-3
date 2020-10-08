window.addEventListener("load", event => {
  console.log("typequiz.js 3.0");
  var punctuation = [];
  var versesdone2 = [];
  var verses = [];
  var curverses = [];
  var chapter = {};
  var errors = 0;
  var right = 0;
  var versesdone = 0;
  var keysright = {};
  var keyswrong = {};
  var log = window.log;
  var localsave = window.localsave;
  var error = new Audio(
    "https://cdn.glitch.com/7942a189-4df2-4068-8077-3c39a76c0db1%2FComputer%20Error%20Alert.mp3?v=1580768453999"
  );
  var endverse = new Audio(
    "https://cdn.glitch.com/7942a189-4df2-4068-8077-3c39a76c0db1%2FUI_Quirky27.mp3?v=1585075175931"
  );
  var random = function random(a, b) {
    return Math.floor(Math.random() * b) + a;
  };
  var keys = {
    "65": "a",
    "66": "b",
    "67": "c",
    "68": "d",
    "69": "e",
    "70": "f",
    "71": "g",
    "72": "h",
    "73": "i",
    "74": "j",
    "75": "k",
    "76": "l",
    "77": "m",
    "78": "n",
    "79": "o",
    "80": "p",
    "81": "q",
    "82": "r",
    "83": "s",
    "84": "t",
    "85": "u",
    "86": "v",
    "87": "w",
    "88": "x",
    "89": "y",
    "90": "z"
  };
  var time;
  var quote = true;
  var complete = true;
  var started = false;
  var v = 0;
  var score = 0;
  var chapter = 1;
  var up = 0;
  var book = localStorage.playerseason;
  var domver = document.getElementById("verse");
  var domref = document.getElementById("refrence");
  var domscore = document.getElementById("score");
  var dtimer = document.getElementById("timer");
  var tq = document.getElementById("t-q");
  var wordbox = document.getElementById("words");
  var str;
  var ch = chlist[season].chs[0].abr;
  var chset = document.getElementById("ch-select");
  var qset = document.getElementById("ch-type");
  var pset = document.getElementById("ch-prompt");
  var sbtn = document.getElementById("type-start-btn");
  var set = document.getElementById("settings");
  var c = 0;
  var v = 0;
  var w = 0;
  var vchange = 0;
  var verse;
  function setup(s) {
    for (var i = 0; i < chlist[s].chs.length; i++) {
      let e = document.createElement("option");
      e.setAttribute("value", chlist[s].chs[i].abr);
      e.innerText = chlist[s].chs[i].full;
      chset.appendChild(e);
    }
  }
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  setup(season);
  function postData(url, data, then) {
    // Default options are marked with *
    return fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data,
      cache: "default" // body data type must match "Content-Type" header
    })
      .then(response => {
        then(response);
      })
      .catch(function(error) {
        console.log("no internet doing default", error, data);
        location.reload();
      });
  }
  function fillbox(fverse) {
    wordbox.innerHTML = "";
    console.log(fverse);
    let bverse = [];
    for (var i = 0; i < fverse.length; i++) {
      bverse.push(fverse[i]);
    }
    bverse.sort();
    console.log(bverse);
    for (var i = 0; i < bverse.length; i++) {
      let ste = i;
      var newListItem = document.createElement("span");
      newListItem.innerHTML = bverse[i];
      newListItem.className = "wordbox-word";
      newListItem.addEventListener("click", function(e) {
        if (verse[w].toLowerCase() === this.innerHTML.toLowerCase()) {
          console.log(bverse.indexOf(verse[w]));
          bverse[bverse.indexOf(verse[w])] = "";
          console.log(bverse[bverse.indexOf(verse[w])]);
          bverse = bverse.filter(function(w) {
            return w !== "";
          });
          console.log(bverse);
          // console.log(bverse.splice(ste, 1))
          //bverse.splice(ste, 1)
          //console.log(bverse,bverse[ste]);
          score += 10;
          domver.innerHTML = "";
          domscore.innerHTML = "score: " + score;
          w++;
          domver.innerHTML = verses[v].str
            .split(" ")
            .slice(0, w)
            .toString()
            .replace(/,/g, " ");
          fillbox(bverse);
          if (
            keysright[this.innerHTML.substr(0, 1).toLowerCase()] === undefined
          ) {
            keysright[this.innerHTML.substr(0, 1).toLowerCase()] = 0;
          }
          keysright[this.innerHTML.substr(0, 1).toLowerCase()] += 1;
          right++;
          if (w >= verse.length) {
            w = complete ? 0 : 3;
            endverse.play();
            versesdone2.push(book + " " + chapter + ":" + verses[v].ver);
            console.log(vchange, v);
            verses[v].inc++;
            versesdone++;
            if (!quote) {
              shuffleArray(verses);
              verses.sort(function(a, b) {
                return a.inc - b.inc;
              });
            }
            v = vchange;
            if (v < verses.length) {
              vchange = quote ? vchange + 1 : 0;
              verse = verses[v].str
                .split(" ")
                .filter(word => word.length !== 0);
              let boxverse = verse.slice(w, verse.length);
              fillbox(boxverse);
              console.log(verse, w, verses[v], v);
              domver.innerHTML = "";
              domver.innerHTML = verses[v].str
                .split(" ")
                .slice(0, w)
                .toString()
                .replace(/,/g, " ");
              domref.innerHTML = book + " " + chapter + ":" + verses[v].ver;
            }
          }
        } else {
          if (
            keysright[this.innerHTML.substr(0, 1).toLowerCase()] === undefined
          ) {
            keysright[this.innerHTML.substr(0, 1).toLowerCase()] = 0;
          }
          keysright[this.innerHTML.substr(0, 1).toLowerCase()] += 1;
          errors++;
          console.log("wrong");
          score -= 5;
          domscore.innerHTML = "score: " + score;
          error.play();
        }
      });
      wordbox.appendChild(newListItem);
    }
  }
  chset.addEventListener("input", function(e) {
    console.dir(e.target);
    ch = e.target.value;
    c = e.target.selectedIndex;
    book = e.target.selectedOptions[0].label.split(" ")[0];
    chapter = e.target.selectedOptions[0].label.split(" ")[1];
    console.log(ch, chapter, book);
  });
  qset.addEventListener("input", function(e) {
    if (e.target.value === "c") {
      quote = false;
    } else {
      quote = true;
    }
  });
  pset.addEventListener("input", function(e) {
    if (e.target.value === "y") {
      complete = false;
    } else {
      complete = true;
    }
  });
  sbtn.addEventListener("click", function(e) {
    if (chset.value !== "" && qset.value !== "" && pset.value !== "") {
      window.activeinput = true;
      for (var i = 0; i < str[c].length; i++) {
         verses.push({
            str: str[c][i],
            inc: 1,
            ver: i + 1,
            punct: punctuation[c][i]
          });
      }
      if (!quote) {
        shuffleArray(verses);
      }
      w = complete ? 0 : 3;
      v = 0;
      time = quote ? 0 : 300;
      up = quote ? 1 : -1;
      dtimer.textContent =
        Math.floor(time / 60) + ":" + (time % 60 ? time % 60 : "00");
      vchange = quote ? vchange + 1 : 0;
      started = true;
      domref.innerHTML = book + " " + chapter + ":" + verses[0].ver;
      domver.innerHTML = "";
      domscore.innerHTML = "score: " + score;
      tq.style.display = "block";
      set.style.display = "none";
      domver.innerHTML = verses[v].punct[0] +
              verses[v].str
                .split(" ")
                .slice(0, w)
                .toString()
                .replace(/,/g, " ");
      verse = verses[v].str.split(" ").filter(word => word.length !== 0);
      var boxverse = verse.slice(w, verse.length);
      fillbox(boxverse);
    }
  });

  document.addEventListener("keydown", function(e) {
    e.preventDefault();
    if (started) {
      var key = keys[e.keyCode];
      var boxverse = verse.slice(w + 1, verse.length);
      console.log(verse, w, verses[v], v, boxverse);
      if (verse[w].substr(0, 1).toLowerCase() === key) {
        score += 10;
        domver.innerHTML = "";
        domscore.innerHTML = "score: " + score;
        w++;
        for (var i = 0; i < w; i++) {
          domver.innerHTML += verse[i] + verses[v].punct[i+1];
        }
        if (keysright[key] === undefined) {
          keysright[key] = 0;
        }
        keysright[key] += 1;
        right++;
        fillbox(boxverse);
        if (w >= verse.length) {
          w = complete ? 0 : 3;
          endverse.play();
          versesdone2.push(book + " " + chapter + ":" + verses[v].ver);
          console.log(vchange, v);
          verses[v].inc++;
          versesdone++;
          if (!quote) {
            shuffleArray(verses);
            verses.sort(function(a, b) {
              return a.inc - b.inc;
            });
          }
          v = vchange;
          if (v < verses.length) {
            vchange = quote ? vchange + 1 : 0;
            verse = verses[v].str.split(" ").filter(word => word.length !== 0);
            var boxverse = verse.slice(w, verse.length);
            fillbox(boxverse);
            console.log(verse, w, verses[v], v);
            domver.innerHTML = "";
            domver.innerHTML =
              verses[v].punct[0] +
              verses[v].str
                .split(" ")
                .slice(0, w)
                .toString()
                .replace(/,/g, " ");
            domref.innerHTML = book + " " + chapter + ":" + verses[v].ver;
          }
        }
      } else {
        if (keyswrong[key] === undefined) {
          keyswrong[key] = 0;
        }
        keyswrong[key] += 1;
        errors++;
        console.log("wrong");
        score -= 5;
        domscore.innerHTML = "score: " + score;
        error.play();
      }
    }
    if (e.keyCode === 13 && !started) {
      if (chset.value !== "" && qset.value !== "" && pset.value !== "") {
        window.activeinput = true;
        console.log(ch);
        for (var i = 0; i < str[c].length; i++) {
          verses.push({
            str: str[c][i],
            inc: 1,
            ver: i + 1,
            punct: punctuation[c][i]
          });
        }
        if (!quote) {
          shuffleArray(verses);
        }
        w = complete ? 0 : 3;
        v = 0;
        time = quote ? 0 : 300;
        up = quote ? 1 : -1;
        dtimer.textContent =
          Math.floor(time / 60) + ":" + (time % 60 ? time % 60 : "00");
        vchange = quote ? vchange + 1 : 0;
        started = true;
        domref.innerHTML = book + " " + chapter + ":" + verses[0].ver;
        domver.innerHTML = "";
        domscore.innerHTML = "score: " + score;
        tq.style.display = "block";
        set.style.display = "none";
        domver.innerHTML = verses[v].punct[0] +
              verses[v].str
                .split(" ")
                .slice(0, w)
                .toString()
                .replace(/,/g, " ");
        verse = verses[v].str.split(" ").filter(word => word.length !== 0);
        var boxverse = verse.slice(w, verse.length);
        fillbox(boxverse);
      }
    }
  });
  let str2;
  var gettextListener = function gettextListener() {
    str = this.responseText;
    str = str.split(/(?<![0-9])1(?![0-9])/g);
    str.shift();
    console.log(str);
    str2 = str.slice(0);
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].split(/[0-9]+\s/);
      str2[i] = str2[i].split(/[0-9]+\s/);
      for (var j = 0; j < str[i].length; j++) {
        str2[i][j] = str[i][j].split(/\w+/g);
        str[i][j] = str[i][j]
          .replace(/[^a-zA-z\0’-]|’(?!s)/g, " ")
          .trim()
          .replace(/\s\s\s/g, " ")
          .replace(/\s\s/g, " ")
          .replace(/\s\s/g, " "); //cleans
      }
    }
    punctuation = str2;
    console.log(punctuation);
  };

  var countIt = function countIt() {
    //console.log(parseFloat(time))
    if (started) {
      if (quote) {
        console.log(quote, v, verses.length);
        if (v < verses.length) {
          time = time + up;
          dtimer.textContent =
            Math.floor(time / 60) + ":" + (time % 60 ? time % 60 : "00");
        } else {
          window.clearInterval(timer);
          postData(
            "/postquote",
            JSON.stringify({
              ch: ch,
              score: time,
              prompt: complete ? 0 : 3,
              user: JSON.parse(localsave("userdata", "get")).name,
              pass: JSON.parse(localsave("userdata", "get")).pass,
              right: right,
              wrong: errors,
              keyswrong: keyswrong,
              keysright: keysright,
              versesdone: versesdone,
              versesdone2: versesdone2
            }),
            function(data) {
              console.log(JSON.stringify(data));
              location.reload();
            }
          );
        }
      } else {
        if (time > 0) {
          time = time + up;
          dtimer.textContent =
            Math.floor(time / 60) + ":" + (time % 60 ? time % 60 : "00");
        } else {
          console.log(
            JSON.stringify({
              ch: ch,
              score: score,
              prompt: complete ? 0 : 3,
              name: JSON.parse(localsave("userdata", "get")).name,
              pw: JSON.parse(localsave("userdata", "get")).pass,
              right: right,
              wrong: errors,
              keyswrong: keyswrong,
              keysright: keysright,
              versesdone: versesdone,
              versesdone2: versesdone2
            })
          );
          window.clearInterval(timer);
          console.log(JSON.parse(localsave("userdata", "get")));
          postData(
            "/postcomplete",
            JSON.stringify({
              ch: ch,
              score: score,
              prompt: complete ? 0 : 3,
              user: JSON.parse(localsave("userdata", "get")).name,
              pass: JSON.parse(localsave("userdata", "get")).pass,
              right: right,
              wrong: errors,
              keyswrong: keyswrong,
              keysright: keysright,
              versesdone: versesdone,
              versesdone2: versesdone2
            }),
            function(data) {
              console.log(JSON.stringify(data));
              location.reload();
            }
          );
        }
      }
    }
  };

  var timer = window.setInterval(countIt, 1000);

  var hebrewsRequest = new XMLHttpRequest();
  hebrewsRequest.onload = gettextListener;
  hebrewsRequest.open("get", "/gettext/" + localStorage.playerseason);
  hebrewsRequest.send();
});
