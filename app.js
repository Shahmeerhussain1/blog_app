import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";
import {
  doc,
  setDoc,
  getFirestore,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-storage.js";

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

//signup
const storage = getStorage();

const getting_url=(file,uid)=>{
  return new Promise(function(resolve,reject){
  const storageRef = ref(storage, `'images/${uid}.jpg'`);
  const uploadTask = uploadBytesResumable(storageRef,file );
  uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      switch (snapshot.state) {
        case 'paused':
          break;
        case 'running':
          break;
      }
    }, 
    (error) => {
      reject(error)
      console.log("bhund")
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
        resolve(downloadURL)
          console.log('File available at', downloadURL);
     
      });
    }
  );
  
  })

  }

Signup.addEventListener("click", () => {
  let emailS = document.getElementById("emailS");
  let passS = document.getElementById("passS");
  let Signup = document.getElementById("Signup");
  let namE = document.getElementById("namE");
  let User_photo = document.getElementById("User_photo");
  let zoo = User_photo.files[0];
  console.log(zoo);
  let lpo = emailS.value
  let loweremail = lpo.toLowerCase()



  let resultname = /^[a-zA-Z ]+$/.test(namE.value);
  let resultemail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      emailS.value
    );
  if (resultname == true) {
    if (resultemail == true) {
      if (passS.value.length >= 6) {
        if(zoo){
           let main = document.getElementById("main");
        main.style.display = "none";
        let main_loader = document.getElementById("main_loader");
        main_loader.style.display = "block";
        createUserWithEmailAndPassword(auth, emailS.value, passS.value)
          .then(async (userCredential) => {
            const user = userCredential.user.uid;
            const usestorage = await getting_url(zoo,user)
            console.log(usestorage)
            await setDoc(doc(db, "users", user), {
              name: namE.value,
              email: loweremail,
              photo:usestorage,
            });

            console.log(user);
            window.location = "/room/posts.html";
            main_loader.style.display = "none";
            setTimeout(() => {
              main_loader.style.display = "none";

              // main.style.display = "block"
            }, 5000);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
          });
        }else{
          let po = document.getElementById("po");
          // passS.className = "zeera";
          po.style.borderColor = "red";
          setTimeout(() => {
            po.style.borderColor = "white";
          }, 2000);
          
        }
       
      } else {
        let passS = document.getElementById("passS");
        // passS.className = "zeera";
        passS.style.borderColor = "red";
        setTimeout(() => {
          passS.style.borderColor = "white";
        }, 2000);
      }
    } else {
      let emailS = document.getElementById("emailS");
      // emailS.className = "zeera"
      emailS.style.borderColor = "red";
      setTimeout(() => {
        emailS.style.borderColor = "white";
      }, 2000);
    }
  } else {
    let namE = document.getElementById("namE");
    // namE.className = "zeera";
    namE.style.borderColor = "red";
    setTimeout(() => {
      namE.style.borderColor = "white";
    }, 2000);
  }
});

//

///

// let seend = document.getElementById("seend")
// seend.addEventListener("click", async () => {
//   let sign_up_photo = document.getElementById("sign_up_photo");
//   let file = sign_up_photo.files[0];
//   const auth = getAuth();
//   let uid = auth.currentUser.uid;
//   let url = await uploadFiles(file);
//   const washingtonRef = doc(db, "users", uid);
//   await updateDoc(washingtonRef, {
//     profile: url,
//   });
// });

// const uploadFiles = (file) => {
//   return new Promise((resolve, reject) => {
//     const storage = getStorage();
//     const auth = getAuth();
//     let uid = auth.currentUser.uid;
//     const storageRef = ref(storage, `users/${uid}.png`);
//     const uploadTask = uploadBytesResumable(storageRef, file);
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log("Upload is " + progress + "% done");
//         switch (snapshot.state) {
//           case "paused":
//             console.log("Upload is paused");
//             break;
//           case "running":
//             console.log("Upload is running");
//             break;
//         }
//       },
//       (error) => {
//         reject(error);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           resolve(downloadURL);
//         });
//       }
//     );
//   });
// };
