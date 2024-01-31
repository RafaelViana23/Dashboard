import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
            apiKey: "AIzaSyDzktDPQ6PKtQGb1Sk7WSV7-ZWnN9KAOvY",
            authDomain: "sistema-crm-915d2.firebaseapp.com",
            projectId: "sistema-crm-915d2",
            storageBucket: "sistema-crm-915d2.appspot.com",
            messagingSenderId: "1002175150582",
            appId: "1:1002175150582:web:01268484f21f3346c9efd7",
            measurementId: "G-TVQZKF3CW1"
        };
    
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const database = getDatabase(app);
        const auth = getAuth();
        const analytics = getAnalytics(app);
    
    
    register.addEventListener('click',(e) => {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var username = document.getElementById("username").value;
    
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            
            set(ref(database, 'users/' + user.uid),{
                username: username,
                email: email
            })
    
            alert('user created!');
    
        })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
    
            alert('errorMessage');
            // ..
        });
    });
    
    login.addEventListener('click',(e) => {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
    
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const dt = new Date();
    
                update(ref(database, 'users/' + user.uid),{
                last_login: dt,
            })
    
            alert('user loged in');
                // ...
        })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
    
            alert('errorMessage');
        });
    });
    
    const user = auth.currentUser;
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            // ...
        } else {
            // User is signed out
            // ...
        }
    });

    logout.addEventListener('click',(e) => {
    
        signOut(auth).then(() => {
        // Sign-out successful.
        alert('user loged out');
        }).catch((error) => {
        // An error happened.
        const errorCode = error.code;
            const errorMessage = error.message;
    
            alert('errorMessage');
        });
    });

registerPage.addEventListener('click',(e) => {
    window.location.href = "register.html";
});