window.addEventListener("load", event => {
window.activeinput = true;
var dreams = [];
var dict = {};
var dreamsList = document.getElementById("results");
var resnum = document.getElementById("results-num");
var dsearch = document.getElementById("search");
var select = document.getElementById("pickletter");
var select2 = document.getElementById("conser");
var gt = document.getElementById("gt"),lt = document.getElementById("lt");
var btn2 = document.getElementById("pwserbtn"),
  btn1 = document.getElementById("concbtn"),
  btn3 = document.getElementById("grammerbtn");
var conc = false;
function validate(token) {
  if (/\w{2,}/.test(token) && /^((?![0-9]).)*$/.test(token)) {
    return true;
  } else {
    return false;
  }
}
function toarray(a) {
  let ar = [];
  for (i in a) {
    ar.push(a[i]);
  }
  return ar;
}
var gettextListener = function gettextListener() {
  var str = this.responseText;

  str = str.replace(/\[[a-z]\]/g, "");
  str = str.replace(/\n/g, "");
  str = str.replace(/([0-9]+)/g, " $1 ");
  str = str.split(/(?<![0-9])1(?![0-9])/g);
  str.shift();
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].split(/[0-9]+\s/);
    for (var j = 0; j < str[i].length; j++) {
      str[i][j] = str[i][j]
        .replace(/[^a-zA-z\0’-]|’(?!s)/g, " ")
        .trim()
        .replace(/\s\s\s/g, " ")
        .replace(/\s\s/g, " ")
        .replace(/\s\s/g, " "); //cleans
    }
  }
  var vget = 0;
  for (var j = 0; j < str.length; j++) {
    for (var k = 0; k < str[j].length; k++) {
      //vget+=str[j].length;
      let st = str[j][k];
      str[j][k] = str[j][k].split(" ");
      for (var w = 0; w < str[j][k].length; w++) {
        let bk = "";
        let ch = 0;
        for (
          var l = 0;
          l < chlist[localStorage.playerseason].books.length;
          l++
        ) {
          if (j + 1 < chlist[localStorage.playerseason].calcsub(l)) {
            bk = chlist[localStorage.playerseason].books[l].abr;
            ch = j + 1 - chlist[localStorage.playerseason].calcsub(l - 1);
            break;
          } else if (l + 1 === chlist[localStorage.playerseason].books.length) {
            bk = bk = chlist[localStorage.playerseason].books[l].abr;
            ch = j + 1 - chlist[localStorage.playerseason].calcsub(l - 1);
          }
        }
        if (
          !dict[str[j][k][w].toLowerCase()] &&
          validate(str[j][k][w].toLowerCase())
        ) {
          let p = new RegExp(
            "(?<![a-z])(" + str[j][k][w].toLowerCase() + ")(?![a-z])",
            "gi"
          );
          dict[str[j][k][w].toLowerCase()] = {};
          dict[str[j][k][w].toLowerCase()].c = 1;
          dict[str[j][k][w].toLowerCase()].m = [];
          dict[str[j][k][w].toLowerCase()].m.push(
            st.replace(p, "<b style = 'color:red;'>$1</b>")
          );
          dict[str[j][k][w].toLowerCase()].rs = [];
          dict[str[j][k][w].toLowerCase()].rs.push(
            bk + ch + ":" + (k + 1 - vget)
          );
          dict[str[j][k][w].toLowerCase()].w = str[j][k][w].toLowerCase();
        } else if (validate(str[j][k][w].toLowerCase())) {
          let p = new RegExp(
            "(?<![a-z])(" + str[j][k][w].toLowerCase() + ")(?![a-z])",
            "gi"
          );
          dict[str[j][k][w].toLowerCase()].c++;
          if(dict[str[j][k][w].toLowerCase()].m.length - 1>=0){
            if (
            dict[str[j][k][w].toLowerCase()].m[
              dict[str[j][k][w].toLowerCase()].m.length - 1
            ]
          ) {
            if (
              dict[str[j][k][w].toLowerCase()].m[
                dict[str[j][k][w].toLowerCase()].m.length - 1
              ] !== st.replace(p, "<b style = 'color:red;'>$1</b>")
            ) {
              dict[str[j][k][w].toLowerCase()].m.push(
                st.replace(p, "<b style = 'color:red;'>$1</b>")
              );
              dict[str[j][k][w].toLowerCase()].rs.push(
                bk + ch + ":" + (k + 1 - vget)
              );
            }
          } 
          }
          else{
            dict[str[j][k][w].toLowerCase()].m.push(
                st.replace(p, "<b style = 'color:red;'>$1</b>")
              );
              dict[str[j][k][w].toLowerCase()].rs.push(
                bk + ch + ":" + (k + 1 - vget)
              );
          }
        }
      }
    }
  }
  console.log(str);
  console.log(dict);
  dict = toarray(dict);
  dict = dict.sort(function(a, b) {
    var x = a.w.toLowerCase();
    var y = b.w.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
  dreamsList.innerHTML = "";
  dreams = this.responseText.split(" 1 ");
  dreams.shift();
  for (var i = 0; i < dreams.length; i++) {
    dreams[i] = dreams[i].split(/[0-9]+/);
  }
};
var alphabet = "abcdefghijklmnopqrstuvwxyz";

var checkarray = function checkarray(a, f) {
  //console.log(a)
  var a2 = [];
  let v;
  for (var i = 0; i < a.length; i++) {
    v = a[i]
      .replace(/[-\/\\^$*+?.()|[\]{}"';:,!“—”]|[0-9]|\n/g, " ")
      .trim()
      .replace(/\s\s\s/g, " ")
      .replace(/\s\s/g, " ")
      .replace(/\s\s/g, " ");
    if (v.toLowerCase().indexOf(f.toLowerCase()) !== -1) {
      a2.push(a[i]);
    } else {
      a2.push("");
    }
  }
  return a2;
};

dsearch.addEventListener("keyup", function(event) {
  search(event.target.value);
});
gt.addEventListener("change", function(e) {
  dict = toarray(dict);
  dict = dict.sort(function(a, b) {
    var x = a.w.toLowerCase();
    var y = b.w.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
  let cres = dict.filter(word => {
   return word.c >= gt.value&&word.c <= lt.value
  });
  resnum.innerText = cres.length + " results";
  dreamsList.innerHTML = "";
  for (var i = 0; i < cres.length; i++) {
    let newel = document.createElement("div");
    newel.setAttribute("class", "res");
    newel.innerHTML =
      "<div class = 'res-title'>" +
      cres[i].w +
      "</div><div class = 'res-mentions'>mentions: " +
      cres[i].c +
      "</div><div class = 'res-verses' id = '" +
      cres[i].w +
      "'></div>";
    dreamsList.appendChild(newel);
    for (var l = 0; l < cres[i].m.length; l++) {
      let newel2 = document.createElement("div");
      newel2.setAttribute("class", "res-m");
      newel2.innerHTML =
        "<span class = 'res-ref' >" +
        chlist[localStorage.playerseason].abrtofull(cres[i].rs[l]) +
        "</span> " +
        cres[i].m[l] +
        "";
      document.getElementById(cres[i].w).appendChild(newel2);
    }
  }
})
lt.addEventListener("change", function(e) {
  dict = toarray(dict);
  dict = dict.sort(function(a, b) {
    var x = a.w.toLowerCase();
    var y = b.w.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
  let cres = dict.filter(word => {
   return word.c >= gt.value&&word.c <= lt.value
  });
  resnum.innerText = cres.length + " results";
  dreamsList.innerHTML = "";
  for (var i = 0; i < cres.length; i++) {
    let newel = document.createElement("div");
    newel.setAttribute("class", "res");
    newel.innerHTML =
      "<div class = 'res-title'>" +
      cres[i].w +
      "</div><div class = 'res-mentions'>mentions: " +
      cres[i].c +
      "</div><div class = 'res-verses' id = '" +
      cres[i].w +
      "'></div>";
    dreamsList.appendChild(newel);
    for (var l = 0; l < cres[i].m.length; l++) {
      let newel2 = document.createElement("div");
      newel2.setAttribute("class", "res-m");
      newel2.innerHTML =
        "<span class = 'res-ref' >" +
        chlist[localStorage.playerseason].abrtofull(cres[i].rs[l]) +
        "</span> " +
        cres[i].m[l] +
        "";
      document.getElementById(cres[i].w).appendChild(newel2);
    }
  }
})
var search = function search(s) {
  if (!conc) {
    var a = [];
    var al = 0;

    for (var d = 0; d < dreams.length; d++) {
      a.push(checkarray(dreams[d], s));
    }
    let p = new RegExp("(?<![a-z])(" + s + ")", "gi");
    dreamsList.innerHTML = "";
    for (var i = 0; i < a.length; i++) {
      if (a[i].length > 0) {
        for (var j = 0; j < a[i].length; j++) {
          if (a[i][j] !== "") {
            al++;
            let bk = "";
            let ch = 0;
            /*for (
              var l = 0;
              l < chlist[localStorage.playerseason].books.length;
              l++
            ) {
              console.log((i + 1)<chlist[localStorage.playerseason].calcsub(l),(i + 1),chlist[localStorage.playerseason].calcsub(l),l,l + 1 ===
                chlist[localStorage.playerseason].books.length)
              console.log((i + 1),chlist[localStorage.playerseason].calcsub(l),(i + 1),chlist[localStorage.playerseason].calcsub(l),l,l + 1 ,
                chlist[localStorage.playerseason].books.length)
              if (i + 1 < chlist[localStorage.playerseason].calcsub(l)) {
                bk = chlist[localStorage.playerseason].books[l].bk;
                ch = i + 1 - chlist[localStorage.playerseason].calcsub(l - 1);
                break;
              } else if (
                l + 1 ===
                chlist[localStorage.playerseason].books.length
              ) {
                bk = bk = chlist[localStorage.playerseason].books[l].bk;
                ch = i + 1 - chlist[localStorage.playerseason].calcsub(l - 1);
              }
            }*/
            //console.log((i + 1)-chlist[localStorage.playerseason].calcsub(l-1),chlist[localStorage.playerseason].calcsub(l-1))
            //console.log(bk)
            a[i][j] =
              "<div class = 'verse' id = '" +chlist[localStorage.playerseason].chs[i].full+
              ":" +
              (j + 1) +
              "'><b>" +
              chlist[localStorage.playerseason].chs[i].full+
              ":" +
              (j + 1) +
              "</b> " +
              a[i][j].replace(p, "<b style = 'color:red;'>$1</b>");
          }
          console.log(a[i][j])
          var k = document.createElement("div");
          k.innerHTML = a[i][j];
          dreamsList.appendChild(k);
        }
      }
    }

    resnum.innerText = al + " results";
  } else {
    dict = toarray(dict);
    dict = dict.sort(function(a, b) {
      var x = a.w.toLowerCase();
      var y = b.w.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
    let cres = dict.filter(word => word.w.substr(0, s.length) === s);
    resnum.innerText = cres.length + " results";
    dreamsList.innerHTML = "";
    for (var i = 0; i < cres.length; i++) {
      let newel = document.createElement("div");
      newel.setAttribute("class", "res");
      newel.innerHTML =
        "<div class = 'res-title'>" +
        cres[i].w +
        "</div><div class = 'res-mentions'>mentions: " +
        cres[i].c +
        "</div><div class = 'res-verses' id = '" +
        cres[i].w +
        "'></div>";
      dreamsList.appendChild(newel);
      for (var l = 0; l < cres[i].m.length; l++) {
        let newel2 = document.createElement("div");
        newel2.setAttribute("class", "res-m");
        newel2.innerHTML =
          "<span class = 'res-ref' >" +
          chlist[localStorage.playerseason].abrtofull(cres[i].rs[l]) +
          "</span> " +
          cres[i].m[l] +
          "";
        document.getElementById(cres[i].w).appendChild(newel2);
      }
    }
  }
}; // request the dreams from our app's sqlite database

for (var i = 0; i < alphabet.length; i++) {
  let abet = alphabet[i];
  let e = document.createElement("option");
  e.setAttribute("value", abet);
  e.innerText = abet.toUpperCase();
  select.appendChild(e);
}
select.addEventListener("change", function(e) {
  let lett = e.target.value;
  dict = toarray(dict);
  dict = dict.sort(function(a, b) {
    var x = a.w.toLowerCase();
    var y = b.w.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
  let cres = dict.filter(word => word.w.charAt(0) === lett);
  resnum.innerText = cres.length + " results";
  dreamsList.innerHTML = "";
  for (var i = 0; i < cres.length; i++) {
    let newel = document.createElement("div");
    newel.setAttribute("class", "res");
    newel.innerHTML =
      "<div class = 'res-title'>" +
      cres[i].w +
      "</div><div class = 'res-mentions'>mentions: " +
      cres[i].c +
      "</div><div class = 'res-verses' id = '" +
      cres[i].w +
      "'></div>";
    dreamsList.appendChild(newel);
    for (var l = 0; l < cres[i].m.length; l++) {
      let newel2 = document.createElement("div");
      newel2.setAttribute("class", "res-m");
      newel2.innerHTML =
        "<span class = 'res-ref' >" +
        chlist[localStorage.playerseason].abrtofull(cres[i].rs[l]) +
        "</span> " +
        cres[i].m[l] +
        "";
      document.getElementById(cres[i].w).appendChild(newel2);
    }
  }
});
btn2.addEventListener("click", function(e) {
  dreamsList.innerHTML = "";
  resnum.innerHTML = "";
  select2.style.display = "none";
  conc = false;
  btn1.classList.remove("kcss-btn-green");
  btn1.classList.add("kcss-btn-red");
  btn2.classList.remove("kcss-btn-red");
  btn2.classList.add("kcss-btn-green");
  btn3.classList.remove("kcss-btn-green");
  btn3.classList.add("kcss-btn-red");
  search("")
});
btn1.addEventListener("click", function(e) {
  dreamsList.innerHTML = "";
  resnum.innerHTML = "";
  select2.style.display = "block";
  conc = true;
  btn2.classList.remove("kcss-btn-green");
  btn2.classList.add("kcss-btn-red");
  btn1.classList.remove("kcss-btn-red");
  btn1.classList.add("kcss-btn-green");
  btn3.classList.remove("kcss-btn-green");
  btn3.classList.add("kcss-btn-red");
  if (dsearch.value === "") {
    let lett = "a";
    dict = toarray(dict);
    dict = dict.sort(function(a, b) {
      var x = a.w.toLowerCase();
      var y = b.w.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
    let cres = dict.filter(word => word.w.charAt(0) === lett);
    resnum.innerText = cres.length + " results";
    dreamsList.innerHTML = "";
    for (var i = 0; i < cres.length; i++) {
      let newel = document.createElement("div");
      newel.setAttribute("class", "res");
      newel.innerHTML =
        "<div class = 'res-title'>" +
        cres[i].w +
        "</div><div class = 'res-mentions'>mentions: " +
        cres[i].c +
        "</div><div class = 'res-verses' id = '" +
        cres[i].w +
        "'></div>";
      dreamsList.appendChild(newel);
      for (var l = 0; l < cres[i].m.length; l++) {
        let newel2 = document.createElement("div");
        newel2.setAttribute("class", "res-m");
        newel2.innerHTML =
          "<span class = 'res-ref' >" +
          chlist[localStorage.playerseason].abrtofull(cres[i].rs[l]) +
          "</span> " +
          cres[i].m[l] +
          "";
        document.getElementById(cres[i].w).appendChild(newel2);
      }
    }
  }
  else {
    dict = toarray(dict);
    dict = dict.sort(function(a, b) {
      var x = a.w.toLowerCase();
      var y = b.w.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
    let cres = dict.filter(
      word => word.w.substr(0, dsearch.value.length) === dsearch.value
    );
    resnum.innerText = cres.length + " results";
    dreamsList.innerHTML = "";
    for (var i = 0; i < cres.length; i++) {
      let newel = document.createElement("div");
      newel.setAttribute("class", "res");
      newel.innerHTML =
        "<div class = 'res-title'>" +
        cres[i].w +
        "</div><div class = 'res-mentions'>mentions: " +
        cres[i].c +
        "</div><div class = 'res-verses' id = '" +
        cres[i].w +
        "'></div>";
      dreamsList.appendChild(newel);
      for (var l = 0; l < cres[i].m.length; l++) {
        let newel2 = document.createElement("div");
        newel2.setAttribute("class", "res-m");
        newel2.innerHTML =
          "<span class = 'res-ref' >" +
          chlist[localStorage.playerseason].abrtofull(cres[i].rs[l]) +
          "</span> " +
          cres[i].m[l] +
          "";
        document.getElementById(cres[i].w).appendChild(newel2);
      }
    }
  }
});
// request the dreams from our app's sqlite database
var hebrewsRequest = new XMLHttpRequest();
hebrewsRequest.onload = gettextListener;
hebrewsRequest.open("get", "/gettext/" + localStorage.playerseason);
hebrewsRequest.send();
})