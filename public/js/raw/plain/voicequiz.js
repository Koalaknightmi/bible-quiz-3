"use strict";
import * as annyang from "../../lib/annyang.js";
import log from "./log";
var mylocalkey = "koalastrikermi-bbqo-";

var localsave = function localsave(vare, gs, t) {
  if (gs === "set") {
    localStorage.setItem(mylocalkey + vare, t);
    //log("localstorage item " + mylocalkey + vare + " is now set to: " + localStorage.getItem(mylocalkey + vare));
  } else if (gs === "get") {
    //log("localstorage item " + mylocalkey + vare + " was returned as: " + localStorage.getItem(mylocalkey + vare));
    return localStorage.getItem(mylocalkey + vare);
  } else if (gs === "devare") {
    //log(mylocalkey + vare + "  was devared");
    localStorage.removeItem(mylocalkey + vare);
  }
};

var random = function random(a, b) {
  return Math.floor(Math.random() * b) + a;
};
var time;
var quote = true;
var complete = true;
var started = false;
var prompt = complete ? 0 : 3;
var v;
var score = 0;
var count = quote ? 0 : 300;
var chapter = 1;
var book = "hebrews";
var up = quote ? 1 : -1;
var domver = document.getElementById("verse");
var domref = document.getElementById("refrence");
var domscore = document.getElementById("score");
var dtimer = document.getElementById("timer");
var tq = document.getElementById("t-q");
var str;
var ch = "h1";
var chset = document.getElementById("ch-select");
var qset = document.getElementById("ch-type");
var pset = document.getElementById("ch-prompt");
var sbtn = document.getElementById("type-start-btn");
var set = document.getElementById("settings");
var c = 0;
var v = 1;
var w = 0;
var vchange;
var gettextListener = function gettextListener() {
  str = this.responseText;
  str = str.split(" 1 ");
  str.shift();
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].split(/[0-9]+\s/);
    for (var j = 0; j < str[i].length; j++) {
      str[i][j] = str[i][j].replace(/[-\/\\^$*+?.()|[\]{}"';:,!“—”‘`’]|[0-9]|\n/g, " ").trim().replace(/\s\s\s/g, " ").replace(/\s\s/g, " ").replace(/\s\s/g, " ");//cleans
    }
  }
  console.log(str);
  v = quote ? 1 : random(1, str[c].length);
};
//console.log(str);

var verse;
//console.log(verse);

chset.addEventListener('input', function (e) {
  //console.log(e.target.value)
  //console.log("changed")
  ch = e.target.value;
  if (ch.indexOf("1p") !== -1) {
    c = 13 + parseFloat(ch.split("p")[1]);
    chapter = parseFloat(ch.split("p")[1]);
    book = "1peter";
    console.log(c);
  } else if (ch.indexOf("2p") !== -1) {
    c = 18 + parseFloat(ch.split("p")[1]);
    chapter = parseFloat(ch.split("p")[1]);
    book = "2peter";
    console.log(c);
  } else {
    c = ch.split("h")[1];
    chapter = c;
    book = "hebrews";
    console.log(c);
  }
});

qset.addEventListener('input', function (e) {
  if (e.target.value === "c") {
    quote = false;
  } else {
    quote = true;
  }
});

pset.addEventListener('input', function (e) {
  if (e.target.value === "y") {
    complete = false;
  } else {
    complete = true;
  }
});

