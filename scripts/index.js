
// DOM elements
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const loadingUI = document.querySelector('.loading');

const setupUI = (user) => {
  loadingUI.style.display = 'none'
  if (user) {
    let noImgSrc = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
    let html;
    // account info
    db.collection('users').doc(user.uid).get().then(doc => {
        firebase.storage().ref('users/' + user.uid + '/profileImage').getDownloadURL().then(image =>{
        html = `
        <img id="profileImage" style="width: 100px; border-radius: 5rem;" alt="not working" src="${image}"> </img>
        <br/>
        <br/>
        <div style="font-size: 1.2rem;">Logged in as ${user.email}</div>
        <div style="font-size: 1.2rem;">Bio: ${doc.data().bio}</div>
      `;
      accountDetails.innerHTML = html;
      }).catch((err) =>{
        console.error(err.code)
        html = `
          <img id="profileImage" style="width: 100px; border-radius: 1rem;" alt="not working" src="${noImgSrc}"> </img>
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
          const li = `
            <li>
                <div class="collapsible-header grey lighten-4"> 
                  ${guide.title} 
                  <div class="row"></div>
                  <div class="col s1 right-align"> ${guide.time} </div>
                </div>

                <div class="collapsible-body white"> ${guide.content} </div>
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
    html = guideList.innerHTML = '<h5 class="center-align">Please Login to veiw guides</h5>';
  }
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});
