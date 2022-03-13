// Creates post card HTML element and appends it to view.
export default function createPostElementCard(postInfo) {
    
    const postItemCard = document.createElement('li');
    postItemCard.classList.add('post-item-card');
    postItemCard.id = `${postInfo.id}`;
    
    const postIdSecure = postInfo.id;   // Prevents user from changing the HTML id and then sending a Delete request

    const saveUndoBtnContainer = document.createElement('div');
    saveUndoBtnContainer.classList.add('save-undo-btns');

    const saveChangesBtn = document.createElement('button');
    saveChangesBtn.classList.add('post-card-btn');

    saveChangesBtn.addEventListener('click', () => {
        const title = document.createElement('h2');
        const newTitle = document.querySelector('.new-title-input-post-item-card').value;
        title.textContent = newTitle;

        console.log(title);


        const titleAndButtonsContainer = document.createElement('div');
        titleAndButtonsContainer.classList.add('title-and-buttons-container');
        
        titleAndButtonsContainer.append(title, buttonsContainer);

        const body = document.createElement('p');
        body.textContent = postInfo.body;
    })
    
    const discardChangesBtn = document.createElement('button');
    discardChangesBtn.classList.add('post-card-btn');

    saveChangesBtn.textContent = 'Save';
    discardChangesBtn.textContent = 'Undo';

    saveUndoBtnContainer.append(saveChangesBtn, discardChangesBtn);

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container-postcard');
    
    const editBtn = document.createElement('button');
    editBtn.classList.add('post-card-btn');
    editBtn.textContent = 'Edit';

    editBtn.addEventListener('click', () => {
        
        editBtn.disabled = true;
        editBtn.style.background = '#f7b633';
        
        let titleText = postInfo.title;
        let bodyText = postInfo.body;

        titleAndButtonsContainer.removeChild(title);
        postItemCard.removeChild(body);

        const newTitleInput = document.createElement('input');
        newTitleInput.classList.add('new-title-input-post-item-card');
        newTitleInput.setAttribute('type', 'text');
        newTitleInput.value = titleText;
        
        const newBodyInput = document.createElement('textarea');
        newBodyInput.classList.add('new-body-textarea-post-item-card');
        newBodyInput.textContent = bodyText;
        titleAndButtonsContainer.prepend(newTitleInput);
        postItemCard.append(newBodyInput);
        postItemCard.append(saveUndoBtnContainer)
    })

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('post-card-btn');
    deleteBtn.textContent = 'Del';

    // perform pseudo delete
    deleteBtn.addEventListener('click', () => {

        const postHistoryView = document.querySelector('.post-history-list');
        postHistoryView.removeChild(postItemCard);

        fetch(`https://jsonplaceholder.typicode.com/posts/${postIdSecure}`, {
        method: 'DELETE',
        })
        .then (response => console.log(response))
        .then (console.log('See line 49 at userProfile.js'))
        .then (alert('Check console!'))
    })

    buttonsContainer.append(editBtn, deleteBtn);
    
    const title = document.createElement('h2');
    title.textContent = postInfo.title;

    const titleAndButtonsContainer = document.createElement('div');
    titleAndButtonsContainer.classList.add('title-and-buttons-container');
    
    titleAndButtonsContainer.append(title, buttonsContainer);

    const body = document.createElement('p');
    body.textContent = postInfo.body;

    postItemCard.append(titleAndButtonsContainer, body);

    
    return postItemCard;
}

