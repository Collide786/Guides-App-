// DOM elements
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const loadingUI = document.querySelector('.loading');   
let profileImage;
const setupUI = (user) => {
  loadingUI.style.display = 'none'
  if (user) {
    let noImgSrc = 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg';
    let html;
    let reload = false;
    // account info
    db.collection('users').doc(user.uid).get().then(doc => {
        firebase.storage().ref('users/' + user.uid + '/profileImage').getDownloadURL().then(image =>{
        html = `
        <label style="color: rgb(105, 115, 253); font-size: 0.7rem" for="image_uploads">
        <img id="profileImage" style="width: 125px; border-radius: 45%;" alt="not working" src="${image}"> </img>
        <br/><br/>Choose profile image (this feature is in development)</label>
        <br/>
        <br/>
        <div style="font-size: 1.2rem;">Logged in as ${user.email}</div>
        <div style="font-size: 1.2rem;">Bio: ${doc.data().bio}</div>
      `;
      accountDetails.innerHTML = html;
      }).catch( err =>{
        console.log(err)
        if(reload){
          window.location.reload();
          reload = !reload;
        }
        html = `
          <img id="profileImage" style="width: 125px; border-radius: 45%;" src="${noImgSrc}"> </img>
          <br/>
          <br/>
          <div style="font-size: 1.2rem;">Logged in as ${user.email}</div>
          <div style="font-size: 1.2rem;">Bio: ${doc.data().bio}</div>
          `;
          accountDetails.innerHTML = html;
      })
    });
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // clear account info
    accountDetails.innerHTML = '';
    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

// setup guides
const setupGuides = (data, user) => {
  if(user){
    guideList.innerHTML = '<h5 class="center-align">No guides avalible.</h5>';
    if (data.length) {
      let html = '';
      data.forEach(doc => {
        const guide = doc.data();
        if(guide.title && guide.content){
          console.log(guide)
          const li = `
            <li>
                <div class="collapsible-header grey lighten-4"> 
                  <div style="font-size: 20px;">${guide.title} </div>
                  <div class="row"></div>
                  <div class="col s6 right-align"> ${user.email} - ${guide.time} </div>
                </div>
                <div class="collapsible-body white"> ${guide.content} 
                </a>
                </div>
                
            </li>
          `;
          html += li;
        }
        else{
          html = guideList.innerHTML = '<h5 class="center-align">No guides avalible.</h5>';
        }});
        guideList.innerHTML = html
    }
    else{
        html = guideList.innerHTML = '<h5 class="center-align">No guides avalible.</h5>';
    }
  }
  else{
    guideList.innerHTML = `<li class="active">
    <div class="collapsible-header grey lighten-4">
      <div style="font-size: 20px">Welcome</div>
      <div class="row"></div>
      <div class="col s6 right-align">
        kadri4152@gmail.com - admin/owner!
      </div>
    </div>
    <div class="collapsible-body white" style="display: block">
      This website is here for anybody to create and view guides.
      Please login or signup to view/create guides.
      <br />
      This website does not have all the features but in the near
      future it will!
      <br />
      Enjoy : ]
    </div>
  </li>`
  }
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});


const inputP = document.querySelector('#signup-password');
const passStatus = document.querySelector('#passStatus');

function showPasswordLogin(){
  if (inputP.type === "password") {
    inputP.type = "text";
    passStatus.innerHTML = '<i class="xs material-icons">visibility</i>';
  } else {
    inputP.type = "password";
    passStatus.innerHTML = '<i class="xs material-icons">lock_outline</i>';
  }
}