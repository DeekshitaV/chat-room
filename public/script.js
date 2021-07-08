const socket = io("/");

firebase.initializeApp(firebaseConfig);
firebase.analytics();

var username = "";
do {
    username = prompt('Enter your display name');
} while (!username);
const user = username;

firebase.database().ref(ROOM_ID + '/messages').once( 'value' , (snapshot) => {
  snapshot.forEach(element => {
      var obj = element.val();
      messages.innerHTML =
      messages.innerHTML +
      `<div class="message">
          <b><i class="far fa-user-circle"></i> <span> ${
              obj.name
          }</span> </b>
          <span>${obj.message}</span>
      </div>`; 
  });
  scrollToBottom();
}) 

let text = document.querySelector('#chat-message');
let send = document.getElementById('send');
let messages = document.querySelector('.messages');
let joinCall = document.querySelector('#join');

joinCall.addEventListener("click", () => { 
      window.location.href = "https://videocall-deekshitaverma.herokuapp.com/" + ROOM_ID;
});

const sendData = (textMessage, userName) => {
    firebase.database().ref(ROOM_ID + '/messages').push({ name: userName, message: textMessage });
}

const scrollToBottom = () => {

    let d = $('.main-chat-window');
    d.scrollTop(d.prop('scrollHeight'));
}

send.addEventListener("click", (e) => {
    if (text.value.length !== 0) {

        socket.emit("chat", ROOM_ID, text.value, user);
        console.log(ROOM_ID, text.value, user);
        sendData(text.value, user);
        text.value = "";

    }
});

text.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && text.value.length !== 0) {
      console.log(ROOM_ID, text.value, user);
        socket.emit("chat", ROOM_ID, text.value, user);
        sendData(text.value, user);
        text.value = "";

    }
});

 socket.on("create-message", (message, userName) => {
  console.log(message, userName);
  messages.innerHTML =
    messages.innerHTML +
    `<div class="message">
        <b><i class="far fa-user-circle"></i> <span> ${
          userName
        }</span> </b>
        <span>${message}</span>
    </div>`; 
  scrollToBottom();
});
