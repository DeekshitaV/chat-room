const socket = io();

firebase.initializeApp(firebaseConfig);
firebase.analytics();

var username = "";
do{
  username = prompt('Enter your display name');
}while(!username);
const user = username;

let text = document.querySelector('#chat-message');
let send = document.getElementById('send');
let messages = document.querySelector('.messages');

send.addEventListener("click" , (e) => {
    if(text.value.length !== 0 ){
        socket.emit("chat" , (ROOM_ID, text.value , user) );
       // sendData(text.value,user);     
        text.value = "";
        
    }
 });
 
 text.addEventListener("keydown" , (e) => {
     if(e.key === "Enter" && text.value.length !== 0 ){
         socket.emit("chat" , (ROOM_ID, text.value , user) );
       //  sendData(text.value,user);
         text.value = "";            
     }
 });
 
//  socket.on("createMessage", (message, userName) => {
//      console.log("hame bulaya");
//      messages.innerHTML =
//        messages.innerHTML +
//        `<div class="message">
//            <b><i class="far fa-user-circle"></i> <span> ${
//              userName === user ? "me" : userName
//            }</span> </b>
//            <span>${message}</span>
//        </div>`; 
//      //scrollToBottom();
//  });

 socket.on("createMessage" , (message,userName) => {
    console.log("hame bulaya");
    messages.innerHTML =
      messages.innerHTML +
      `<div class="message">
          <b><i class="far fa-user-circle"></i> <span> ${
            userName === user ? "me" : userName
          }</span> </b>
          <span>${message}</span>
      </div>`; 
 })