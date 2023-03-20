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
  var posts = document.querySelector(".posts").querySelectorAll("a");
  for(let i = 0; i < posts.length; i++) {
      posts[i].innerHTML = "Post" + (i+1); //change this to title of document
  }
  setBlogs(posts);
}

async function setBlogs(posts) {
  const reference = ref(db, 'blogs/'); 

  onValue(reference, (snapshot) => {
    let tempMap = new Map(); 
    snapshot.forEach((ss) => {
      tempMap.set(parseInt(ss.key.replaceAll("-","")), ss.child("title").val());
    });
    const blogs = new Map([...tempMap.entries()].sort().reverse());
    for(let i = 0; i < blogs.size; i++) {
      posts[i].innerHTML = blogs.get(Array.from(blogs.keys())[i]);
    }
  }, {
    onlyOnce: true
  });
}