window.addEventListener("load", event => {
  var responsiveVoice = window.responsiveVoice;
  var log = window.log;
  var dreams = [];
  window.activeinput = true;
  // define variables that reference elements on our page
  var dreamsList = document.getElementById("dreams");
  var hi_mm_d = document.querySelector("#m-verse-h");
  var hi_sm_d = document.querySelector("#s-verse-h");
  var hi_u_d = document.querySelector("#u-word");
  var hi_d_d = document.querySelector("#d-word");
  var hi_mm_c = document.querySelector("#m-m-c");
  var hi_sm_c = document.querySelector("#s-m-c");
  var hi_u_c = document.querySelector("#u-w-c");
  var hi_d_c = document.querySelector("#d-w-c");
  var mylocalkey = "koalastrikermi-bbqo-";
  var ScriptureAudioBtn = document.querySelector("#s-audio-btn");
  var ch_set = document.querySelector("#ch-select");
  for (var i = 0; i < chlist[season].chs.length; i++) {
    let e = document.createElement("option");
    e.setAttribute("value", chlist[season].chs[i].abr);
    e.innerText = chlist[season].chs[i].full;
    ch_set.appendChild(e);
  }
  var lss = function lss(vare, gs, t, l) {
    if (gs === "set") {
      localStorage.setItem(mylocalkey + vare, t);
      //log("localstorage item " + mylocalkey + vare + " is now set to: " + localStorage.getItem(mylocalkey + vare));
    } else if (gs === "get") {
      //log("localstorage item " + mylocalkey + vare + " was returned as: " + localStorage.getItem(mylocalkey + vare));
      return localStorage.getItem(mylocalkey + vare);
    } else if (gs === "dv") {
      //log(mylocalkey + vare + "  was deleted");
      localStorage.removeItem(mylocalkey + vare);
    }
  };
  log(
    "highlight memory verses?" + lss("hi_mm_d", "get"),
    "color:red",
    "normal"
  );
  var hi_u = lss("hi_u_d", "get");
  var hi_d = lss("hi_d_d", "get");
  var hi_sm = lss("hi_sm_d", "get");
  var hi_mm = lss("hi_mm_d", "get");
  var c_u = lss("c_u_d", "get");
  var c_d = lss("c_d_d", "get");
  var c_sm = lss("c_sm_d", "get");
  var c_mm = lss("c_mm_d", "get");
  log(c_mm+" 50");
  if(c_sm === null){
    c_sm = "#00FF00"
    lss("c_sm_d", "set",c_sm)
  }
  if(c_mm === null){
    c_mm = "#0000ff"
    lss("c_mm_d", "set",c_mm)
  }
  if(c_u === null){
    c_u = "#FF0000"
    lss("c_u_d", "set",c_u)
  }
  if(c_d === null){
    c_d = "#ffa500"
    lss("c_d_d", "set",c_d)
  }
  if(hi_sm === null){
    hi_sm = true
    lss("hi_sm_d", "set",hi_sm)
  }
  if(hi_mm === null){
    hi_mm = true
    lss("hi_mm_d", "set",hi_mm)
  }
  if(hi_u === null){
    hi_u = true
    lss("hi_u_d", "set",hi_u)
  }
  if(hi_d === null){
    hi_d = true
    lss("hi_d_d", "set",hi_d)
  }
  hi_mm_c.value = c_mm;
  hi_sm_c.value = c_sm;
  hi_u_c.value = c_u;
  hi_d_c.value = c_d;
  hi_mm_d.checked = JSON.parse(hi_mm) ? true : false;
  hi_sm_d.checked = JSON.parse(hi_sm) ? true : false;
  hi_u_d.checked = JSON.parse(hi_u) ? true : false;
  hi_d_d.checked = JSON.parse(hi_d) ? true : false;
  
  const hexToRgb = hex => {
    // turn hex val to RGB
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  };

  // calc to work out if it will match on black or white better
  const setContrast = rgb =>
    (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 > 125 ? "black" : "white";

  function redraw (){
    console.log(ch_set.value);
    ch = ch_set.value;
    dreamsList.innerHTML = "";
    console.log(ch_set.options.selectedIndex + 1);
    var dream = dreams[ch_set.options.selectedIndex + 1].split(/[0-9]+/);

    for (var j = 0; j < dream.length; j++) {
      for (var i = 0; i < chlist[season].books.length; i++) {
        if (
          ch_set.selectedOptions[0].label.split(" ")[0] ===
          chlist[season].books[i].bk
        ) {
          append(
            ch_set.selectedOptions[0].label.split(" ")[0] +
              " " +
              ch_set.selectedOptions[0].label.split(" ")[1] +
              ":" +
              (j + 1) +
              " " +
              dream[j],
            chlist[season].books[i].abr +
              ch_set.selectedOptions[0].label.split(" ")[1] +
              ":" +
              (j + 1)
          );
        }
      }
    }
    var un1 = document.querySelectorAll(".memory-verse-m");
    for (var i = 0; i < un1.length; i++) {
      un1[i].style.background = c_mm;
      un1[i].style.color = setContrast(hexToRgb(c_mm));
    }
    var un2 = document.querySelectorAll(".memory-verse-s");
    for (var i = 0; i < un2.length; i++) {
      un2[i].style.background = c_sm;
      un2[i].style.color = setContrast(hexToRgb(c_sm));
    }
    var un3 = document.querySelectorAll(".uniqueword");
    for (var i = 0; i < un3.length; i++) {
      un3[i].style.color = c_u;
    }
    var un4 = document.querySelectorAll(".dblword");
    for (var i = 0; i < un4.length; i++) {
      un4[i].style.color = c_d;
    }
  }
  var ch = "";
  var c = 1;
  ch_set.addEventListener("change", function(e) {
    redraw ()
  });

  hi_mm_d.addEventListener("input", function(event) {
    lss("hi_mm_d", "set", hi_mm_d.checked);
    if (hi_mm_d.checked) {
      hi_mm = true;
    } else {
      hi_mm = false;
    }
    redraw ()
  });
  hi_sm_d.addEventListener("input", function(event) {
    lss("hi_sm_d", "set", hi_sm_d.checked);
    if (hi_sm_d.checked) {
      hi_sm = true;
    } else {
      hi_sm = false;
    }
    redraw ()
  });
  hi_u_d.addEventListener("input", function(event) {
    lss("hi_u_d", "set", event.target.checked.toString());
    console.log(event.target.checked.toString());
    if (event.target.checked) {
      hi_u = true;
    } else {
      hi_u = false;
    }
    redraw ()
  });
  hi_d_d.addEventListener("input", function(event) {
    lss("hi_d_d", "set", event.target.checked.toString());
    console.log(event.target.checked.toString());
    if (event.target.checked) {
      hi_d = true;
    } else {
      hi_d = false;
    }
   redraw ()
  });
  hi_mm_c.addEventListener("change", function(event) {
    var un1 = document.querySelectorAll(".memory-verse-m");
    for (var i = 0; i < un1.length; i++) {
      un1[i].style.background = event.target.value;
      un1[i].style.color = setContrast(hexToRgb(event.target.value));
    }
    lss("c_mm_d", "set", hi_mm_c.value);
  });
  hi_sm_c.addEventListener("change", function(event) {
    var un2 = document.querySelectorAll(".memory-verse-s");
    for (var i = 0; i < un2.length; i++) {
      un2[i].style.background = event.target.value;
      un2[i].style.color = setContrast(hexToRgb(event.target.value));
    }
    lss("c_sm_d", "set", hi_sm_c.value);
  });
  hi_u_c.addEventListener("change", function(event) {
    var un3 = document.querySelectorAll(".uniqueword");
    for (var i = 0; i < un3.length; i++) {
      un3[i].style.color = event.target.value;
    }
    lss("c_u_d", "set", hi_u_c.value);
  });
  hi_d_c.addEventListener("change", function(event) {
    var un4 = document.querySelectorAll(".dblword");
    for (var i = 0; i < un4.length; i++) {
      un4[i].style.color = event.target.value;
    }
    lss("c_d_d", "set", hi_d_c.value);
  });
  var playing = false;
  let v = 0;
  var speak = function() {
    let ver = document.querySelectorAll(".verse");
    let speak2 = function() {
      if (v === tospeak.length - 1) {
        v = -1;
      }
      v++;
      responsiveVoice.speak(tospeak[v], "US English Male", {
        pitch: 1,
        volume: 0.5,
        rate: 1,
        onend: speak2
      });
    };
    console.log(ver);
    let tospeak = [];
    for (var i = 0; i < ver.length; i++) {
      tospeak.push(
        ver[i].innerText.replace(/([0-9]+):([0-9]+)/g, "$1 verse $2,")
      );
    }
    if (!playing) {
      playing = true;
      console.log(tospeak);
      responsiveVoice.speak(tospeak[v], "US English Male", {
        pitch: 1,
        volume: 0.5,
        rate: 1,
        onend: speak2
      });
    } else {
      playing = false;
      responsiveVoice.cancel();
    }
  };
  ScriptureAudioBtn.addEventListener("click", function(e) {
    speak();
  });
  // a helper function to call when our request for dreams is done
  var gettextListener = function gettextListener() {
    dreamsList.innerHTML = "";
    dreams = this.responseText.split(" 1 ");
    var dream = dreams[c].split(/[0-9]+/);
    for (var j = 0; j < dream.length; j++) {
      for (var i = 0; i < chlist[season].books.length; i++) {
        if (
          ch_set.selectedOptions[0].label.split(" ")[0] ===
          chlist[season].books[i].bk
        ) {
          append(
            ch_set.selectedOptions[0].label.split(" ")[0] +
              ch_set.selectedOptions[0].label.split(" ")[1] +
              ":" +
              (j + 1) +
              " " +
              dream[j],
            chlist[season].books[i].abr +
              ch_set.selectedOptions[0].label.split(" ")[1] +
              ":" +
              (j + 1)
          );
        }
      }
    }
  };

  // request the dreams from our app's sqlite database
  var hebrewsRequest = new XMLHttpRequest();
  hebrewsRequest.onload = gettextListener;
  hebrewsRequest.open("get", "/gettext/" + localStorage.playerseason);
  hebrewsRequest.send();

  fetch(
    "https://firebasestorage.googleapis.com/v0/b/bible-quiz-e1ef4.appspot.com/o/" +
      localStorage.playerseason +
      ".txt"
  )
    .then(function(response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
        fetch(
          "https://firebasestorage.googleapis.com/v0/b/bible-quiz-e1ef4.appspot.com/o/" +
            localStorage.playerseason +
            ".txt?alt=media&token=" +
            data.downloadTokens
        ).then(function(txt1) {
          txt1.json().then(function(txt) {
            console.log(txt);
          });
        });
      });
    })
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    }); /**/

  var extractwords = function extractwords(string) {
    return string.match(/\w+/g);
  };
  RegExp.escape = function(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  };
  var sms = [],
    mmqs = [],
    mmrs = [],
    mmvs = [];
  // a helper function that creates a list item for a given dream
  var append = function append(dream, id) {
    var newListItem = document.createElement("div");
    /*for (var i = 0; i < smemlist.length; i++) {
    if (id === smemlist[i]) {
      console.log(r)
      let d = dream.split(/:[0-9]+/)
      let d2 = d[0];
      let q1 = d[1].split(/\s/);
      let q2 = q1.slice(0,6),q3 = q1.toString().replace(/,/g," ")
      let d3 = {
        question:"quote "+r,
        type:"quote",
        answer:d[1].toString().replace(/,/g," "),
        refrence:r,
        creator:"koalastrikermi"
      }, d4 = {
        question:"finish this verse and give the refrence "+q2.toString().replace(/,/g," "),
        type:"refrence",
        answer:q3.toString().replace(/,/g," ") + " " + r,
        refrence:r,
        creator:"koalastrikermi"
      }, d5 = {
        question:"finish this verse "+q2.toString().replace(/,/g," "),
        type:"verse",
        answer:q3.toString().replace(/,/g," "),
        refrence:r,
        creator:"koalastrikermi"
      }
      sms.push(d3)
      sms.push(d4)
      sms.push(d5)
    }
  }
  for (var i = 0; i < mmemlist.length; i++) {
    if (id === mmemlist[i].r1 || id === mmemlist[i].r2) {
      let d = dream.split(/:[0-9]+/)
      let d2 = d[0];
      let q1 = d[1].split(/\s/);
      let q2 = q1.slice(0,6),q3 = q1.toString().replace(/,/g," ")
      let d3 = {
        question:"quote "+r,
        type:"quote",
        answer:d[1].toString().replace(/,/g," "),
        refrence:r,
        creator:"koalastrikermi"
      }, d4 = {
        question:"finish these verses and give the refrence "+q2.toString().replace(/,/g," ").trim(),
        type:"refrence",
        answer:q3.toString().replace(/,/g," "),
        refrence:r,
        creator:"koalastrikermi"
      }, d5 = {
        question:"finish these verses "+q2.toString().replace(/,/g," ").trim(),
        type:"verse",
        answer:q3.toString().replace(/,/g," "),
        refrence:r,
        creator:"koalastrikermi"
      }
      mmqs.push(d3)
      mmvs.push(d4)
      mmrs.push(d5)
    }
  }*/
    if (JSON.parse(hi_u)) {
      for (var k = 0; k < chlist[season].used1.length; k++) {
        if (chlist[season].used1[k].test(dream)) dream = dream;
        dream = dream.replace(
          chlist[season].used1[k],
          " <b style = 'color:" +
            lss("c_u_d", "get") +
            ";' class = 'uniqueword'> $1 </b> "
        );
      }
    }
    if (JSON.parse(hi_d)) {
      for (var e = 0; e < chlist[season].used2.length; e++) {
        if (chlist[season].used2[e].test(dream.toLowerCase())) dream = dream;
        dream = dream.replace(
          chlist[season].used2[e],
          " <b style = 'color:" +
            lss("c_d_d", "get") +
            ";' class = 'dblword'> $1 </b> "
        );
      }
    }
    newListItem.innerHTML = dream;
    newListItem.id = id;
    newListItem.className = "verse";
    if (JSON.parse(hi_sm)) {
      for (var i = 0; i < chlist[season].smemlist.length; i++) {
        if (id.toLowerCase() === chlist[season].smemlist[i].toLowerCase()) {
          newListItem.classList.add("memory-verse-s");
          //newListItem.classList.add("membegin");
          newListItem.innerHTML = "(1) " + dream;
          newListItem.style.background = lss("c_sm_d", "get");
          newListItem.style.color = setContrast(hexToRgb(lss("c_sm_d", "get")));
        }
      }
    }
    if (JSON.parse(hi_mm)) {
      for (var i = 0; i < chlist[season].mmemlist.length; i++) {
        for(var j in chlist[season].mmemlist[i]){
          if(id.toLowerCase() === chlist[season].mmemlist[i][j].toLowerCase()){
            newListItem.classList.add("memory-verse-m");
            newListItem.style.background = lss("c_mm_d", "get");
            newListItem.style.color = setContrast(hexToRgb(lss("c_mm_d", "get")));
            if(j === "r1"){ 
              //newListItem.classList.add("membegin");
              newListItem.innerHTML ="("+ Object.keys(chlist[season].mmemlist[i]).length+ ") " + dream;
            } else {
              newListItem.innerHTML ="(^) " + dream;
            }
          }
        }
      }
    }
    dreamsList.appendChild(newListItem);
  };
  /*function postData(url, data, then) {
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
    //location.reload();
  });
}
window.addEventListener("keydown", function (event) {
  if(event.keyCode === 13){
    sms.forEach(function(i){
      postData("/createquestion", JSON.stringify(i),function(){
        console.log(i)
      });
    })
    for(var i = 0;i<mmvs.length;i+=2){
      let v1 = mmvs[i],v2 = mmvs[i+1];
      let ref1 = v1.refrence,ref2 = v2.refrence;
      ref2 = ref2.split(":")[1]
      ref1 = ref1+"-"+ref2
      mmvs[i].refrence = ref1;
      mmvs[i].answer = mmvs[i].answer+" "+mmvs[i+1].answer;
      postData("/createquestion", JSON.stringify(mmvs[i]),function(){
        console.log(mmvs[i])
      });
    }
    for(var i = 0;i<mmrs.length;i+=2){
      let v1 = mmrs[i],v2 = mmrs[i+1];
      let ref1 = v1.refrence,ref2 = v2.refrence;
      ref2 = ref2.split(":")[1]
      ref1 = ref1+"-"+ref2
      mmrs[i].refrence = ref1;
      mmrs[i].answer = mmrs[i].answer+" "+ mmrs[i+1].answer+" "+ref1;
      postData("/createquestion", JSON.stringify(mmrs[i]),function(){
        console.log(mmrs[i])
      });
    }
    for(var i = 0;i<mmqs.length;i+=2){
      let v1 = mmqs[i],v2 = mmqs[i+1];
      let ref1 = v1.refrence,ref2 = v2.refrence;
      ref2 = ref2.split(":")[1]
      ref1 = ref1+"-"+ref2
      mmqs[i].refrence = ref1;
      mmqs[i].question += "-"+ref2;
      mmqs[i].answer = mmqs[i].answer+" "+ mmqs[i+1].answer
      postData("/createquestion", JSON.stringify(mmqs[i]),function(){
        console.log(mmqs[i])
      });
    }
  }
});*/
});
