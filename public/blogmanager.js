async function getBlogs() {
  const url = 'https://raw.githubusercontent.com/BrendenDev/Personal-Blog-Site/tree/master/blogs'
  const response = await fetch(url);
  //const data = await response.text();
  console.log(response);
}

window.onload = function() {
    var posts = document.querySelector(".posts").querySelectorAll("a");
    for(let i = 0; i < posts.length; i++) {
        posts[i].innerHTML = "Post" + (i+1); //change this to title of document
    }
    getBlogs().catch(error => console.log(error)); 
    
    //content(fileID(listFiles()));
}

