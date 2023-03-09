// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

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

function readData() {
  const reference = ref(db, 'blogs/');
  
  get(reference).then((response) => {
    if(response.exists()) {
      console.log(response.val());
    } else {
      console.log("No data available");
    }
  }).catch((error)=> {
    console.log(error);
  });
}

window.onload = function() {
  readData(); 
}

