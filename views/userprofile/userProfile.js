function createPostHistoryView(userPostHistory) {
    const postHistoryView = document.querySelector('.post-history');
    
    userPostHistory.forEach(post => {
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
    createFullUserProfileElement(userProfile);
    console.table(userProfile);
}

getUserInformation('https://jsonplaceholder.typicode.com/users')

getPosts('https://jsonplaceholder.typicode.com/posts')

function createFullUserProfileElement(userData) {
    const userInfoContainer = document.querySelector('.user-info-container');

    const fullname = document.createElement('h2');
    fullname.textContent = userData[0].name;

    const username = document.createElement('h3');
    username.textContent = `@${userData[0].username}`;

    const email = document.createElement('h4');
    email.textContent = userData[0].email;

    const phone = document.createElement('h4');
    phone.textContent = userData[0].phone;

    const website = document.createElement('a');
    website.href = '';
    website.textContent = `www.${userData[0].website}`;


    userInfoContainer.append(fullname, username, email, phone, website);

}