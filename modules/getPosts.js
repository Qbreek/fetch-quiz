import createPostHistory from "./createPostHistory.js";

// Fetches users post history from the provided url argument using the value stored in session storage.
export default async function getPosts(url) {
   
    const postData = await fetch(url);
    let posts = await postData.json();
    posts = [...posts];
    const userId = Number(sessionStorage.getItem('userId'));
    const currentUserPosts = posts.filter(post => post.userId === userId);
    createPostHistory(currentUserPosts);
}
