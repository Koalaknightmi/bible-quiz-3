window.addEventListener("load", event => {
var chset = document.getElementById("ch-select");
var lboards = document.getElementById("l-table-b");
var typeselect = document.getElementById("type");
//var search = document.getElementById("search")

for (var i = 0; i < chlist[localStorage.playerseason].chs.length; i++) {
    let e = document.createElement("option");
    e.setAttribute("value", chlist[localStorage.playerseason].chs[i].abr);
    e.innerText = chlist[localStorage.playerseason].chs[i].full;
    chset.appendChild(e);
  }
var type = "q";
var q = [],
  qp = [],
  c = [],
  cp = [],
  qv = [],
  qpv = [],
  cv = [],
  cpv = [];
var ch = chlist[localStorage.playerseason].chs[0].abr;
var cha = [];
String.prototype.pad = function(l, s) {
  return (l -= this.length) > 0
    ? (s = new Array(Math.ceil(l / s.length) + 1).join(s)).substr(0, s.length) +
        this +
        s.substr(0, l - s.length)
    : this;
};
var timeSince = function(date) {
  if (typeof date !== "object") {
    date = new Date(date);
  }
  var seconds = Math.floor((new Date() - date) / 1000);
  var intervalType;
  var interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = "year";
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = "month";
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = "day";
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = "hour";
        } else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = "minute";
          } else {
            interval = seconds;
            intervalType = "second";
          }
        }
      }
    }
  }
  if (interval > 1 || interval === 0) {
    intervalType += "s";
  }
  return interval + " " + intervalType + " ago";
};
function totime(time) {
  return Math.floor(time / 60) + ":" + (time % 60).toFixed().pad(2, "0");
}
function fromtime(time) {
  time = time.split(":");
  time[0] = Number(time[0]) * 60;
  return time[0] + Number(time[1]);
}
var filllb = function filllb(a, ch) {
  console.log(a, ch);
  cha = [];
  lboards.innerHTML = "";
  for (var i = 0; i < a.length; i++) {
    if (a[i].ch === ch) {
      cha.push(a[i]);
      console.log(a[i]);
    }
  }
  console.log(cha);
  for (var id = 0; id < cha.length; id++) {
    var lplace = document.createElement("tr");
    lplace.id = "place";
    lplace.className = "l-tr";
    console.log(cha[id].profileIMG);
    if (cha[id].titled) {
      lplace.innerHTML =
        "<td>" +
        (id + 1) +
        "</td><td><img width = '25' height = '25' src = '" +
        cha[id].profileIMG +
        "' alt = '" +
        cha[id].userName +
        "'s' profile image'/></td><td><a class = 'profilelink' style = 'color:" +
        cha[id].nameCOl +
        "' href = '/user/" +
        cha[id].userName +
        "'><b style = 'color:red'>"+cha[id].tabr+"</b>" +
        cha[id].userName +
        "</a></td><td>" +
        cha[id].score +
        "</td><td>" +
        timeSince(cha[id].createdAt) +
        "</td>";
    } else {
      lplace.innerHTML =
        "<td>" +
        (id + 1) +
        "</td><td><img width = '25' height = '25' src = '" +
        cha[id].profileIMG +
        "' alt = '" +
        cha[id].userName +
        "'s' profile image'/></td><td><a class = 'profilelink' style = 'color:" +
        cha[id].nameCOl +
        "' href = '/user/" +
        cha[id].userName +
        "'>" +
        cha[id].userName +
        "</a></td><td>" +
        cha[id].score +
        "</td><td>" +
        timeSince(cha[id].createdAt) +
        "</td>";
    }
    lboards.appendChild(lplace);
  }
};
var checkarray = function checkarray(a, f) {
  return a.filter(function(word) {
    if (word.userName.toLowerCase().indexOf(f.toLowerCase()) !== -1) {
      return true;
    } else {
      return false;
    }
  });
};
var search = function search(f) {
  if (type === "q") {
    filllb(checkarray(q, f), ch);
  } else if (type === "qp") {
    filllb(checkarray(qp, f), ch);
  } else if (type === "c") {
    filllb(checkarray(c, f), ch);
  } else if (type === "cp") {
    filllb(checkarray(cp, f), ch);
  }
  if (type === "qv") {
    filllb(checkarray(qv, f), ch);
  } else if (type === "qpv") {
    filllb(checkarray(qpv, f), ch);
  } else if (type === "cv") {
    filllb(checkarray(cv, f), ch);
  } else if (type === "cpv") {
    filllb(checkarray(cpv, f), ch);
  }
};

