import { PostList } from "./PostList.js";
import { getPosts } from "./DataManager.js"
import { createPost } from "./DataManager.js"



const applicationElement = document.querySelector(".daily-journal");

applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "submitButton") {
		//collect the input values into an object to post to the DB
		const concepts = document.querySelector("input[name='conceptCovered']").value
		const description = document.querySelector("textarea[name='journalEntry']").value
		//we have not created a user yet - for now, we will hard code `1`.
		//we can add the current time as well
		const postObject = {
            userId: 1,
            concepts: concepts,
            date: Date.now(),
            journalEntry: description,
            moodID: 3
		}

		// be sure to import from the DataManager
		createPost(postObject);
        window.location.reload();
	}
})


const showPostList = () => {
        //Get a reference to the location on the DOM where the list will display
        const postElement = document.querySelector(".entryLog");
        getPosts().then((allPosts) => {
            postElement.innerHTML = PostList(allPosts);
        })
    }

showPostList();
