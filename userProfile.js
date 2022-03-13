import displayUserPosts from './modules/displayUserPosts.js'
import createPostElementCard from './modules/createPostElementCard.js';
import displayUserInformation from './modules/displayUserInformation.js';

function userProfile() {
    
    displayUserInformation('https://jsonplaceholder.typicode.com/users');
    displayUserPosts('https://jsonplaceholder.typicode.com/posts');

    const pseudoSubmitBtn = document.querySelector('.post-card-btn');
    
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
            
            const postHistoryView = document.querySelector('.post-history-list');
            const postCardElement = createPostElementCard(postObject);

            postHistoryView.prepend(postCardElement);

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

userProfile();