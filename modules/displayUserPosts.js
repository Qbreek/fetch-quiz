import createPostElementCard from "./createPostElementCard.js";

// Fetches users post history from the provided url argument using the value stored in session storage.
export default async function displayUserPosts(url) {
   
    const postData = await fetch(url);
    let posts = await postData.json();
    posts = [...posts];
    const userId = Number(sessionStorage.getItem('userId'));
    const currentUserPosts = posts.filter(post => post.userId === userId);
    createPostHistory(currentUserPosts);
}

// Appends current user's post history to the view.
function createPostHistory(userPostHistory) {
    
    const postHistoryView = document.querySelector('.post-history-list');

    userPostHistory.forEach(post => {
        const postCardElemet = createPostElementCard(post);
        postHistoryView.append(postCardElemet);
    });
}

