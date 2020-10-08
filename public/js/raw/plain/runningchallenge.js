window.addEventListener('load', (event) => {
  var socket =  window.socket
  
  document.body.addEventListener("click",function(){
    if(window.activeinput){
      socket.emit("inputoccured")
    }
  })
  document.body.addEventListener("onkeyup",function(){
    if(window.activeinput){
      socket.emit("inputoccured")
    }
  })
})