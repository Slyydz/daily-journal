import { PostList } from "./PostList.js";
import { getPosts } from "./DataManager.js"
import { createPost } from "./DataManager.js"
import { usePostCollection } from "./DataManager.js";


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
console.log(usePostCollection());

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

//Showing Post list  
const showPostList = () => {
        //Get a reference to the location on the DOM where the list will display
        const postElement = document.querySelector(".entryLog");
        getPosts().then((allPosts) => {
            postElement.innerHTML = PostList(allPosts);
        })
    }

//call
showPostList();
