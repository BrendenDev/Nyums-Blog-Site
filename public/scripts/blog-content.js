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
    document.getElementById('blog-title').innerHTML = localStorage.getItem('openedPage');
    let blogDate = localStorage.getItem('openedPageDate');
    //console.log(localStorage.getItem('openedPageDate'));
    //need to fix this - purpose is to make string from date int, so it can find the specific blog in the database
    const date = blogDate.toString().substring(0,4) + "-" + blogDate.toString().substring(4, 6) + "-" + blogDate.toString().substring(6,8);
    setPage(date);
};

async function setPage(date) {
    const reference = ref(db, 'blogs/' + date + '/');
    onValue(reference, (snapshot) => {
      document.getElementById("blog-author").innerHTML = snapshot.child("author").val();
      snapshot.child("content").forEach((ss) => {
        const paragraph = document.querySelector(".blog-body").appendChild(document.createElement('p'));
        paragraph.textContent = ss.val(); 
      });
    }, {
      onlyOnce: true
    });
}
