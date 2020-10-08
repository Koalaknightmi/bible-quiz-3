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
window.localsave = localsave;