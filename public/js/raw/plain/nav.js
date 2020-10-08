var navbtn = document.querySelector("#navbtn");
var ddnav = document.querySelector("#mySidenav");
var appto = document.querySelector("#mySidenav");
var url = "https://koalaknightmi-bible-quiz2-1.glitch.me";
var url2 = "https://bible-quiz-full-browser-support.glitch.me/js/bundles/";
var defaultscripts = [
  "https://koalaknightmi-bible-quiz2-1.glitch.me/js/lib/socket.io.js",
  "/js/raw/plain/log.js",
  "/js/raw/plain/addlogin.js",
  "/js/raw/plain/login.js",
  "/js/raw/plain/offline.js",
  "/js/raw/plain/fade.js",
  "/js/raw/plain/season.js"
]; /**/
//var defaultstylesheet = "/css/style.css"
//var icons = ["/images/apple-touch-icon.png","/images/favicon.ico","/images/safari-pinned-tab.svg","/images/favicon-32x32.png","/images/favicon-16x16.png"]
//var manifest = "/manifest.json"
var es6 = true;
var htmls = [
  { path: "index", name: "home", styleSheet: "", scripts: [] },
  {
    path: "leaderboard",
    name: "leaderboards",
    styleSheet: "",
    scripts: ["/js/raw/plain/leaderboard.js"]
  },
  {
    path: "scripture-portion",
    name: "scripture portion",
    styleSheet: "",
    scripts: ["/js/raw/plain/scriptureportion2.js"]
  },
  {
    path: "typequizzing",
    name: "type quizzing",
    styleSheet: "/css/typing-quizzing.css",
    scripts: ["https://unpkg.com/compromise", "/js/raw/plain/typequiz3.js"]
  },
  //{path:"voicequizzing",name:"voice quizzing"},
  { path: "onlinequizzing", name: "online quizzing (wip)",scripts:[/*"/js/lib/socket.io-p2p.js",*/"/js/raw/plain/onlinequizzing.js","https://cdn.jsdelivr.net/npm/video-stream-merger@3/dist/video-stream-merger.min.js"]},
  {
    path: "blanks",
    name: "blanks and prompterizers",
    styleSheet: "",
    scripts: ["https://unpkg.com/compromise", "/js/raw/plain/blanks.js"]
  },
  {
    path: "search",
    name: "search",
    styleSheet: "",
    scripts: ["https://unpkg.com/compromise", "/js/raw/plain/search3.js"]
  },
  {
    path: "settings",
    name: "settings",
    styleSheet: "",
    scripts: ["/js/raw/plain/Psettings.js"]
  } /**/
  //{path:"chat",name:"chat"},
  //{path:"createquestion",name:"Create Questions"},
];
function check() {
  "use strict";

  if (typeof Symbol == "undefined") return false;
  try {
    eval("class Foo {}");
    eval("var bar = (x) => x+1");
    eval("let ba = 'tes'");
  } catch (e) {
    return false;
  }

  return true;
}
if (!check()) {
  es6 = false;
}

