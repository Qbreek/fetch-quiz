function createPostHistoryView(userPostHistory, userName) {
    userPostHistory.forEach(post => {
        const dataView = document.querySelector('.user-view');
        const postCardItem = document.createElement('li');

        const postInfoContainer = document.createElement('div');
        postInfoContainer.classList.add('post-item');
    
        const username = document.createElement('h3');
        username.textContent = userName;
    
        const title = document.createElement('h2');
        title.textContent = post.title;
    
        const body = document.createElement('p');
        body.textContent = post.body;

        postInfoContainer.append(username, title, body);
        postCardItem.append(postInfoContainer);
        
        dataView.append(postCardItem);
    })
}

function main() {
    const username = sessionStorage.getItem('user')
    console.log(username);
}

main();