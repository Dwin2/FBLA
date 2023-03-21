import {createUserWithEmailAndPassword, signInWithEmailAndPassword, update, signOut, set, ref, get, child, onValue, app, auth, database, userId} from './firebase.js';

function logIn() {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var name = document.getElementById('name').value;
    var password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        var lgDate = new Date();
        update(ref(database, 'users/' + user.uid), {
          last_login: lgDate,
        })
        .then(() => {
          // Data saved successfully!
          alert('Logged in successfully');
          window.location.href = "index.html";
        })
        .catch((error) => {
          // The write failed...
          alert(error);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
};

function signUp() {
    event.preventDefault();
    
    var email = document.getElementById('email').value;
    var name = document.getElementById('name').value;
    var password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            // Data saved successfully!
            const user = userCredential.user;
            set(ref(database, 'users/' + user.uid), {
              name : name,
              email: email,
              password: password,
            })
            .then(() => {
              // Data saved successfully!
              alert('User created successfully');
              //alert(user.password); 
              //window.location.href = "home.html";
            })
            .catch((error) => {
              // The write failed...
              alert(error);
            });
            
        })
        .catch((error) => {
            // The write failed...
            alert(error);
        });
};
function logOut() {
  signOut(auth).then(() => {
    window.location.href = "./login.html";
    // Sign-out successful.
  }).catch((error) => {
    alert(error);
    // An error happened.
  });
}

export {logIn, signUp, logOut};