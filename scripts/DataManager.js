
//Filtering portion
let postCollection = [];

export const usePostCollection = () => {
  //Best practice: we don't want to alter the original state, so
  //make a copy of it and then return it
  //The spread operator makes this quick work
  return [...postCollection];
}
//Initial Fetch 
export const getPosts = () => {
    return fetch("http://localhost:8088/posts")
    .then(response => response.json())
    .then(parsedResponse => {
        postCollection = parsedResponse;
        return parsedResponse;
    })
}

//Create Post Fetch
export const createPost = postObj => {
    return fetch("http://localhost:8088/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj)
  
    })
        .then(response => response.json())
  }