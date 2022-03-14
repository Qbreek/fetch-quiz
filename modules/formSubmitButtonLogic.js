import createPostElementCard from "./createPostElementCard.js";

// Submit post button logic
export default function formSubmitButtonLogic() {
    
    const titleInput = document.querySelector('input[name="title"]');
    const bodyInput = document.querySelector('textarea[name="body"]');
   
    const postObject = {
        title: titleInput.value,
        body: bodyInput.value,
        userId: Number(sessionStorage.getItem('userId'))
    };

    if (titleInput.value != '' && bodyInput.value != '') {
        
        createPost(postObject);
        titleInput.value = '';
        bodyInput.value = '';
        alert('Check console');

    } else {
        
        alert('Please fill out all the input fields');
    }
}

// Pseudo POST method
async function createPost(postObject) {
    
    const settings = {
        method: 'POST',
        body: JSON.stringify(postObject),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
    };

    try {

        const response = await fetch('https://jsonplaceholder.typicode.com/posts', settings);
        
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        console.log(response);
        const json = await response.json();
        console.log(json);

        const postHistoryView = document.querySelector('.post-history-list');
        const postCardElement = createPostElementCard(postObject);
        postHistoryView.prepend(postCardElement);

    } catch(error) {

        console.error(`Couldn't create new post: ${error}`);
    }
}

