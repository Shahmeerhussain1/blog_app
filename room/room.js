// setTimeout(()=>{
//   let main_loader = document.getElementById("main_loader");
//   main_loader.style.display = "block";
// },2000)
// let main_loader = document.getElementById("main_loader");
// main_loader.style.display = "none";
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
  collection,
  query,
  where,
  getDocs,
  addDoc,
  getDoc,
  orderBy,
  onSnapshot,
  deleteDoc 
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
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

//currentuser



onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user;
    console.log(uid.email)
    let CurrentUser = document.getElementById("cuser");

    //getting c user

    const q = query(collection(db, "users"), where("email", "==", uid.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data().name)
      let user_info = document.getElementById("user_info");
      user_info.innerHTML = `
  <div id="flex_info">
  <img class="oqatmai" src="${doc.data().photo}" > 
  <table>
  <tr>
    <th> Name  :</th>
    <td>${doc.data().name}</td>
  </tr>
  <tr>
    <th>Email  :</th>
    <td> ${doc.data().email}</td>
  </tr>
</table>
  </div>
  `;
    });
    //richtext
    var quill = new Quill("#editor", {
      theme: "snow",
    });
    //getting current user info

    const docRef = doc(db, "users", uid.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      drawpost(docSnap.data().name, uid.uid ,docSnap.data().photo);
    }

    let submit = document.getElementById("submit");
    submit.addEventListener("click", async () => {
      let rich_text = quill.root.innerHTML;
      console.log(uid.uid);
      if (rich_text !== "<p><br></p>") {
        const docRef = await addDoc(collection(db, "Posts"), {
          postername: docSnap.data().name,
          timeStamp: new Date(),
          postitem: rich_text,
          posterimage: docSnap.data().photo
        });
        // lodar_for_editor.style.display = "none"
        window.location = "/room/posts.html";
      } else {
        alert("input something");
      }
      {
      }
    });
  }
});

//posts
// let countlike = 0

const drawpost = async (currentuser_name, uid ,cphoto) => {
  let main_loader = document.getElementById("main_loader");
  main_loader.style.display = "block";
  let zphoto = cphoto
  const querySnapshot = await getDocs(
    collection(db, "Posts"),
    orderBy("timeStamp", "Asc")
  );
  querySnapshot.forEach((doc) => {
    // console.log(doc.id);
    let possst = document.getElementById("post_flex");
    possst.innerHTML += `
       <div id="postss">
        <div id="post_main">
            <div id="profil">
                 <img class="cuserpostimg" src="${doc.data().posterimage}"><h5>${
                   doc.data().postername
                 }</h5>
            </div>
            <div id="user_added_post">
                <div id="flex_postofuser">
                <span>${doc.data().postitem}</span>
                </div>
            </div>
            <hr>
           <div id="like_cmt">
           <sapn><span id="liked_num"></span><i class="fa-solid  fa-thumbs-up size_mattter" onclick=" liked('${doc.id}','${uid}')" , "></i></sapn>
           <i class="fa-solid fa-comment size_mattter" onclick="down_info('${doc.id}','${currentuser_name}','${uid}')" id="comment_on_post"></i>
           <sapn><i  class="fa-solid fa-share size_mattter" onclick="disliked('${
             doc.id
           }','${uid}')"></i><span id="disliked_num" ></span></sapn>
          </div>
          <hr>
            <div id="comments_read">    
            <div class="comment_div"><img src="${zphoto}" id="cmnt_img"><input type="text" id="comment_input_material" class="input-flex" > <button class="cmnt_btn_flex" id="commet_submit" onclick="sendcoomment()">Submit</button></div>
                  </div>
                  <div id="comments_flex"></div>
                  </div>
          </div>
           </div> 
      `;
  });
  main_loader.style.display = "none";
};





                

//comment open
const down_info = async(id,currentuser_name,currentuseruid,userphoto) => {
  console.log( event.target.parentNode.parentNode.children)
    event.target.parentNode.parentNode.children[6].style.display = "block"
  event.target.parentNode.parentNode.children[5].style.display = "block"


   console.log()
    let coso = event.target.parentNode.parentNode.children[6]
  let comments_flex = document.getElementById("comments_flex")
const q = query(collection(db, "comments"), where("postid", "==", id));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  coso.innerHTML += `
  <div id="commet_showmain">
                 <div id="imgcmntimg"><img src="/images/8-512.webp" id="cmnt_img"></div>
                  <div id="cmnt_material"><h6>${doc.data().nameofcommentor}</h6>
                <p>${doc.data().comment}</p>
          </div> 
  `
});
 
  
///add comment

let idd = id
let currentuser_names = currentuser_name
  let currentuseruids = currentuseruid
  console.log(idd)
  
  let commet_submit = document.getElementById("commet_submit")
  if(commet_submit){
 
    const sendcoomment =async()=>{
    const docRef = await addDoc(collection(db, "comments"), {
      nameofcommentor: currentuser_names,
      comment: event.target.parentNode.children[1].value,
      postid :idd,
      commentoruid:currentuseruids,
      // userphoto:userphoto
    });
    let cmninp = document.getElementById("comment_input_material")  
    cmninp.value = ""
  }


window.sendcoomment = sendcoomment
// console.log(cmninp.innerHTML)
// event.target.parentNode.children[1].value.innerHTML = ""
}
};
window.down_info = down_info;







//singout
let signout = document.getElementById("Signout");
signout.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location = "/signup.html";
    })
    .catch((error) => {});
});





// getnumberlikes
// const getnumberlikes = async (uidofpost, uidmy) => {
//   console.log(event.target.parentNode.children[0] )


//   const q = query(collection(db, "likes"), where("postid", "==", uidofpost));
//   let countlike = [];
//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//     console.log(countlike.length);
//     let liked_num = document.getElementById("liked_num");
//     // event.target.parentNode.children[0].innerHTML = countlike.length
//   });
  
// }


//like or dislike

const liked = async (uidofpost, uidmy) => {
  // console.log(event.target)

  var z = event.target.parentNode.children[0]
  
  // console.log(event.target.parentNode.children[0].innerHTML)
  if( event.target.style.color == "rgb(49, 71, 105)"){
    event.target.style.color = "gray";
    await deleteDoc(doc(db, "likes", "DC"));
    // alert("hi")
  }
  else{
    event.target.style.color = "#314769";
    const docRef = await addDoc(collection(db, "likes"), {
      postid: uidofpost,
      likerid: uidmy,
    });
  }
  
  const ivenum = async(ids)=>{
    const q = query(collection(db, "likes"), where("postid", "==", ids));
    let countlike = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      countlike.push(doc.data().likerid)
      console.log(doc.data().likerid);
      let liked_num = document.getElementById("liked_num");
      z.innerHTML = countlike.length
      // event.target.parentNode.children[0].innerHTML = countlike.length
    });
  }
 

  ivenum(uidofpost)


 
};

window.liked = liked;
// window.getnumberlikes = getnumberlikes
