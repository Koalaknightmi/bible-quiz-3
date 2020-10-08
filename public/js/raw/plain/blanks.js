window.addEventListener("load", event => {
//console.log("blanks.js 1.0");
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
var time = 0;
var prompterizer = false;
var started = false;
var up = 1;
var domver = document.getElementById("verse");
var domref = document.getElementById("refrence");
var dtimer = document.getElementById("timer");
var tq = document.getElementById("t-q");
var chset = document.getElementById("ch-select");
var qset = document.getElementById("ch-type");
var pset = document.getElementById("ch-lvl");
var sbtn = document.getElementById("type-start-btn");
var set = document.getElementById("settings");
var lvl;
var text = "";
var ch = ""
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
      //console.log("no internet doing default", error, data);
      location.reload();
    });
}
pset.addEventListener("change", function(e) {
  lvl = e.target.value;
});
qset.addEventListener("input", function(e) {
  if (e.target.value === "b") {
    prompterizer = false;
  } else {
    prompterizer = true;
  }
});
var doc,djson;
sbtn.addEventListener("click", function(e) {
  window.activeinput = true;
  lvl = JSON.parse(pset.value);
  //console.log(prompterizer, lvl);
  doc = window.nlp(text[chset.options.selectedIndex]);
  djson = doc.json();
  //console.log(djson);
  let ver = "<li>";
  ch = 
  started = true;
  tq.style.display = "block";
  set.style.display = "none";
  var prop = prompterizer ? "prompterizer: " : "blanks: ";
  domref.innerHTML = prop + chset.options[chset.options.selectedIndex].label;
  if (prompterizer) {
    for (var i = 0; i < djson.length; i++) {
      for (var j = 0; j < djson[i].terms.length; j++) {
        if (/[0-9]/g.test(djson[i].terms[j].text)) {
          djson[i].terms[j].text = djson[i].terms[j].text;
        } else {
          djson[i].terms[j].text = 
            djson[i].terms[j].pre.replace(/\s/g, "") +
            djson[i].terms[j].text.charAt(0) +
            djson[i].terms[j].post.replace(/\s/g, "");
        }
        if (
          djson[i].terms[j].tags.indexOf("NumericValue")!==-1 &&
          djson[i].terms[j].text !== "1"
        ) {
          ver = ver + "</li>";
          domver.innerHTML += ver;
          ver = "<li>";
        } else if (i === djson.length - 1 && j === djson[i].terms.length - 1) {
          ver +=
            djson[i].terms[j].text.replace(
              /([0-9]+)/g,
              "<br> $1 &nbsp;&nbsp;&nbsp;"
            ) + " ";
          ver = ver + "</li>";
          domver.innerHTML += ver;
          ver = "<li>";
        } else {
          ver += djson[i].terms[j].text + " ";
        }
      }
    }
  } else {
    if (lvl === 1) {
      for (var i = 0; i < djson.length; i++) {
        for (var j = 0; j < djson[i].terms.length; j++) {
          if (djson[i].terms[j].text.length > 7) {
            let _ssss = "";
            for (var l = 0; l < djson[i].terms[j].text.length; l++) {
              _ssss += "_";
            }
            djson[i].terms[j].text =
              djson[i].terms[j].pre.replace(/\s/g, "") +
              djson[i].terms[j].text.charAt(0) +
              _ssss +
              djson[i].terms[j].post.replace(/\s/g, "");
          }
          //console.log(djson[i].terms[j], ver);
          if (
            djson[i].terms[j].tags.indexOf("NumericValue")!==-1 &&
            djson[i].terms[j].text !== "1"
          ) {
            ver = ver + "</li>";
            domver.innerHTML += ver;
            ver = "<li>";
          } else if (
            i === djson.length - 1 &&
            j === djson[i].terms.length - 1
          ) {
            ver += djson[i].terms[j].text.replace(/([0-9]+)/g, "") + " ";
            ver = ver + "</li>";
            domver.innerHTML += ver;
            ver = "<li>";
          } else {
            ver += djson[i].terms[j].text.replace(/([0-9]+)/g, "") + " ";
          }
        }
      }
    } else if (lvl === 2) {
      for (var i = 0; i < djson.length; i++) {
        for (var j = 0; j < djson[i].terms.length; j++) {
          if (
            djson[i].terms[j].tags.indexOf("ProperNoun") !== -1
          ) {
            let _ssss = "";
            for (var l = 0; l < djson[i].terms[j].text.length; l++) {
              _ssss += "_";
            }
            djson[i].terms[j].text =
              djson[i].terms[j].text.charAt(0) +
              _ssss +
              djson[i].terms[j].post.replace(/\s/g, "");
          }
          //console.log(djson[i].terms[j], ver);
          if (
            djson[i].terms[j].tags.indexOf("NumericValue")!==-1 &&
            djson[i].terms[j].text !== "1"
          ) {
            ver = ver + "</li>";
            domver.innerHTML += ver;
            ver = "<li>";
          } else if (
            i === djson.length - 1 &&
            j === djson[i].terms.length - 1
          ) {
            ver += djson[i].terms[j].text.replace(/([0-9]+)/g, "") + " ";
            ver = ver + "</li>";
            domver.innerHTML += ver;
            ver = "<li>";
          } else {
            ver += djson[i].terms[j].text.replace(/([0-9]+)/g, "") + " ";
          }
        }
      }
    } else if (lvl === 3) {
      for (var i = 0; i < djson.length; i++) {
        for (var j = 0; j < djson[i].terms.length; j++) {
          if (djson[i].terms[j].tags.indexOf("ProperNoun") !== -1||djson[i].terms[j].tags.indexOf("Pronoun") !== -1) {
            let _ssss = "";
            for (var l = 0; l < djson[i].terms[j].text.length; l++) {
              _ssss += "_";
            }
            djson[i].terms[j].text =
              djson[i].terms[j].text.charAt(0) +
              _ssss +
              djson[i].terms[j].post.replace(/\s/g, "");
          }
          //console.log(djson[i].terms[j], ver);
          if (
            djson[i].terms[j].tags.indexOf("NumericValue")!==-1 &&
            djson[i].terms[j].text !== "1"
          ) {
            ver = ver + "</li>";
            domver.innerHTML += ver;
            ver = "<li>";
          } else if (
            i === djson.length - 1 &&
            j === djson[i].terms.length - 1
          ) {
            ver += djson[i].terms[j].text.replace(/([0-9]+)/g, "") + " ";
            ver = ver + "</li>";
            domver.innerHTML += ver;
            ver = "<li>";
          } else {
            ver += djson[i].terms[j].text.replace(/([0-9]+)/g, "") + " ";
          }
        }
      }
    } else if (lvl === 4) {
      for (var i = 0; i < djson.length; i++) {
        for (var j = 0; j < djson[i].terms.length; j++) {
          if (
            djson[i].terms[j].tags.indexOf("Noun") !== -1
          ) {
            let _ssss = "";
            for (var l = 0; l < djson[i].terms[j].text.length; l++) {
              _ssss += "_";
            }
            djson[i].terms[j].text =
              djson[i].terms[j].text.charAt(0) +
              _ssss +
              djson[i].terms[j].post.replace(/\s/g, "");
          }
          //console.log(djson[i].terms[j], ver);
          if (
            djson[i].terms[j].tags.indexOf("NumericValue")!==-1 &&
            djson[i].terms[j].text !== "1"
          ) {
            ver = ver + "</li>";
            domver.innerHTML += ver;
            ver = "<li>";
          } else if (
            i === djson.length - 1 &&
            j === djson[i].terms.length - 1
          ) {
            ver += djson[i].terms[j].text.replace(/([0-9]+)/g, "") + " ";
            ver = ver + "</li>";
            domver.innerHTML += ver;
            ver = "<li>";
          } else {
            ver += djson[i].terms[j].text.replace(/([0-9]+)/g, "") + " ";
          }
        }
      }
    } else if (lvl === 5) {
      for (var i = 0; i < djson.length; i++) {
        for (var j = 0; j < djson[i].terms.length; j++) {
          if (
            djson[i].terms[j].tags.indexOf("Noun") !== -1 ||
            djson[i].terms[j].tags.indexOf("Verb") !== -1
          ) {
            let _ssss = "";
            for (var l = 0; l < djson[i].terms[j].text.length; l++) {
              _ssss += "_";
            }
            djson[i].terms[j].text =
              djson[i].terms[j].text.charAt(0) +
              _ssss +
              djson[i].terms[j].post.replace(/\s/g, "");
          }
          //console.log(djson[i].terms[j], ver);
          if (
            djson[i].terms[j].tags.indexOf("NumericValue")!==-1 &&
            djson[i].terms[j].text !== "1"
          ) {
            ver = ver + "</li>";
            domver.innerHTML += ver;
            ver = "<li>";
          } else if (
            i === djson.length - 1 &&
            j === djson[i].terms.length - 1
          ) {
            ver += djson[i].terms[j].text.replace(/([0-9]+)/g, "") + " ";
            ver = ver + "</li>";
            domver.innerHTML += ver;
            ver = "<li>";
          } else {
            ver += djson[i].terms[j].text.replace(/([0-9]+)/g, "") + " ";
          }
        }
      }
    } else if (lvl === 6) {
      for (var i = 0; i < djson.length; i++) {
        for (var j = 0; j < djson[i].terms.length; j++) {
          if (
            djson[i].terms[j].tags.indexOf("Noun") !== -1 ||
            djson[i].terms[j].tags.indexOf("Verb") !== -1 ||
            djson[i].terms[j].text.length > 3
          ) {
            let _ssss = "";
            for (var l = 0; l < djson[i].terms[j].text.length; l++) {
              _ssss += "_";
            }
            djson[i].terms[j].text =
              djson[i].terms[j].text.charAt(0) +
              _ssss +
              djson[i].terms[j].post.replace(/\s/g, "");
          }
          //console.log(djson[i].terms[j], ver);
          if (
            djson[i].terms[j].tags.indexOf("NumericValue")!==-1 &&
            djson[i].terms[j].text !== "1"
          ) {
            ver = ver + "</li>";
            domver.innerHTML += ver;
            ver = "<li>";
          } else if (
            i === djson.length - 1 &&
            j === djson[i].terms.length - 1
          ) {
            ver += djson[i].terms[j].text.replace(/([0-9]+)/g, "") + " ";
            ver = ver + "</li>";
            domver.innerHTML += ver;
            ver = "<li>";
          } else {
            ver += djson[i].terms[j].text.replace(/([0-9]+)/g, "") + " ";
          }
        }
      }
    } else if (lvl === 7) {
      for (var i = 0; i < djson.length; i++) {
        for (var j = 0; j < djson[i].terms.length; j++) {
          if (djson[i].terms[j].text.length > 7) {
            let _ssss = "";
            for (var l = 0; l < djson[i].terms[j].text.length; l++) {
              _ssss += "_";
            }
            djson[i].terms[j].text =
              _ssss + djson[i].terms[j].post.replace(/\s/g, "");
          }
          //console.log(djson[i].terms[j], ver);
          if (
            djson[i].terms[j].tags.indexOf("NumericValue")!==-1 &&
            djson[i].terms[j].text !== "1"
          ) {
            ver = ver + "</li>";
            domver.innerHTML += ver;
            ver = "<li>";
          } else if (
            i === djson.length - 1 &&
            j === djson[i].terms.length - 1
          ) {
            ver += djson[i].terms[j].text.replace(/([0-9]+)/g, "") + " ";
            ver = ver + "</li>";
            domver.innerHTML += ver;
            ver = "<li>";
          } else {
            ver += djson[i].terms[j].text.replace(/([0-9]+)/g, "") + " ";
          }
        }
      }
    } else if (lvl === 8) {
      for (var i = 0; i < djson.length; i++) {
        for (var j = 0; j < djson[i].terms.length; j++) {
          if (
            djson[i].terms[j].tags.indexOf("ProperNoun") !== -1
          ) {
            let _ssss = "";
            for (var l = 0; l < djson[i].terms[j].text.length; l++) {
              _ssss += "_";
            }
            djson[i].terms[j].text =
              _ssss + djson[i].terms[j].post.replace(/\s/g, "");
          }
          //console.log(djson[i].terms[j], ver);
          if (
            djson[i].terms[j].tags.indexOf("NumericValue")!==-1 &&
            djson[i].terms[j].text !== "1"
          ) {
            ver = ver + "</li>";
            domver.innerHTML += ver;
            ver = "<li>";
          } else if (
            i === djson.length - 1 &&
            j === djson[i].terms.length - 1
          ) {
            ver += djson[i].terms[j].text.replace(/([0-9]+)/g, "") + " ";
            ver = ver + "</li>";
            domver.innerHTML += ver;
            ver = "<li>";
          } else {
            ver += djson[i].terms[j].text.replace(/([0-9]+)/g, "") + " ";
          }
        }
      }
    } else if (lvl === 9) {
      for (var i = 0; i < djson.length; i++) {
        for (var j = 0; j < djson[i].terms.length; j++) {
          if (djson[i].terms[j].tags.indexOf("Noun") !== -1) {
            let _ssss = "";
            for (var l = 0; l < djson[i].terms[j].text.length; l++) {
              _ssss += "_";
            }
            djson[i].terms[j].text =
              _ssss + djson[i].terms[j].post.replace(/\s/g, "");
          }
          //console.log(djson[i].terms[j], ver);
          if (
            djson[i].terms[j].tags.indexOf("NumericValue")!==-1 &&
            djson[i].terms[j].text !== "1"
          ) {
            ver = ver + "</li>";
            domver.innerHTML += ver;
            ver = "<li>";
          } else if (
            i === djson.length - 1 &&
            j === djson[i].terms.length - 1
          ) {
            ver += djson[i].terms[j].text.replace(/([0-9]+)/g, "") + " ";
            ver = ver + "</li>";
            domver.innerHTML += ver;
            ver = "<li>";
          } else {
            ver += djson[i].terms[j].text.replace(/([0-9]+)/g, "") + " ";
          }
        }
      }
    } else if (lvl === 10) {
      for (var i = 0; i < djson.length; i++) {
        for (var j = 0; j < djson[i].terms.length; j++) {
          if (
            djson[i].terms[j].tags.indexOf("Noun") !== -1 ||
            djson[i].terms[j].text.length > 5
          ) {
            let _ssss = "";
            for (var l = 0; l < djson[i].terms[j].text.length; l++) {
              _ssss += "_";
            }
            djson[i].terms[j].text =
              _ssss + djson[i].terms[j].post.replace(/\s/g, "");
          }
          //console.log(djson[i].terms[j], ver);
          if (
            djson[i].terms[j].tags.indexOf("NumericValue")!==-1 &&
            djson[i].terms[j].text !== "1"
          ) {
            ver = ver + "</li>";
            domver.innerHTML += ver;
            ver = "<li>";
          } else if (
            i === djson.length - 1 &&
            j === djson[i].terms.length - 1
          ) {
            ver += djson[i].terms[j].text.replace(/([0-9]+)/g, "") + " ";
            ver = ver + "</li>";
            domver.innerHTML += ver;
            ver = "<li>";
          } else {
            ver += djson[i].terms[j].text.replace(/([0-9]+)/g, "") + " ";
          }
        }
      }
    } else if (lvl === 11) {
      for (var i = 0; i < djson.length; i++) {
        for (var j = 0; j < djson[i].terms.length; j++) {
          if (
            djson[i].terms[j].tags.indexOf("Noun") !== -1 ||
            djson[i].terms[j].tags.indexOf("Verb") !== -1
          ) {
            let _ssss = "";
            for (var l = 0; l < djson[i].terms[j].text.length; l++) {
              _ssss += "_";
            }
            djson[i].terms[j].text =
              _ssss + djson[i].terms[j].post.replace(/\s/g, "");
          }
          //console.log(djson[i].terms[j], ver);
          if (
            djson[i].terms[j].tags.indexOf("NumericValue")!==-1 &&
            djson[i].terms[j].text !== "1"
          ) {
            ver = ver + "</li>";
            domver.innerHTML += ver;
            ver = "<li>";
          } else if (
            i === djson.length - 1 &&
            j === djson[i].terms.length - 1
          ) {
            ver += djson[i].terms[j].text.replace(/([0-9]+)/g, "") + " ";
            ver = ver + "</li>";
            domver.innerHTML += ver;
            ver = "<li>";
          } else {
            ver += djson[i].terms[j].text.replace(/([0-9]+)/g, "") + " ";
          }
        }
      }
    } else if (lvl === 12) {
      for (var i = 0; i < djson.length; i++) {
        for (var j = 0; j < djson[i].terms.length; j++) {
          if (
            djson[i].terms[j].tags.indexOf("Noun") !== -1 ||
            djson[i].terms[j].tags.indexOf("Verb") !== -1 ||
            djson[i].terms[j].text.length > 3
          ) {
            let _ssss = "";
            for (var l = 0; l < djson[i].terms[j].text.length; l++) {
              _ssss += "_";
            }
            djson[i].terms[j].text =
              _ssss + djson[i].terms[j].post.replace(/\s/g, "");
          }
          //console.log(djson[i].terms[j], ver);
          if (
            djson[i].terms[j].tags.indexOf("NumericValue")!==-1 &&
            djson[i].terms[j].text !== "1"
          ) {
            ver = ver + "</li>";
            domver.innerHTML += ver;
            ver = "<li>";
          } else if (
            i === djson.length - 1 &&
            j === djson[i].terms.length - 1
          ) {
            ver += djson[i].terms[j].text.replace(/([0-9]+)/g, "") + " ";
            ver = ver + "</li>";
            domver.innerHTML += ver;
            ver = "<li>";
          } else {
            ver += djson[i].terms[j].text.replace(/([0-9]+)/g, "") + " ";
          }
        }
      }
    }
  }
});
/*
document.addEventListener("keydown", function(e) {
  e.preventDefault();
  if (started) {
    var key = keys[e.keyCode];
    var boxverse = verse.slice(w, verse.length);
    //console.log(verse, w, verses[v], v, boxverse);
    if (verse[w].substr(0, 1).toLowerCase() === key) {
      score += 10;
      domver.innerHTML = "";
      domscore.innerHTML = "score: " + score;
      w++;
      for (var i = 0; i < w; i++) {
        domver.innerHTML += verse[i] + " ";
      }
      if (keysright[key] === undefined) {
        keysright[key] = 0;
      }
      keysright[key] += 1;
      right++;
      if (w >= verse.length) {
        w = complete ? 0 : 3;
        endverse.play();
        versesdone2.push(book + " " + chapter + ":" + verses[v].ver);
        //console.log(vchange, v);
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
          //console.log(verse, w, verses[v], v);
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
      if (keyswrong[key] === undefined) {
        keyswrong[key] = 0;
      }
      keyswrong[key] += 1;
      errors++;
      //console.log("wrong");
      score -= 5;
      domscore.innerHTML = "score: " + score;
      error.play();
    }
  }
  if (e.keyCode === 13 && !started) {
    if (chset.value !== "" && qset.value !== "" && pset.value !== "") {
      for (var i = 0; i < str[c].length; i++) {
        verses.push({ str: str[c][i], inc: 1, ver: i + 1 });
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
      domver.innerHTML = verses[0].str
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
*/
var gettextListener = function gettextListener() {
  text = this.responseText;
  text = text.replace(/([0-9]+)/g, " $1 ");
  text = text.replace(/([“”\?\.\,\:\;)(]+)/g, " $1 ");
  text = text.split(/(?<![0-9])1(?![0-9])/g);
  text.shift();
};
/*
var countIt = function countIt() {
  ////console.log(parseFloat(time))
  if (started) {
    if (prompterizer) {
      if (v < verses.length) {
        time = time + up;
        dtimer.textContent =
          Math.floor(time / 60) + ":" + (time % 60 ? time % 60 : "00");
      } else {
        window.clearInterval(timer);
        postData(
          "/postprompter",
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
            //console.log(JSON.stringify(data));
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
        //console.log(
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
        //console.log(JSON.parse(localsave("userdata", "get")));
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
            //console.log(JSON.stringify(data));
            location.reload();
          }
        );
      }
    }
  }
};

var timer = window.setInterval(countIt, 1000);*/

var hebrewsRequest = new XMLHttpRequest();
hebrewsRequest.onload = gettextListener;
hebrewsRequest.open("get", "/gettext/" + localStorage.playerseason);
hebrewsRequest.send();
})