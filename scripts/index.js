
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
<<<<<<< HEAD

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
=======
      const html = `
        <img style="width: 100px; border-radius: 5rem;" src="${null}"> </img>
        <br/>
        <br/>
        <div style="font-size: 1.2rem;">Logged in as ${user.email}</div>
        <div style="font-size: 1.2rem;">${doc.data().bio}</div>
      `;
      accountDetails.innerHTML = html;
>>>>>>> 37514efbe9e980bb92c4f23d6f7335b46f16bad0
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
<<<<<<< HEAD
const setupGuides = (data) => {
=======
const setupGuides = (data, user) => {
>>>>>>> 37514efbe9e980bb92c4f23d6f7335b46f16bad0
  guideList.innerHTML = '<h5 class="center-align">No guides avalible.</h5>';
  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const guide = doc.data();
      if(guide.title && guide.content){
<<<<<<< HEAD
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
=======
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
>>>>>>> 37514efbe9e980bb92c4f23d6f7335b46f16bad0
      }
    });
    guideList.innerHTML = html
    
<<<<<<< HEAD
  }
  else{
    html = guideList.innerHTML = '<h5 class="center-align">No guides avalible.</h5>';
  }
}
=======
  } else {
    if(user){
      guideList.innerHTML = '<h5 class="center-align"> No Guides Created</h5>';
    }
    else{
      guideList.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
    }
  }
  

};
>>>>>>> 37514efbe9e980bb92c4f23d6f7335b46f16bad0

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

<<<<<<< HEAD
});
=======
});
>>>>>>> 37514efbe9e980bb92c4f23d6f7335b46f16bad0
