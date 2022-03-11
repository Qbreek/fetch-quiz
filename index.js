// Fetches data from the provided url argument.
async function getUsers(url) {
    const userData = await fetch(url);
    const users = await userData.json();
    users.forEach(user => {
        createUserProfileCardElement(user);
    });
}

// Creates the user profile card and appends it to the view.
function createUserProfileCardElement(userData) {
    const userList = document.querySelector('.user-profile-list');
    
    const userCard = document.createElement('li');
    userCard.classList.add('user-profile-card');

    const embedProfileSvg = document.createElement('embed');
    embedProfileSvg.src = 'account_circle_black_36dp.svg'

    userCard.append(embedProfileSvg)

    const userInfoContainer = document.createElement('div');
    userInfoContainer.classList.add('user-info-wrapper');
    
    const userName = document.createElement('h3');
    userName.textContent = userData.username;
    
    const userRealName = document.createElement('h5');
    userRealName.textContent = userData.name;

    userInfoContainer.append(userName, userRealName);

    // See selected users post history.
    const seePostsAnchor = document.createElement('a');
    seePostsAnchor.href = './views/userprofile/userprofile.html';
    seePostsAnchor.textContent = 'See profile';
    
    seePostsAnchor.addEventListener('click', async () => {
        sessionStorage.setItem('userId', `${userData.id}`);
    })
    userCard.append(userInfoContainer,seePostsAnchor);
    userList.append(userCard);
}

getUsers('https://jsonplaceholder.typicode.com/users');

