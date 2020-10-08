window.addEventListener('load', (event) => {
var io = window.io;
//var P2P = window.P2P;
var log = window.log;
var fadeOut = window.fadeOut,
  fadeIn = window.fadeIn;
var localsave = window.localsave;
var socket = window.socket;
var st = io.connect("https://koalaknightmi-bible-quiz2-1.glitch.me/Oquizzing"); // the games conection
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var mediaStreamDestination;

var key = "";
var ingame = false;
var g_i_s = {
  i: document.getElementById("g-i-img"),
  t: document.getElementById("g-i-type"),
  u: document.getElementById("g-i-username"),
  a: document.getElementById("g-i-ar"),
  qm: document.getElementById("g-i-qm"),
  p: document.getElementById("g-i-pnum"),
  pt: document.getElementById("g-i-table-b")
};
function getid(i){
  return document.getElementById(i)
}
var game_create_btn = document.getElementById("create-game-btn");
var game_join_btn = document.getElementById("join-game-btn");
var jumpbtn = document.getElementById("jump-btn");
var startbtn = document.getElementById("start-btn");
var gamepage = document.getElementById("game");
var ingamepage = document.getElementById("ingame");
var homepage = document.getElementById("home");
var g_list = document.getElementById("g-table-b");
var pllistnos1 = document.getElementById("ig-i-table-b1");
var pllistnos2 = document.getElementById("ig-i-table-b2");
var pllistnos12 = document.getElementById("ig-i-table-b12");
var pllistnos22 = document.getElementById("ig-i-table-b22");
var scoresheet = document.getElementById("scoresheet");
var qmstuff = getid("qmstuff");
var createbtn2 = getid("c-btn");
var selecttype = getid("type-pick");
var namein = getid("g-picker-n");
var gcp1 = getid("g-i");
var gcp2 = getid("g-picker");
var gselected = false;
var quizmaster = false;
var jumped = false;
var captain = false;
var jumper = "";
var gamedata = {};
var id = "";
var timeoffset = 0
function drawteams(data) {
  data = data.u;
  console.log(data);
  /*if (data.playerNum > 1) {
    startbtn.disabled = false;
  }*/
  gamedata = data;
  scoresheet.innerHTML = "";
  function drawteam1() {
    scoresheet.innerHTML +=
      "<tr><td colspan = '" +
      (data.scoresheet.q - 4) +
      "'>" +
      data.team1.name +
      "</td><td colspan = '8'> <span>team errors:</span> " +
      data.team1.errors +
      "</td><td colspan = '3'>timeouts:" +
      data.team1.timeouts +
      "</td></tr>";
    let tr1 = document.createElement("tr");
    tr1.innerHTML =
      "<td>seat</td><td>username</td><td>captain</td><td>fouls</td>";
    for (var i = 0; i < data.scoresheet.q; i++) {
      let tdnum = document.createElement("td");
      tdnum.innerText = i + 1;
      tr1.appendChild(tdnum);
    }
    tr1.innerHTML += "<td>score</td><td>errors</td>";
    scoresheet.appendChild(tr1);
    for (var j = 0; j < data.scoresheet.team1.length; j++) {
      let t1u = data.scoresheet.team1[j];
      console.log(t1u);
      let d = document.createElement("tr");
      let td0 = document.createElement("td");
      td0.innerHTML = j + 1;
      let td1 = document.createElement("td");
      if (t1u.titled) {
        td1.innerHTML =
          "<b style = 'color:red'>" +
          t1u.tabr +
          " </b><a href = '/user/" +
          t1u.name +
          "' style = 'color:" +
          t1u.col +
          "'>" +
          t1u.name +
          "</a>";
      } else {
        td1.innerHTML =
          "<a href = '/user/" +
          t1u.name +
          "' style = 'color:" +
          t1u.col +
          "'>" +
          t1u.name +
          "</a>";
      }
      d.appendChild(td0);
      d.appendChild(td1);
      let tdc = document.createElement("td");
      tdc.innerText = t1u.c;
      d.appendChild(tdc);
      let fc = "<td>";
      for (let g = 0; g < 3; g++) {
        if (!t1u.f[g]) {
          fc += "<span class='dot correct'></span>";
        } else {
          fc += "<span class='dot incorrect'></span>";
        }
      }
      d.innerHTML += fc + "</td>";
      for (var i = 0; i < data.scoresheet.q; i++) {
        let td2 = document.createElement("td");
        td2.innerHTML = t1u.q[i];
        d.appendChild(td2);
      }
      d.innerHTML += "<td>" + t1u.score + "</td><td>" + t1u.errors + "</td>";
      scoresheet.appendChild(d);
    }
    let bs = "<tr><td colspan = '4'>Bonus and penalty points</td>";
    for (var m = 0; m < data.scoresheet.team1bonuses.length; m++) {
      bs += "<td>" + data.scoresheet.team1bonuses[m] + "</td>";
    }
    scoresheet.innerHTML +=
      bs + "<td>" + data.scoresheet.team1bsc + "</td>" + "<td></td></tr>";
    let rs = "<tr><td colspan = '4'>Running score</td>";
    for (var m = 0; m < data.scoresheet.team1score.length; m++) {
      rs += "<td>" + data.scoresheet.team1score[m] + "</td>";
    }
    scoresheet.innerHTML +=
      rs + "<td>" + data.scoresheet.team1sc + "</td>" + "<td></td></tr>";
    pllistnos1.innerHTML = "";
    for (var n in data.team1.players) {
      let n2 = data.team1.players[n];
      let ne2 = document.createElement("tr");
      if (n2.titled) {
        ne2.innerHTML =
          "<td><b style = 'color:red'>" +
          n2.tabr +
          " </b><a href = '/user/" +
          n2.user +
          "' style = 'color:" +
          n2.pcol +
          "'>" +
          n2.user +
          "</a></td><td>" +
          n2.ratingdt.rating +
          "</td><td>" +
          n2.score +
          "</td>";
      } else {
        ne2.innerHTML =
          "<td><a href = '/user/" +
          n2.user +
          "' style = 'color:" +
          n2.pcol +
          "'>" +
          n2.user +
          "</a></td><td>" +
          n2.ratingdt.rating +
          "</td><td>" +
          n2.score +
          "</td>";
      }
      console.log(n2);
      pllistnos1.appendChild(ne2);
    }
    var ne3 = document.createElement("tr");
    ne3.innerHTML = "<td colspan = 3>" + data.team1.avg + "</td>";
    pllistnos1.appendChild(ne3);
  }
  function drawteam2() {
    scoresheet.innerHTML +=
      "<tr><td colspan = '" +
      (data.scoresheet.q - 4) +
      "'>" +
      data.team2.name +
      "</td><td colspan = '8'> <span>team errors:</span> " +
      data.team2.errors +
      "</td><td colspan = '3'>timeouts:" +
      data.team2.timeouts +
      "</td></tr>";
    let tr1 = document.createElement("tr");
    tr1.innerHTML =
      "<td>seat</td><td>username</td><td>captain</td><td>fouls</td>";
    for (var i = 0; i < data.scoresheet.q; i++) {
      let tdnum = document.createElement("td");
      tdnum.innerText = i + 1;
      tr1.appendChild(tdnum);
    }
    tr1.innerHTML += "<td>score</td><td>errors</td>";
    scoresheet.appendChild(tr1);
    for (var j = 0; j < data.scoresheet.team2.length; j++) {
      let t1u = data.scoresheet.team2[j];
      let d = document.createElement("tr");
      let td0 = document.createElement("td");
      td0.innerHTML = j + 1;
      let td1 = document.createElement("td");
      if (t1u.titled) {
        td1.innerHTML =
          "<b style = 'color:red'>" +
          t1u.tabr +
          " </b><a href = '/user/" +
          t1u.name +
          "' style = 'color:" +
          t1u.col +
          "'>" +
          t1u.name +
          "</a>";
      } else {
        td1.innerHTML =
          "<a href = '/user/" +
          t1u.name +
          "' style = 'color:" +
          t1u.col +
          "'>" +
          t1u.name +
          "</a>";
      }
      d.appendChild(td0);
      d.appendChild(td1);
      let tdc = document.createElement("td");
      tdc.innerText = t1u.c;
      d.appendChild(tdc);
      let fc = "<td>";
      for (let g = 0; g < 3; g++) {
        if (!t1u.f[g]) {
          fc += "<span class='dot correct'></span>";
        } else {
          fc += "<span class='dot incorrect'></span>";
        }
      }
      d.innerHTML += fc + "</td>";
      for (var i = 0; i < data.scoresheet.q; i++) {
        let td2 = document.createElement("td");
        td2.innerHTML = t1u.q[i];
        d.appendChild(td2);
      }
      d.innerHTML += "<td>" + t1u.score + "</td><td>" + t1u.errors + "</td>";
      scoresheet.appendChild(d);
    }
    let bs = "<tr><td colspan = '4'>Bonus and penalty points</td>";
    for (var m = 0; m < data.scoresheet.team2bonuses.length; m++) {
      bs += "<td>" + data.scoresheet.team2bonuses[m] + "</td>";
    }
    scoresheet.innerHTML +=
      bs + "<td>" + data.scoresheet.team2bsc + "</td>" + "<td></td></tr>";
    let rs = "<tr><td colspan = '4'>Running score</td>";
    for (var m = 0; m < data.scoresheet.team2score.length; m++) {
      rs += "<td>" + data.scoresheet.team2score[m] + "</td>";
    }
    scoresheet.innerHTML +=
      rs + "<td>" + data.scoresheet.team2sc + "</td>" + "<td></td></tr>";
    pllistnos2.innerHTML = "";
    for (var n in data.team2.players) {
      let n2 = data.team2.players[n];
      let ne2 = document.createElement("tr");
      if (n2.titled) {
        ne2.innerHTML =
          "<td><b style = 'color:red'>" +
          n2.tabr +
          " </b><a href = '/user/" +
          n2.user +
          "' style = 'color:" +
          n2.pcol +
          "'>" +
          n2.user +
          "</a></td><td>" +
          n2.ratingdt.rating +
          "</td><td>" +
          n2.score +
          "</td>";
      } else {
        ne2.innerHTML =
          "<td><a href = '/user/" +
          n2.user +
          "' style = 'color:" +
          n2.pcol +
          "'>" +
          n2.user +
          "</a></td><td>" +
          n2.ratingdt.rating +
          "</td><td>" +
          n2.score +
          "</td>";
      }
      console.log(n2);
      pllistnos2.appendChild(ne2);
    }
    var ne3 = document.createElement("tr");
    ne3.innerHTML = "<td colspan = 3>" + data.team2.avg + "</td>";
    pllistnos2.appendChild(ne3);
  }
  drawteam1();
  drawteam2();
  scoresheet.innerHTML +=
    "<tr><td colspan = '" +
    (data.scoresheet.q + 6) +
    "'>quizmaster: " +
    data.quizmaster +
    "</td></tr>";
}
function startStream() {
  navigator.getUserMedia(
    { audio: true,
      video: true },
    function(stream) {
      //window.alert("starting stream")
      /*var audioContext = new window.AudioContext();
      var mediaStreamSource = audioContext.createMediaStreamSource(stream);
      mediaStreamDestination = audioContext.createMediaStreamDestination();
      mediaStreamSource.connect(mediaStreamDestination);
      console.log(audioContext)
      console.log(mediaStreamSource)*/
      /*var p2p = new P2P(st, {
        peerOpts: { stream: mediaStreamDestination.stream },
        autoUpgrade: true
      });

      p2p.on("ready", function() {
        p2p.usePeerConnection = true;
        jumpbtn.style.display = "block";
        startbtn.style.display = "none";
        console.log("p2p ready")
      });

      p2p.emit("ready", { peerId: p2p.peerId });

      jumpbtn.addEventListener("click", function(e) {
        p2p.emit("jumped", {
          user: JSON.parse(localsave("userdata", "get")).name,
          id: id
        });
        console.log("p2p ready")
      });
      p2p.on("jumped", function(data) {console.log("p2p ready")
        jumper = data.user;
        /*if(gamedata.players[id]){
        if()
      }
      else{

      }*//*
      });
      p2p.on("stream", function(stream) {
        var audio = document.querySelector("audio");
        audio.src = window.URL.createObjectURL(stream);
        audio.play();console.log("p2p stream")
      });*/
    },
    function(err) {
      console.log(err);
    }
  );
}
function startGame(){
  //startStream()
}
function clearmatchstats() {
  g_i_s.pt.innerHTML = "";
  g_i_s.pt.innerHTML = "";
  g_i_s.t.textContent = "";
  g_i_s.u.innerHTML = "";
  g_i_s.qm.innerHTML = "";
  g_i_s.a.textContent = "";
  g_i_s.p.textContent = "";
}
st.on("match begun", function(data) {
  startStream();
  if(quizmaster){
    jumpbtn.display = "none";
    qmstuff.display = "block"
  }
});
st.on("getusername", function() {
  console.log("sending username");
  st.emit("userdata", {
    user: JSON.parse(localsave("userdata", "get")).name,
    pass: JSON.parse(localsave("userdata", "get")).pass
  });
});
st.on("Omatch joined", function(data, qm) {
  console.log(data, qm);
  quizmaster = qm;
  if(qm){
    startbtn.style.display = "block"
  }
  id = data.id;
  ingame = true;
  homepage.style.display = "none";
  fadeIn(gamepage, 1000);
  drawteams(data);
});
/*st.on("Omatch joined",function(){
  console.log("joined")
  ingame = true;
  homepage.style.display = "none"
  fadeOut(gamepage,1000)
})*/
st.on("gettime",function(){
  st.emit("pltime",Date.now())
})
st.on("playtime", function(data) {
  console.dir(data);
  g_list.innerHTML = "";
  var gpc = function(e) {
    let id = this.id;
    gselected = true;
    g_i_s.pt.innerHTML = "";
    key = data[id].creator;
    //g_i_s.i.src = maps_imgs[data[id].map];
    g_i_s.t.textContent = data[id].type;
    g_i_s.u.innerHTML =
      "<a class = 'profilelink' style = 'color:" +
      data[id].creatorcol +
      "' href = '/user/" +
      data[id].creator +
      "'>" +
      data[id].creator +
      "</a>";
    g_i_s.qm.innerHTML =
      "<a class = 'profilelink' style = 'color:" +
      data[id].creatorcol +
      "' href = '/user/" +
      data[id].quizmaster +
      "'>" +
      data[id].quizmaster +
      "</a>";
    g_i_s.a.textContent = data[id].ratingavg;
    g_i_s.p.textContent = data[id].playerNum;
    var players1 = [];
    var players2 = [];
    for (var i in data[id].team1.players) {
      players1.push(data[id].team1.players[i]);
    }
    for (var i in data[id].team2.players) {
      players2.push(data[id].team2.players[i]);
    }
    for (var i = 0; i < players1.length; i++) {
      var p = players1[i];
      var p2 = players2[i];
      var gplayrst = document.createElement("tr");
      console.log(p, p2);
      if (p2 !== undefined) {
        gplayrst.innerHTML =
          "<td><a class = 'profilelink' style = 'color:" +
          p.pcol +
          "' href = '/user/" +
          p.user +
          "'>" +
          p.user +
          "</a></td><td>" +
          p.ratingdt.rating +
          "</td><td>" +
          p.score +
          "</td><td></td><td><a class = 'profilelink' style = 'color:" +
          p2.pcol +
          "' href = '/user/" +
          p2.user +
          "'>" +
          p2.user +
          "</a></td><td>" +
          p2.ratingdt.rating +
          "</td><td>" +
          p2.score +
          "</td>";
      } else {
        gplayrst.innerHTML =
          "<td><a class = 'profilelink' style = 'color:" +
          p.pcol +
          "' href = '/user/" +
          p.user +
          "'>" +
          p.user +
          "</a></td><td>" +
          p.ratingdt.rating +
          "</td><td>" +
          p.score +
          "</td><td></td><td></td><td></td><td></td>";
      }
      g_i_s.pt.appendChild(gplayrst);
    }
    /*for(var i in data[id].team1) {
        var p = data[id].team1.players[i];
        var p2 = data[id].team2.players[i];
        var gplayrst = document.createElement("tr");
        console.log(p,p2)
        if(p2!==undefined){
          gplayrst.innerHTML = "<td><a class = 'profilelink' style = 'color:" + p.pcol + "' href = '/user/" + p.user + "'>" + p.user + "</a></td><td>" + p.ratingdt.rating + "</td><td>" + p.score + "</td><td></td><td><a class = 'profilelink' style = 'color:" + p2.pcol + "' href = '/user/" + p2.user + "'>" + p2.user + "</a></td><td>" + p2.ratingdt.rating + "</td><td>" + p2.score + "</td>";
        }
        else{
          gplayrst.innerHTML = "<td><a class = 'profilelink' style = 'color:" + p.pcol + "' href = '/user/" + p.user + "'>" + p.user + "</a></td><td>" + p.ratingdt.rating + "</td><td>" + p.score + "</td><td></td><td></td><td></td><td></td>";
        }
        g_i_s.pt.appendChild(gplayrst);
      }*/
  };
  for (var id in data) {
    var cdata = data[id];
    if (!cdata.hidden) {
      console.dir(cdata.creator);
      var gplace = document.createElement("tr");
      gplace.id = cdata.creator;
      //var gp = document.getElementById("gplace-"+cdata.creator);
      gplace.addEventListener("click", gpc, true);
      console.log(gplace.id);
      gplace.innerHTML =
        "<td>" +
        cdata.type +
        "</td><td>"+cdata.name+"</td><td><a class = 'profilelink' style = 'color:" +
        cdata.creatorcol +
        "' href = '/user/" +
        cdata.creator +
        "'>" +
        cdata.creator +
        "</a></td><td>" +
        "<a class = 'profilelink' style = 'color:" +
        cdata.rcreatorcol +
        "' href = '/user/" +
        cdata.quizmaster +
        "'>" +
        cdata.quizmaster +
        "</a>" +
        "</td><td>" +
        cdata.ratingavg +
        "</td><td>" +
        cdata.playerNum +
        "</td>";
      g_list.appendChild(gplace);
    }
  }
  if (gselected) {
    g_i_s.pt.innerHTML = "";
    g_i_s.t.textContent = data[key].type;
    g_i_s.u.innerHTML =
      "<a class = 'profilelink' style = 'color:" +
      data[key].creatorcol +
      "' href = '/user/" +
      data[key].creator +
      "'>" +
      data[key].creator +
      "</a>";
    g_i_s.qm.innerHTML =
      "<a class = 'profilelink' style = 'color:" +
      data[key].creatorcol +
      "' href = '/user/" +
      data[key].quizmaster +
      "'>" +
      data[key].quizmaster +
      "</a>";
    g_i_s.a.textContent = data[key].ratingavg;
    g_i_s.p.textContent = data[key].playerNum;
    var players1 = [];
    var players2 = [];
    for (var i in data[key].team1.players) {
      players1.push(data[key].team1.players[i]);
    }
    for (var i in data[key].team2.players) {
      players2.push(data[key].team2.players[i]);
    }
    for (var i = 0; i < players1.length; i++) {
      var p = players1[i];
      var p2 = players2[i];
      var gplayrst = document.createElement("tr");
      console.log(p, p2);
      if (p2 !== undefined) {
        gplayrst.innerHTML =
          "<td><a class = 'profilelink' style = 'color:" +
          p.pcol +
          "' href = '/user/" +
          p.user +
          "'>" +
          p.user +
          "</a></td><td>" +
          p.ratingdt.rating +
          "</td><td>" +
          p.score +
          "</td><td></td><td><a class = 'profilelink' style = 'color:" +
          p2.pcol +
          "' href = '/user/" +
          p2.user +
          "'>" +
          p2.user +
          "</a></td><td>" +
          p2.ratingdt.rating +
          "</td><td>" +
          p2.score +
          "</td>";
      } else {
        gplayrst.innerHTML =
          "<td><a class = 'profilelink' style = 'color:" +
          p.pcol +
          "' href = '/user/" +
          p.user +
          "'>" +
          p.user +
          "</a></td><td>" +
          p.ratingdt.rating +
          "</td><td>" +
          p.score +
          "</td><td></td><td></td><td></td><td></td>";
      }
      g_i_s.pt.appendChild(gplayrst);
    }
  }
});
st.on("player joined", drawteams);
st.on("update", drawteams);
st.on("match end", function() {
  location.reload();
});
st.on("match state change", function() {
  gselected = false;
  clearmatchstats();
});
st.on("someone jumped",function(data){
  
})
game_create_btn.addEventListener("click", function(e) {
  console.log(e)
  gcp1.style.display = "none";
  gcp2.style.display = "block";
});
createbtn2.addEventListener("click",function(e){
  st.emit("create match", { type:selecttype.value,name:namein.value });
})
game_join_btn.addEventListener("click", function(e) {
  if (gselected) {
    st.emit("join match", key);
  }
});
startbtn.addEventListener("click", function(e) {
  console.log("start match",
    gamedata,
    JSON.parse(localsave("userdata", "get")).name)
  st.emit(
    "start match",
    gamedata,
    JSON.parse(localsave("userdata", "get")).name
  );
  startGame()
  ingame = true;
});
jumpbtn.addEventListener("click", function(e) {
  st.emit("jumped",new Date())
    jumpbtn.disabled = true;
  });
})