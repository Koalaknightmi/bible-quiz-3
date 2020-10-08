  for (var i = 0; i < smemlist.length; i++) {
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
      /*postData("/createquestion", JSON.stringify(d3),function(){
        console.log(d3)
      });
      postData("/createquestion", JSON.stringify(d4),function(){
        console.log(d4)
      });
      postData("/createquestion", JSON.stringify(d5),function(){
        console.log(d5)
      });*/
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
        answer:q3.toString().replace(/,/g," ") /*+ " " + d2*/,
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
      /*postData("/createquestion", JSON.stringify(d3),function(){
        console.log(d3)
      });
      postData("/createquestion", JSON.stringify(d4),function(){
        console.log(d4)
      });
      postData("/createquestion", JSON.stringify(d5),function(){
        console.log(d5)
      });*/
    }
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
});
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
    //location.reload();
  });
}