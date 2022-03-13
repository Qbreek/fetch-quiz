// Fetches users post history from the provided url argument using the value stored in session storage.
async function getPosts(url) {
   
    const postData = await fetch(url);
    let posts = await postData.json();
    posts = [...posts];
    const userId = Number(sessionStorage.getItem('userId'));
    const userPosts = posts.filter(post => post.userId === userId);
    createPostElementCard(userPosts);
}

// Fetches user information based on the value stored in session storage.
async function getUserInformation(url) {
    
    const userData = await fetch(url);
    let users = await userData.json();
    users = [...users];
    const userId = Number(sessionStorage.getItem('userId'));
    const userProfile = users.filter(user => user.id === userId);
    createFullUserProfileElement(userProfile);
}

// Creates all the post-card elements and appends them to post history.
function createPostElementCard(userPostHistory) {
    
    const postHistoryView = document.querySelector('.post-history-list');
    
    userPostHistory.forEach(post => {
        const postItemCard = document.createElement('li');
        postItemCard.classList.add('post-item-card');
        postItemCard.id = `${post.id}`;

        const titleAndButtonContainer = document.createElement('div');
        titleAndButtonContainer.classList.add('title-and-buttons-container');

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container-postcard');
        
        const title = document.createElement('h2');
        title.textContent = post.title;
        
        const editBtn = document.createElement('button');
        editBtn.classList.add('post-card-btn');

        const embedEditSvg = document.createElement('embed');
        embedEditSvg.src = '/svg/edit_black_24dp.svg';

        editBtn.append(embedEditSvg);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('post-card-btn');

        deleteBtn.addEventListener('click', () => {

            fetch(`https://jsonplaceholder.typicode.com/posts/${postItemCard.id}`, {
            method: 'DELETE',
            })
            .then (response => console.log(response));

        })

        const embedDeleteSvg = document.createElement('embed');
        embedDeleteSvg.classList.add()
        embedDeleteSvg.src = '/svg/delete_black_24dp.svg';

        deleteBtn.append(embedDeleteSvg);

        buttonsContainer.append(editBtn, deleteBtn);

        titleAndButtonContainer.append(title, buttonsContainer);
    
        const body = document.createElement('p');
        body.textContent = post.body;

        postItemCard.append(titleAndButtonContainer, body);
        
        postHistoryView.append(postItemCard);
    })
}

// Creates full user profile using session storage value.
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


function main() {
    getUserInformation('https://jsonplaceholder.typicode.com/users');
    getPosts('https://jsonplaceholder.typicode.com/posts');

    const pseudoSubmitBtn = document.querySelector('.pseudo-submit');
    
    // Simulates submit procedure? Maybe im wrong here
    pseudoSubmitBtn.addEventListener('click', () => {
       
        const titleInput = document.querySelector('input[name="title"]');
        const bodyInput = document.querySelector('textarea[name="body"]');
       
        const postObject = {
            title: titleInput.value,
            body: bodyInput.value,
            userId: Number(sessionStorage.getItem('userId'))
        };

        if (titleInput.value != '' && bodyInput.value != '') {
            
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify(postObject),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .then(() => alert('Check Console'))

            title.value = '';
            bodyInput.value = '';
       
        } else {
            
            alert('Please fill out all the input fields');
        }
    });
}

main();