fetch("/leaderboardfetch")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    //console.table(data);
    for (var i = 0; i < data.length; i++) {
      if (data[i].type === "completed-true") {
        cp.push(data[i]);
      } else if (data[i].type === "completed-false") {
        c.push(data[i]);
      } else if (data[i].type === "quoted-false") {
        data[i].score = totime(data[i].score);
        q.push(data[i]);
      } else if (data[i].type === "quoted-true") {
        data[i].score = totime(data[i].score);
        qp.push(data[i]);
      } else if (data[i].type === "completed-true-v") {
        cpv.push(data[i]);
      } else if (data[i].type === "completed-false-v") {
        cv.push(data[i]);
      } else if (data[i].type === "quoted-false-v") {
        data[i].score = totime(data[i].score);
        qv.push(data[i]);
      } else if (data[i].type === "quoted-true-v") {
        data[i].score = totime(data[i].score);
        qpv.push(data[i]);
      }
    }

    q.sort(function(a, b) {
      return fromtime(a.score) - fromtime(b.score);
    });
    qp.sort(function(a, b) {
      return fromtime(a.score) - fromtime(b.score);
    });
    c.sort(function(a, b) {
      return b.score - a.score;
    });
    cp.sort(function(a, b) {
      return b.score - a.score;
    });
    qv.sort(function(a, b) {
      return fromtime(a.score) - fromtime(b.score);
    });
    qpv.sort(function(a, b) {
      return fromtime(a.score) - fromtime(b.score);
    });
    cv.sort(function(a, b) {
      return b.score - a.score;
    });
    cpv.sort(function(a, b) {
      return b.score - a.score;
    });
    if (type === "q") {
      filllb(q, ch);
    } else if (type === "qp") {
      filllb(qp, ch);
    } else if (type === "c") {
      filllb(c, ch);
    } else if (type === "cp") {
      filllb(cp, ch);
    }
    if (type === "qv") {
      filllb(qv, ch);
    } else if (type === "qpv") {
      filllb(qpv, ch);
    } else if (type === "cv") {
      filllb(cv, ch);
    } else if (type === "cpv") {
      filllb(cpv, ch);
    }
  })
  .catch(function(e) {
    console.log(e);
  });

typeselect.addEventListener("input", function(e) {
  type = e.target.value;
  if (type === "q") {
    filllb(q, ch);
  } else if (type === "qp") {
    filllb(qp, ch);
  } else if (type === "c") {
    filllb(c, ch);
  } else if (type === "cp") {
    filllb(cp, ch);
  }
  if (type === "qv") {
    filllb(qv, ch);
  } else if (type === "qpv") {
    filllb(qpv, ch);
  } else if (type === "cv") {
    filllb(cv, ch);
  } else if (type === "cpv") {
    filllb(cpv, ch);
  }
});
chset.addEventListener("input", function(e) {
  //console.log(e.target.value)
  //console.log("changed")
  /**/
  ch = e.target.value;
  if (type === "q") {
    filllb(q, ch);
  } else if (type === "qp") {
    filllb(qp, ch);
  } else if (type === "c") {
    filllb(c, ch);
  } else if (type === "cp") {
    filllb(cp, ch);
  }
  if (type === "qv") {
    filllb(q, ch);
  } else if (type === "qpv") {
    filllb(qp, ch);
  } else if (type === "cv") {
    filllb(c, ch);
  } else if (type === "cpv") {
    filllb(cp, ch);
  }
});
})