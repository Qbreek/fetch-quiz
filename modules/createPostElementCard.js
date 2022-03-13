export default function createPostElementCard(postInfo) {

    const postIdSecure = postInfo.id;   // Used as a pointer for requesting a patch on the post
    
    // Create the post card item which holds all the post info
    const postItemCard = document.createElement('li');
    postItemCard.classList.add('post-item-card');

    // Create containers for post card elements
    const titleAndVisibleBtnContainer = document.createElement('div');
    titleAndVisibleBtnContainer.classList.add('title-and-visible-buttons-container');

    const hiddenBtnContainer = document.createElement('div');
    hiddenBtnContainer.classList.add('hidden-btn-container');

    const editDeleteBtnContainer = document.createElement('div');
    editDeleteBtnContainer.classList.add('buttons-container-postcard');

    // Create elements of post card item 
    let title = document.createElement('h2');
    title.textContent = postInfo.title;
    
    let body = document.createElement('p');
    body.textContent = postInfo.body;

    const [saveBtn, editBtn, undoBtn, deleteBtn] = createPostCardButtons('Save', 'Edit', 'Undo', 'Del');

    // Used for undo and save buttons
    let previousTitle = title.textContent;
    let previousBody = body.textContent;

    // These remain hidden until the user presses the edit button.
    const newTitleInput = document.createElement('input');
    newTitleInput.classList.add('new-title-input-post-item-card');
    newTitleInput.setAttribute('type', 'text');
    newTitleInput.value = title.textContent;

    const newBodyTextarea = document.createElement('textarea');
    newBodyTextarea.classList.add('new-body-textarea-post-item-card');
    newBodyTextarea.textContent = body.textContent;

    // Add functionality to button elements
    editBtn.addEventListener('click', () => {
        
        editBtn.disabled = true;
        editBtn.style.background = '#f7b633';
        hiddenBtnContainer.style.display = 'flex';
        
        titleAndVisibleBtnContainer.replaceChild(newTitleInput, title);
        postItemCard.replaceChild(newBodyTextarea, body);
    })
    
    // perform pseudo delete
    deleteBtn.addEventListener('click', () => {

        document.querySelector('.post-history-list').removeChild(postItemCard);

        fetch(`https://jsonplaceholder.typicode.com/posts/${postIdSecure}`, {method: 'DELETE'})
        .then(response => console.log(response))
        .then(console.log('See line 55 at createPostElementCard.js'))
        .then(alert('Check console'));
    })

    // perform pseudo patch
    saveBtn.addEventListener('click', () => {

        editBtn.disabled = false;
        editBtn.style.background = 'white';
        hiddenBtnContainer.style.display = 'none';

        title.textContent = newTitleInput.value;        
        body.textContent = newBodyTextarea.value;
        titleAndVisibleBtnContainer.replaceChild(title, newTitleInput);
        postItemCard.replaceChild(body, newBodyTextarea);

        const updateObject = {
            title: title.textContent,
            body: body.textContent
        }

        if (previousTitle != title.textContent || previousBody != body.textContent ) {

            previousTitle = title.textContent;
            previousBody = body.textContent;

            fetch(`https://jsonplaceholder.typicode.com/posts/${postIdSecure}`, {
                method: 'PATCH',
                body: JSON.stringify(updateObject),
                headers: {'Content-type': 'application/json; charset=UTF-8'},
                })
            .then((response) => console.log(response))
            .then(console.log('See line 66 at CreatePostElementCard.js'))
            .then(alert('Check console'));
        }
    })

    undoBtn.addEventListener('click', () => {
        
        editBtn.disabled = false;
        editBtn.style.background = 'white';
        hiddenBtnContainer.style.display = 'none';

        newTitleInput.value = previousTitle;        
        newBodyTextarea.value = previousBody;
        
        titleAndVisibleBtnContainer.replaceChild(title, newTitleInput);
        postItemCard.replaceChild(body, newBodyTextarea);
    })
    
    editDeleteBtnContainer.append(editBtn, deleteBtn);
    titleAndVisibleBtnContainer.append(title,editDeleteBtnContainer);
    hiddenBtnContainer.append(saveBtn, undoBtn);
    postItemCard.append(titleAndVisibleBtnContainer, body, hiddenBtnContainer);
    
    return postItemCard;
}

function createPostCardButtons (...names) {
    
    let buttons = [];
    names.forEach(name => {
        const button = document.createElement('button');
        button.classList.add('post-card-btn');
        button.textContent = name;
        buttons.push(button);
    })
    return buttons;
}