sbtn.addEventListener('click', function (e) {
  if (chset.value !== "" && qset.value !== "" && pset.value !== "") {
    ch = chset.value;
    if (ch.indexOf("1p") !== -1) {
      c = 13 + parseFloat(ch.split("p")[1]);
      chapter = parseFloat(ch.split("p")[1]);
      book = "1peter";
      console.log(c);
    } else if (ch.indexOf("2p") !== -1) {
      c = 18 + parseFloat(ch.split("p")[1]);
      chapter = parseFloat(ch.split("p")[1]);
      book = "2peter";
      console.log(c);
    } else {
      c = ch.split("h")[1];
      chapter = c;
      book = "hebrews";
      console.log(c);
    }
    c = c - 1;
    prompt = complete ? 0 : 3;
    w = 0;
    v = quote ? 1 : random(1, str[c].length);
    vchange = quote ? v + 1 : random(1, str[c].length);
    count = quote ? 0 : 300;
    time = count;
    dtimer.textContent = Math.floor(time / 60) + ":" + (time % 60 ? time % 60 : '00');
    up = quote ? 1 : -1;
    started = true;
    domref.innerHTML = book + " " + chapter + ":" + v;
    domver.innerHTML = "";
    domscore.innerHTML = "score: " + score;
    tq.style.display = "block";
    set.style.display = "none";
    verse = str[c][v - 1].split(/\s/g);
    domver.innerHTML = verse.slice(0, prompt).toString().replace(/,/g, " ");
    if (window.annyang && started) {
      // Let's define our first command. First the text we expect, and then the function it should call
      var commands = {
        '*ve': check
      };

      // Add our commands to annyang
      window.annyang.addCommands(commands);
      window.annyang.addCallback('result', function (phrases) {
        console.log("I think the user said: ", phrases[0]);
        console.log("But then again, it could be any of the following: ", phrases);
      });
      // Start listening. You can call this here, or attach this call to an event, button, etc.
      window.annyang.start();
    }
  }
});

function check(ve) {
  var vear = [];
  vear = ve.split(" ");
  var test = verse.slice(w, vear.length + w).toString().replace(/,/g, " ").toLowerCase();
  console.log(test);
  if (ve.toLowerCase().replace(/['`’]/g, '') === test.replace(/['`’]/g, '')) {
    console.log("right:" + ve.toLowerCase() + "=" + test);
    w += vear.length;
    domver.innerHTML = verse.slice(0, w).toString().replace(/,/g, " ");
    if (w >= verse.length) {
      v = vchange;
      console.log(v);
      console.log(vchange);
      vchange = quote ? v + 1 : random(1, str[c].length);
      w = 0;
      verse = str[c][v - 1].split(/\s/g);
      console.log(verse);
      console.log(w);
      domref.innerHTML = book + " " + chapter + ":" + v;
      domver.innerHTML = "";
      domscore.innerHTML = "score: " + score;
      domver.innerHTML = verse.slice(0, prompt).toString().replace(/,/g, " ");
      domver.style.background = "green";
      console.log(verse.slice(0, prompt).toString().replace(/,/g, " "));
    }
  } else {
    domver.style.background = "red";
    console.log("error:" + ve.toLowerCase() + "!=" + test);
  }
  console.groupEnd();
}

function postData(url, data, then) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      return resolve(xhr.responseText);
    };
    xhr.onerror = function () {
      return reject(xhr.statusText);
    };
    xhr.send(data);
  }).then(function (successMessage) {
    then(successMessage);
  }).catch(function (error) {
    console.log("no internet doing default", error, JSON.stringify(data));
    location.reload();
  });
}

var hebrewsRequest = new XMLHttpRequest();
hebrewsRequest.onload = gettextListener;
hebrewsRequest.open('get', '/gettext');
hebrewsRequest.send();

var countIt = function countIt() {
  //console.log(parseFloat(time))
  if (started) {
    if (quote) {
      if (v < str[c].length) {
        time = time + up;
        dtimer.textContent = Math.floor(time / 60) + ":" + (time % 60 ? time % 60 : '00');
      } else {
        window.clearInterval(timer);
        postData("/vquotecomplete", JSON.stringify({ ch: ch, score: time, prompt: prompt, user: JSON.parse(localsave("userdata", "get")).name, pw: JSON.parse(localsave("userdata", "get")).pass }), function (data) {
          console.log(JSON.stringify(data));
          location.reload();
        });
      }
    } else {
      if (time > 0) {
        time = time + up;
        dtimer.textContent = Math.floor(time / 60) + ":" + (time % 60 ? time % 60 : '00');;
      } else {
        console.log(JSON.stringify({ ch: ch, score: score, prompt: prompt, name: JSON.parse(localsave("userdata", "get")).name, pw: JSON.parse(localsave("userdata", "get")).pass }));

        window.clearInterval(timer);
        console.log(JSON.parse(localsave("userdata", "get")));
        postData("/vpostcomplete", JSON.stringify({ ch: ch, score: score, prompt: prompt, user: JSON.parse(localsave("userdata", "get")).name, pw: JSON.parse(localsave("userdata", "get")).pass }), function (data) {
          console.log(JSON.stringify(data));
          location.reload();
        });
      }
    }
  }
};

var timer = window.setInterval(countIt, 1000);