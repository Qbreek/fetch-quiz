function createPostHistoryView(userPostHistory) {
    userPostHistory.forEach(post => {
        const postHistoryView = document.querySelector('.post-history');
        const postCardItem = document.createElement('li');

        const postInfoContainer = document.createElement('div');
        postInfoContainer.classList.add('post-item');
    
        const title = document.createElement('h2');
        title.textContent = post.title;
    
        const body = document.createElement('p');
        body.textContent = post.body;

        postInfoContainer.append(title, body);
        postCardItem.append(postInfoContainer);
        
        postHistoryView.append(postCardItem);
    })
}

// Fetches data from the provided url argument.
async function getPosts(url) {
    const postData = await fetch(url);
    let posts = await postData.json();
    posts = [...posts];
    const userId = Number(sessionStorage.getItem('userId'));
    const userPosts = posts.filter(post => post.userId === userId);
    createPostHistoryView(userPosts)
}

async function getUserInformation(url) {
    const userData = await fetch(url);
    let users = await userData.json();
    users = [...users];
    const userId = Number(sessionStorage.getItem('userId'));
    const userProfile = users.filter(user => user.id === userId);
    console.log(userProfile);

}

getUserInformation('https://jsonplaceholder.typicode.com/users')

getPosts('https://jsonplaceholder.typicode.com/posts');