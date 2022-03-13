import getPosts from './modules/getPosts.js'
import getUserInformation from './modules/getUserInformation.js';
    

function main() {
    
    getUserInformation('https://jsonplaceholder.typicode.com/users');
    getPosts('https://jsonplaceholder.typicode.com/posts');

    const pseudoSubmitBtn = document.querySelector('.post-card-btn');
    
    // Simulates submit procedure? Maybe im wrong here
    pseudoSubmitBtn.addEventListener('click', () => {
       
        const titleInput = document.querySelector('input[name="title"]');
        const bodyInput = document.querySelector('textarea[name="body"]');
       
        const postObject = {
            userId: Number(sessionStorage.getItem('userId')),
            id: 101,    // fixed , since there are 100 posts
            title: titleInput.value,
            body: bodyInput.value
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

main();