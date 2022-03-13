// Creates full user profile using session storage value.
export default function createFullUserProfileElement(userData) {
   
    const userInfoContainer = document.querySelector('.user-full-profile-card');

    const profileSvg = document.createElement('embed');
    profileSvg.src = '/svg/account_circle_black_48dp.svg';

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
