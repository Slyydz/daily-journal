import { PostList } from "./PostList.js";
import { deletePost, getPosts, getSinglePost, showEdit } from "./DataManager.js"
import { createPost } from "./DataManager.js"
import { usePostCollection } from "./DataManager.js";
import { newPost } from "./newPost.js";
import { updatePost } from "./DataManager.js";


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
            userId: 1,
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

//Showing Post list  
const showPostList = () => {
        //Get a reference to the location on the DOM where the list will display
        const postElement = document.querySelector(".entryLog");
        getPosts().then((allPosts) => {
            postElement.innerHTML = PostList(allPosts);
        })
    }

const showNewPost = () => {
    const post = document.querySelector(".contentMain")
    post.innerHTML = newPost();
}

//call
showPostList();
