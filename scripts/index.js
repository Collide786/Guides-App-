
// DOM elements
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const loadingUI = document.querySelector('.loading');


const setupUI = (user) => {
  loadingUI.style.display = 'none'
  if (user) {
    // account info
    db.collection('users').doc(user.uid).get().then(doc => {

      firebase.storage().ref('users/' + user.uid + '/profileImage').getDownloadURL().then(image =>{
        const html = `
        <img style="width: 100px; border-radius: 5rem;" src="${image}"> </img>
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
const setupGuides = (data) => {
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
    });
    guideList.innerHTML = html
    
  }
  else{
    html = guideList.innerHTML = '<h5 class="center-align">No guides avalible.</h5>';
  }
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});