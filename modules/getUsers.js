import createUserProfileCardElement from "./createUserProfileCard.js";

// Fetches data from the provided url argument.
export default async function getUsers(url) {
    
    const userData = await fetch(url);
    const users = await userData.json();
    users.forEach(user => {
        createUserProfileCardElement(user);
    });
}