var mobileAndTabletcheck = function() {
  var check = false;
  (function(a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

var navopen = false;
function openNav() {
  if (mobileAndTabletcheck()) {
    document.getElementById("mySidenav").style.width = "100vw";
    document.querySelector("main").style.marginLeft = "100vw";
  } else {
    document.getElementById("mySidenav").style.width = "250px";
    document.querySelector("main").style.marginLeft = "250px";
  }
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.querySelector("main").style.marginLeft = "0";
}

document.body.addEventListener("click", function(e) {
  if (navopen) {
    if (e.target.className !== "d-nav-a") {
      //ddnav.style.display = "none"
      navopen = false;
      closeNav();
    } else if (
      e.target.id === "navbtn" ||
      e.target.className === "material-icons md-24"
    ) {
      //ddnav.style.display = "none"
      navopen = false;
      closeNav();
    }
  } else if (
    e.target.id === "navbtn" ||
    e.target.className === "material-icons md-24"
  ) {
    //ddnav.style.display = "block"
    navopen = true;
    openNav();
  }
}); /*
})*/
/*navbtn.addEventListener('click', (e) => {
  /*if(!navopen){
    
  }
  else{
    ddnav.style.display = "none"
    navopen = false;
  }*/ if (
  window.parent.document.URL.split("/")[4] === undefined
) {
  var current = "index";
} else {
  var current = window.parent.document.URL.split("/")[4].split(".")[0];
}

console.log(current);

for (var i = 0; i < htmls.length; i++) {
  //if (htmls[i].path !== current) {
  if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
    /*var lplace = document.createElement("span");
      lplace.innerHTML = "<a href = '/html/"+htmls[i].path+".html'><b>"+htmls[i].name.toUpperCase()+"</b></a>";
      appto.appendChild(lplace);*/
    var lplace2 = document.createElement("span");
    lplace2.innerHTML =
      "<a class = 'd-nav-a' href = '/html/" +
      htmls[i].path +
      ".html'><b>" +
      htmls[i].name.toUpperCase() +
      "</b></a>";
    ddnav.appendChild(lplace2);
  } else {
    if (htmls[i].path !== "voicequizzing") {
      /*var lplace = document.createElement("span");
      lplace.innerHTML = "<a href = '/html/"+htmls[i].path+".html'><b>"+htmls[i].name.toUpperCase()+"</b></a>";
      appto.appendChild(lplace);*/
      var lplace2 = document.createElement("span");
      lplace2.innerHTML =
        "<a class = 'd-nav-a' href = '/html/" +
        htmls[i].path +
        ".html'><b>" +
        htmls[i].name.toUpperCase() +
        "</b></a>";
      ddnav.appendChild(lplace2);
    }
  }
  //}
  if (htmls[i].path === current) {
    for (var l = 0; l < htmls[i].scripts.length; l++) {
      var script = htmls[i].scripts[l];
      console.log(script);
      var el = document.createElement("script");
      if (
        script.indexOf("compromise") === -1 &&
        script.indexOf("socket.io") === -1 &&
        script.indexOf("cdn.jsdelivr.net") === -1
      ) {
        if (es6) {
          el.src = script;
        } else {
          el.src = url2 + script.split("/")[4].split(".")[0] + ".bundle.js";
          console.log(
            url2 + script.split("/")[4].split(".")[0] + ".bundle.js"
          );
        }
      } else if (script.indexOf("compromise") !== -1) {
        if(es6){
          el.src = script;
        } else{
          el.src = url2 + "compromise.bundle.js"
        }
      } else {
        el.src = script;
      }
      var att = document.createAttribute("defer"); // Set the value of the class attribute
      att.Value = true;
      el.setAttributeNode(att);
      var att2 = document.createAttribute("charset"); // Set the value of the class attribute
      att2.Value = "utf8";
      el.setAttributeNode(att2);
      console.dir(el);
      document.head.appendChild(el);
    }
  }
}
if (es6) {
  console.log("es6 true adding default scripts");
  for (var l = 0; l < defaultscripts.length; l++) {
    var script = defaultscripts[l];
    console.log(script);
    var el = document.createElement("script");
    el.src = script;
    var att = document.createAttribute("defer"); att.Value = true;// Set the value of the class attribute
    el.setAttributeNode(att);
    var att2 = document.createAttribute("charset"); // Set the value of the class attribute
    att2.Value = "utf8";
    el.setAttributeNode(att2);
    document.head.appendChild(el);
    console.dir(el);
  }
} else {
  console.log("es6 false adding default scripts");
  var el = document.createElement("script");var el2 = document.createElement("script");
  el.src = url2 + "main.bundle.js";el2.src = "/js/lib/socket.io.js";
  var att = document.createAttribute("defer"); var att2 = document.createAttribute("charset");
  att2.Value = "utf8";att.Value = true;
  el.setAttributeNode(att2);
  el.setAttributeNode(att);
  //el2.setAttributeNode(att);
  //el2.setAttributeNode(att2);
  document.head.appendChild(el2);
  document.head.appendChild(el);
  console.dir(el, el2);
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
document.addEventListener(
  "keypress",
  function(e) {
    if (e.keyCode === 13) {
      //toggleFullScreen();
    }
  },
  false
);

/*var seasonsel = `
<div class="centermodel">
  <p>Due to recent updates it is necessary for you to select what you are currently studying before continuing :)</p>
  <select id = "pickseason">
  	<option value = "hebrews">Hebrews + 1-2 Peter</option>
    <option value = "matthew">Matthew</option>
  </select>
  <button id = "selectseasonbtn" class = "btn kcss-btn kcss-ripple-btn kcss-btn-blue">SUBMIT</button>
</div>

`;
if (localStorage.playerseason === undefined) {
  let selement = document.createElement("div");
  selement.innerHTML = seasonsel;
  document.body.appendChild(selement);

  let picks = document.getElementById("pickseason");
  let picksb = document.getElementById("selectseasonbtn");
  picksb.addEventListener("click", function() {
    localStorage.playerseason = picks.value;
    location.reload();
  });
}*/
