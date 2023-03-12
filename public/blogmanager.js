// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXdXIBrN8bUH0OmpoQeysNBFADTZS6YWs",
  authDomain: "nyumsdevblog.firebaseapp.com",
  databaseURL: "https://nyumsdevblog-default-rtdb.firebaseio.com",
  projectId: "nyumsdevblog",
  storageBucket: "nyumsdevblog.appspot.com",
  messagingSenderId: "61417910096",
  appId: "1:61417910096:web:f530c076f57aeb0f67c655",
  measurementId: "G-4RFXV05ZVH"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.onload = function() {
  readBlogData().then((response) => {
    console.log(response);
  });
  var posts = document.querySelector(".posts").querySelectorAll("a");
  for(let i = 0; i < posts.length; i++) {
      posts[i].innerHTML = "Post" + (i+1); //change this to title of document
  }
}

async function readBlogData() {
  const reference = ref(db, 'blogs/'); 
  const data = new Map(); 
  let blogCount = -1; 

  onValue(reference, (snapshot) => {
    snapshot.forEach((ss) => {
      let tempMap = new Map(); 
      blogCount++; 
      ss.forEach((s) => { 
        if(s.key == "author") {
          tempMap.set("author", s.val());
        }
        else if(s.key == "content") {
          tempMap.set("content", s.val());
        }
      })
      data.set(ss.key, tempMap);
    });
  }, {
    onlyOnce: true
  });

  return data; 
}