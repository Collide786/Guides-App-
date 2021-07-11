// Initialize Firebase
var config = {
  apiKey: "AIzaSyCgybWp4i4p-hd8DCTtyjgfucTU8XIfqto",
  authDomain: "gameplays-14e33.firebaseapp.com",
  projectId: "gameplays-14e33",
  storageBucket: "gameplays-14e33.appspot.com",
  messagingSenderId: "798723891456",
  appId: "1:798723891456:web:1d2c193fe22b6b081193e5",
  measurementId: "G-08ET1W1EK5"
};
firebase.initializeApp(config);
// make auth and firestore references
const auth = firebase.auth();
const db = firebase.firestore();

let time = new Date();
let seconds = parseInt(time.getSeconds()) < 10 ? `0${time.getSeconds()}` : time.getSeconds();
let minutes = parseInt(time.getMinutes()) < 10 ? `0${time.getMinutes()}` : time.getMinutes();
let hour = parseInt(time.getHours()%12) < 10 ? `0${time.getHours()%12}` : time.getHours()%12;
// update firestore settings
db.settings({ timestampsInSnapshots: true });


const imageInput = document.querySelector('#image_uploads');
const preview = document.querySelector('.preview');
imageInput.style.opacity = 0;
let file;

function uploadedImg(input) {
  while(preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }
  if (input.files && input.files[0]) {
    file = input.files[0];
    var reader = new FileReader();
    reader.addEventListener(
      "load",
      function() {
        var src = reader.result;
        const preveiwImg = document.createElement('img');
        preveiwImg.style.cssText = "width: 100px; height: 100px;"
        preveiwImg.src = src
        preview.appendChild(preveiwImg);
      }
    );
    reader.readAsDataURL(input.files[0]);
  }
}


function toggleCanvas() {
  var canvas = document.getElementById("myCanvas");
  if(canvas.style.display == "none"){
    canvas.style.display = "block";
    document.getElementById("toggleCanvasDisplay").innerText = "Hide canvas";
  }
  else {
    canvas.style.display = "none";
    document.getElementById("toggleCanvasDisplay").innerText = "Show canvas";
  }
}

function toggleDataUrl() {
  var area = document.getElementById("dataUrl");
  if(area.style.display == "none"){
    area.style.display = "block";
    document.getElementById("toggleDataUrl").innerText = "Hide data url";
  }
  else {
    area.style.display = "none";
    document.getElementById("toggleDataUrl").innerText = "Show data url";
  }
}



// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    db.collection('guides').onSnapshot(snapshot => {
      setupGuides(snapshot.docs, user);
      setupUI(user); 
    }, err => console.log(err.message));  
  } else {
    setupUI();
    setupGuides([]);
  }
});

setInterval(() =>{
  time = new Date();
  seconds = parseInt(time.getSeconds()) < 10 ? `0${time.getSeconds()}` : time.getSeconds();
  minutes = parseInt(time.getMinutes()) < 10 ? `0${time.getMinutes()}` : time.getMinutes();
  hour = parseInt(time.getHours()%12) < 10   ? `0${time.getHours()%12}` : time.getHours()%12;
}, 1000);

// create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (event) => {
  event.preventDefault();
  auth.onAuthStateChanged((user) => {
    db.collection('guides').add({
      title: createForm.title.value + ' -' + user.email,
      content: createForm.content.value,
      time: `${hour}:${minutes}:${seconds}`,
    }).then(() => {
      // close the create modal & reset form
      const modal = document.querySelector('#modal-create');
      M.Modal.getInstance(modal).close();
      createForm.reset();
    }).catch(err => {
      console.log(err.message);
    });
  })
});



// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user & add firestore data
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
      firebase.storage().ref('users/' + cred.user.uid + '/profileImage').put(file).then((status) =>{
      })
    db.collection('users').doc(cred.user.uid).set({
      bio: signupForm['signup-bio'].value
    });
  }).then(() => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
    setTimeout(function(){location.reload(true)}, 500);
  });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (event) => {
  event.preventDefault();
  auth.signOut();
});

// login
const loginForm = document.querySelector('#login-form');
const loginButton = document.querySelector('#login_button');
const error_mg = document.getElementById('error-mg');

loginForm.addEventListener('submit', (event) => {
  loginButton.innerHTML = 'Loading...'
  event.preventDefault();
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;
  // log the user in

  auth.signInWithEmailAndPassword(email, password).then(() => {

    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  }).catch((error) => {
    loginButton.innerHTML = 'Login'
    error_mg.innerHTML = 'Invalid login credentials. Please try again.'
  });
  
});

const modal_Login = document.querySelector('[data-target="modal-login"]')
modal_Login.addEventListener('click', (event) =>{
  loginButton.innerHTML = 'Login'
})
