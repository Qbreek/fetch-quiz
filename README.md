# Fetch API Quiz 2021-2022 Class of October 2021 Junior Front-End Developer

My solution for the Fetch API quiz.

## 1. Fetch the users

Instead of loging only the first 5 in the console I present all the users into the view.

```
async function displayUsers(url) {

    try {

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const users = await response.json();
        users.forEach(user => {
            createUserProfileCardElement(user);
        });

    } catch(error) {

        console.error(`Could not get users: ${error}`);
    }
}
```

    See modules/displayUsers.js starting at line 2.

<img src="./readme-img/index.png">

## 2. Post a post

Click on any See Profile anchor in the User Profiles view. This will redirect you to the individual user profile.

To post a new post fill out the Title and Body fields and click POST.

<img src="./readme-img/create-new-post.png">

```
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

        const json = await response.json();
        console.log(json);

        const postHistoryView = document.querySelector('.post-history-list');
        const postCardElement = createPostElementCard(postObject);
        postHistoryView.prepend(postCardElement);

    } catch(error) {

        console.error(`Couldn't create new post: ${error}`);
    }
}
```
