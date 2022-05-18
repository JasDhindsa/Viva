const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const userVideo = videoGrid

const myPeer = new Peer(undefined, {
  host: '/',
  port: '8081'
})
const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}


// myVideo = false


navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  addVideoStream(myVideo, stream)

  myPeer.on('call', call => {
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
    })
  })

  socket.on('user-connected', userId => {
    connectToNewUser(userId, stream)
  })
  
})

socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})


myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  })
  call.on('close', () => {
    video.remove()
  })
  peers[userId] = call

}


function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function redirect(){
  const val = uuidv4();
  console.log(val);
  window.location.replace(val)

}

function redirectwithVal(s){
  window.location.replace(s)

}

function changeRoom(){
  window.location.href = 'room.ejs';

}



let btnGet=document.querySelector('#btn-get');
let btnSet=document.querySelector('#btn-set');
let inputGet =document.querySelector('#input-get');
let inputSet =  document.querySelector('#input-set'); 
let result=document.querySelector('#result');
            
btnGet.addEventListener('click', () =>{
    result.innerText= inputGet.value; 
    if(inputGet.value.length != 0){
      redirectwithVal(inputGet.value)
    }
});

                     


// toggleButton.addEventListener('click', () => {
//     const videoTrack = userStream.getTracks().find(track => track.kind === 'video');
//     if (videoTrack.enabled) {
//         videoTrack.enabled = false;
//         toggleButton.innerHTML = 'Show cam'
//     } else {
//         videoTrack.enabled = true;
//         toggleButton.innerHTML = "Hide cam"
//     }
// });

// remoteVideoContainer.addEventListener('click', (e) => {
//     if (e.target.innerHTML.includes('Hide')) {
//         e.target.innerHTML = 'show remote cam';
//         socket.emit('hide remote cam', e.target.getAttribute('user-id'));
//     } else {
//         e.target.innerHTML = `Hide user's cam`;
//         socket.emit('show remote cam', e.target.getAttribute('user-id'));
//     }
// })

// function hideCam() {
//     const videoTrack = userStream.getTracks().find(track => track.kind === 'video');
//     videoTrack.enabled = false;
// }

// function showCam() {
//     const videoTrack = userStream.getTracks().find(track => track.kind === 'video');
//     videoTrack.enabled = true;
// }

