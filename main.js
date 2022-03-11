// Fetches data from the provided url argument.
async function getData(url) {
    const fetchData = await fetch(url);
    const dataSet = await fetchData.json();
    dataSet.forEach(data => {
        createUserElement(data);
        
    });
}

getData('https://jsonplaceholder.typicode.com/users');

// Creates the user card and appends it to the view.
function createUserElement(userData) {
    const dataView = document.querySelector('.data-view');
    
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
    const seePostsBtn = document.createElement('button');
    seePostsBtn.type = 'button';
    seePostsBtn.textContent = 'See posts';
   
    seePostsBtn.addEventListener('click', async () => {
        clearView(dataView);
        const fetchData = await fetch ('https://jsonplaceholder.typicode.com/posts');
        let dataSet = await fetchData.json();
        dataSet = [...dataSet];
        const userPosts = dataSet.filter(posts => posts.userId === userData.id);
        console.log(userPosts);
        createPostHistoryView(userPosts, userData.username);

    })
    userCard.append(userInfoContainer,seePostsBtn);
    dataView.append(userCard);
}

function clearView(view) {
    view.innerHTML = '';
}

function createPostHistoryView(userPostHistory, userName) {
    userPostHistory.forEach(post => {
        const dataView = document.querySelector('.data-view');
    
        const username = document.createElement('h3');
        username.textContent = userName;
    
        const title = document.createElement('h2');
        title.textContent = post.title;
    
        const body = document.createElement('p');
        body.textContent = post.body;
        
        dataView.append(username, title, body);
    })
}