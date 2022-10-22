import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged ,
  signOut 
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";
import {
  doc,
  setDoc,
  getFirestore,
  updateDoc 
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-storage.js";
// import { swal } from "./alert";

const firebaseConfig = {
  apiKey: "AIzaSyCd7Mjdq_Lyt7Qd-lnUFfJzXuWhQFgnARI",
  authDomain: "blog-app-13d7a.firebaseapp.com",
  projectId: "blog-app-13d7a",
  storageBucket: "blog-app-13d7a.appspot.com",
  messagingSenderId: "1030192930298",
  appId: "1:1030192930298:web:34a87f416bbbe683321843",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();




//login
let emailL = document.getElementById("emailL");
let passL = document.getElementById("passL");
let login = document.getElementById("login");
login.addEventListener("click", () => {
    
  signInWithEmailAndPassword(auth, emailL.value, passL.value)
    .then((userCredential) => {
    let main = document.getElementById("main")
      main.style.display = "none"
      let main_loader = document.getElementById("main_loader")
      main_loader.style.display = "block"

      const user = userCredential.user;
      console.log(user);
      window.location = "/room/posts.html";
      setTimeout(()=>{
        main_loader.style.display = "none"

        // main.style.display = "block"
      },5000)

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // swal(errorMessage)
      if(error){
        swal("invalid inputs")
      }
    });
});

