window.addEventListener("load", event => {
  let chtbl = document.getElementById("chbody")
  var chs = {}
  chs.total = {lv:0,m:0, mmem: 0, smem: 0, ver: 0, wc: 0,chrs:0,r1:0,sv:0,uw:0 }
  console.log(chlist[season].chs)
  var book = chlist[season]
  var gettextListener = function gettextListener() {
    str = this.responseText;
    str = str.split(/(?<![0-9])1(?![0-9])/g);
    str.shift();
    console.log(str);
    str2 = str.slice(0);
    let c = 0,c2 = 0,c3 = 0,c4 = 0,c5 = 0;
    for (var i = 0; i < str.length; i++) {
      c = 0,c2 = 0,c3 = 0,c4 = 0,c5 = 0
      for(var l in book.used1){
        if(~str[i].search(book.used1[l])){
          c5++
        }
      }
      str[i] = str[i].split(/[0-9]+\s/);
      str2[i] = str2[i].split(/[0-9]+\s/);
      for (var j = 0; j < str[i].length; j++) {
        str2[i][j] = str[i][j].split(/\w+/g);
        str[i][j] = str[i][j]
          .replace(/[^a-zA-z\0’-]|’(?!s)/g, " ")
          .trim()
          .replace(/\s\s\s/g, " ")
          .replace(/\s\s/g, " ")
          .replace(/\s\s/g, " ");
        c += str[i][j].split(" ").length
        c3 += str[i][j].replace(" ","").length
        if(str[i][j].split(" ").length>30){
          c2++
        }
        if(str[i][j].split(" ").length<10){
          c4++
        }
      }
      chs[book.chs[i].abr] = {uw:c5,chrs:c3,sv:c4,lv:c2,m:0, mmem: 0, smem: 0, ver: str[i].length, wc: c,r1:(c3/c).toFixed(1) }
      chs.total.ver += str[i].length
      chs.total.wc += c
      chs.total.lv += c2
      chs.total.chrs += c3
      chs.total.uw += c5
      chs.total.r1 = (chs.total.chrs/chs.total.wc).toFixed(1)
    }
    punctuation = str2;
    let sme, ch;
    for (sma in book.smemlist) {
      ch = book.smemlist[sma].split(":")[0].toLowerCase()
      chs[ch].smem++
      chs[ch].m++
      chs.total.m ++
      chs.total.smem ++
    }
    for (mma in book.mmemlist) {
      ch = book.mmemlist[mma].r1.split(":")[0].toLowerCase()
      chs[ch].mmem++
      chs[ch].m++
      chs.total.m ++
      chs.total.mmem ++
    }
    console.log(chs)
    for(var i in chs){
      let e = document.createElement("tr")
      if(i === "total"){
        e.style.margin = "4px"
        e.innerHTML = `<td>Total</td><td>${chs[i].ver}</td><td>${chs[i].m}</td><td>${chs[i].mmem}</td><td>${chs[i].smem}</td><td>${chs[i].wc}</td><td>${(chs[i].wc/chs[i].ver).toFixed(1)}</td>`
      } else{
        e.innerHTML = `<td>${book.abrtofull(i)}</td><td>${chs[i].ver}</td><td>${chs[i].m}</td><td>${chs[i].mmem}</td><td>${chs[i].smem}</td><td>${chs[i].wc}</td><td>${(chs[i].wc/chs[i].ver).toFixed(1)}</td>`
      }
      chtbl.appendChild(e)
    }
  };

  var hebrewsRequest = new XMLHttpRequest();
  hebrewsRequest.onload = gettextListener;
  hebrewsRequest.open("get", "/gettext/" + localStorage.playerseason);
  hebrewsRequest.send();
})