import createPostElementCard from "./createPostElementCard.js";

// Fetches users post history from the provided url argument using the value stored in session storage.
export default async function displayUserPosts(url) {
   
    try {

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        console.log(response);
        let posts = await response.json();
        posts = [...posts];
        const userId = Number(sessionStorage.getItem('userId'));
        const currentUserPosts = posts.filter(post => post.userId === userId);
        createPostHistory(currentUserPosts);
    
    }catch(error) {

        console.error(`Could not get user posts: ${error}`)
    }
}

// Appends current user's post history to the view.
function createPostHistory(userPostHistory) {
    
    const postHistoryView = document.querySelector('.post-history-list');

    userPostHistory.forEach(post => {
        const postCardElemet = createPostElementCard(post);
        postHistoryView.append(postCardElemet);
    });
}

