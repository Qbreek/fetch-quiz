import createFullUserProfileElement from "./createFullUserInformation.js";

// Fetches user information from the provided url argument using the value stored in session storage.
export default async function getUserInformation(url) {
    
    const userData = await fetch(url);
    let users = await userData.json();
    users = [...users];
    const userId = Number(sessionStorage.getItem('userId'));
    const userProfile = users.filter(user => user.id === userId);
    createFullUserProfileElement(userProfile);
}