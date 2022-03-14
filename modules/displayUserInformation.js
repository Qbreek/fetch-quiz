// Fetches user information from the provided url argument using the value stored in session storage.
export default async function displayUserInformation(url) {
    
    try {

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        console.log(response);
        let users = await response.json();
        users = [...users];
        const userId = Number(sessionStorage.getItem('userId'));
        const userProfileInfo = users.filter(user => user.id === userId);
        createFullUserProfileElement(userProfileInfo);

    } catch(error) {

        console.error(`Could not get user information: ${error}`);

    }
}

// Creates full user profile using session storage value.
function createFullUserProfileElement(userData) {
   
    const userInfoContainer = document.querySelector('.user-full-profile-card');

    const profileSvg = document.createElement('embed');
    profileSvg.src = '/fetch-quiz/svg/account_circle_black_48dp.svg';

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
