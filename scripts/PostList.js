import { Post } from "./Post.js";

//PostList for output simplification
export const PostList = (allPosts) => {
	let postHTML = "";
		//Loop over the array of posts and for each one, invoke the Post component which returns HTML representation
		for (const postObject of allPosts) {
			
			postHTML += Post(postObject)
		}
		return postHTML;
	
}