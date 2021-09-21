import { PostList } from "./PostList.js";
import { deletePost, getPosts, getSinglePost, logoutUser, setLoggedInUser, showEdit, loginUser, registerUser, getLoggedInUser } from "./DataManager.js"
import { createPost } from "./DataManager.js"
import { usePostCollection } from "./DataManager.js";
import { newPost } from "./newPost.js";
import { updatePost } from "./DataManager.js";
import { LoginForm, RegisterForm } from "./auth/authorization.js";


//initial querySelector for page
const applicationElement = document.querySelector(".daily-journal");

//Event Listener for submit button
applicationElement.addEventListener("click", event => {
	
	if (event.target.id === "submitButton") {
		//collect the input values into an object to post to the DB
		const concepts = document.querySelector("input[name='conceptCover']").value
		const description = document.querySelector("textarea[name='journalEntry']").value
        const mood = document.querySelector("select[name='selectMood']").value;
		//we have not created a user yet - for now, we will hard code `1`.
		//we can add the current time as well
		const postObject = {
            userId: getLoggedInUser().id,
            name: getLoggedInUser().name,
            concepts: concepts,
            date: Date.now(),
            journalEntry: description,
            moodId: mood
		}

        //Create Post call to add post to json
        createPost(postObject).then(Response => showPostList());
        document.querySelector("input[name='conceptCover']").value = "";
		document.querySelector("textarea[name='journalEntry']").value = "";
        
	}
})

//Event Listener for filter button
applicationElement.addEventListener("click", event => {
    if(event.target.id === "filterButton"){
        const mood = document.querySelector("select[name='filterMood']").value;
        showFilteredPosts(mood);

    }
})

const showFilteredPosts = (mood) => {
    const isMood = mood;
    //filter the data
    const filteredData = usePostCollection().filter(singlePost => {
      if(singlePost.moodId === isMood){
          return singlePost;
      }
    })
    const postElement = document.querySelector(".entryLog");
    postElement.innerHTML = PostList(filteredData);
  }

  //reset filter button
applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id == "resetButton"){
        showPostList();
    }
})

//edit post button
applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("editButton")){
        const postId = event.target.id.split("--")[1];
        getSinglePost(postId)
        .then(response => {
            showEdit(response);
            window.scrollTo(0,0);
        })
    }
})

//delete post button
applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("deleteButton")){
        const postId = event.target.id.split("--")[1];
        deletePost(postId)
        .then(response => {
            showPostList();
            showNewPost();
        })
    }
})

//update button 
applicationElement.addEventListener("click", event => {
    if (event.target.id.startsWith("updateButton")){
            const postId = event.target.id.split("--")[1];
            //collect all the details into an object
            const concepts = document.querySelector("input[name='conceptCover']").value
            const journalEntry = document.querySelector("textarea[name='journalEntry']").value
            const mood = document.querySelector("select[name='selectMood']").value;
            
            const postObject = {
                id: postId,
                userId: 1,
                name: getLoggedInUser().name,
                concepts: concepts,
                date: Date.now(),
                journalEntry: journalEntry,
                moodId: mood
            }
            
            updatePost(postObject)
              .then(response => {
                showPostList();
                showNewPost();
              })
          
    }   
})

//cancel button
applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id == "cancelButton"){
        showNewPost();
    }
})

//logoutButton
applicationElement.addEventListener("click", event => {
    if (event.target.id == "logoutButton"){
    event.preventDefault();
    logoutUser();
    sessionStorage.clear();
    checkForUser();
    const postElement = document.querySelector(".entryLog");
    const dropdownElement = document.querySelector(".buttonWithLog");
    dropdownElement.style.display = "none"
    postElement.innerHTML = "";
    }
})

//check for loggedIn
const checkForUser = () => {
    if (sessionStorage.getItem("user")){
      //this is expecting an object. Need to fix
        setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
        console.log(sessionStorage.getItem("user"));
        showAll();
    }else {
      //show login/register
      showLoginRegister();
      const dropdownElement = document.querySelector(".buttonWithLog");
      dropdownElement.style.display = "none"
    }
  }

  const showLoginRegister = () => {
    const entryElement = document.querySelector(".contentMain");
    //template strings can be used here too
    entryElement.innerHTML = `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
}

//login button
applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id === "login__submit") {
      //collect all the details into an object
      const userObject = {
        name: document.querySelector("input[name='name']").value,
        email: document.querySelector("input[name='email']").value,
        dateJoined: Date.now()
      }
      console.log(userObject);
      loginUser(userObject)
      .then(dbUserObj => {
        if(dbUserObj){
          sessionStorage.setItem("user", JSON.stringify(dbUserObj));
          showAll();
        }else {
          //got a false value - no user
          const entryElement = document.querySelector(".contentMain");
          entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
        }
      })
    }
  })

  applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id === "register__submit") {
      //collect all the details into an object
      const userObject = {
        name: document.querySelector("input[name='registerName']").value,
        email: document.querySelector("input[name='registerEmail']").value,
        dateJoined: Date.now()
      }
      registerUser(userObject)
      .then(dbUserObj => {
        sessionStorage.setItem("user", JSON.stringify(dbUserObj));
        showAll();
      })
    }
  })

//Showing Post list  
const showPostList = () => {
        //Get a reference to the location on the DOM where the list will display
        const postElement = document.querySelector(".entryLog");
        getPosts().then((allPosts) => {
            postElement.innerHTML = PostList(allPosts);
        })
        const dropdownElement = document.querySelector(".buttonWithLog");
        dropdownElement.style.display = "block"
    }

const showNewPost = () => {
    const post = document.querySelector(".contentMain")
    post.innerHTML = newPost();
}

const showAll = () => {
    showPostList();
    showNewPost();
}

checkForUser();