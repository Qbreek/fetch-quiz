function createPostElementCard(userPostHistory) {
    const postHistoryView = document.querySelector('.post-history-list');
    
    userPostHistory.forEach(post => {
        const postCardItem = document.createElement('li');
        postCardItem.classList.add('post-item-card');
    
        const title = document.createElement('h2');
        title.textContent = post.title;
    
        const body = document.createElement('p');
        body.textContent = post.body;

        postCardItem.append(title, body);
        
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
    createPostElementCard(userPosts)
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
    const userInfoContainer = document.querySelector('.user-full-profile-card');

    const profileSvg = document.createElement('embed');
    profileSvg.src = '/svg/account_circle_black_48dp.svg';

    const fullname = document.createElement('h2');
    fullname.textContent = userData[0].name;

    const username = document.createElement('h3');
    username.textContent = `@${userData[0].username}`;

    const email = document.createElement('h5');
    email.textContent = userData[0].email;

    const phone = document.createElement('h5');
    phone.textContent = userData[0].phone;

    const website = document.createElement('a');
    website.href = '';
    website.textContent = `www.${userData[0].website}`;

    userInfoContainer.append(profileSvg, fullname, username, email, phone, website);
}