// Fetches data from the provided url argument.
async function getUsers(url) {
    const fetchData = await fetch(url);
    const dataSet = await fetchData.json();
    dataSet.forEach(data => {
        createUserElement(data);
    });
}

getUsers('https://jsonplaceholder.typicode.com/users');

// Creates the user card and appends it to the view.
function createUserElement(userData) {
    const dataView = document.querySelector('.user-view');
    
    const userCard = document.createElement('li');
    const userInfoContainer = document.createElement('div');
    userInfoContainer.classList.add('user-info-wrapper');
    
    const userName = document.createElement('h1');
    userName.textContent = userData.username;

    const userRealName = document.createElement('h2');
    userRealName.textContent = userData.name;

    const userEmail = document.createElement('h3');
    userEmail.textContent = userData.email;
    
    userInfoContainer.append(userName, userRealName, userEmail);

    // See selected users post history.
    const seePostsAnchor = document.createElement('a');
    seePostsAnchor.href = './views/userprofile.html';
    seePostsAnchor.textContent = 'See posts';
   
    seePostsAnchor.addEventListener('click', () => {
        sessionStorage.setItem('user', `${userData.username}`);
    })
    userCard.append(userInfoContainer,seePostsAnchor);
    dataView.append(userCard);
}


