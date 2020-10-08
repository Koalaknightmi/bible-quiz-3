"use strict";
/*
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
};*/

  //var status = document.getElementById("status");
  var condition = navigator.onLine ? "online" : "offline";
  if(status!==undefined){
    //status.className = condition;
    //status.innerHTML = condition.toUpperCase();
    function updateOnlineStatus(event) {
      condition = navigator.onLine ? "online" : "offline";

      //status.className = condition;
      //status.innerHTML = condition.toUpperCase();
    }
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  }

var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") {
  // Opera 12.10 and Firefox 18 and later support
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

function handleVisibilityChange() {
  if (document[hidden]) {
    window.socket.emit("idle", JSON.parse(localsave("userdata", "get")).name);
  } else {
    window.socket.emit("active", JSON.parse(localsave("userdata", "get")).name);
  }
}

if (typeof document.addEventListener === "undefined" || hidden === undefined) {
  console.log(
    "This webpage requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API."
  );
} else {
  document.addEventListener(visibilityChange, handleVisibilityChange, false);
}
window.onunload = function(event) {
  window.socket.emit("idle", JSON.parse(localsave("userdata", "get")).name);
};