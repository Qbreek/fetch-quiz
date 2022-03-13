// Creates the user profile card and appends it to the view.
export default function createUserProfileCardElement(userData) {
    
    const userList = document.querySelector('.user-profile-list');
    
    const userCard = document.createElement('li');
    userCard.classList.add('user-profile-card-index');

    const embedProfileSvg = document.createElement('embed');
    embedProfileSvg.src = './svg/account_circle_black_36dp.svg'

    userCard.append(embedProfileSvg)

    const userInfoContainer = document.createElement('div');
    userInfoContainer.classList.add('user-info-wrapper');
    
    const userName = document.createElement('h3');
    userName.textContent = userData.username;
    
    const userRealName = document.createElement('h5');
    userRealName.textContent = userData.name;

    userInfoContainer.append(userName, userRealName);

    // See selected users post history.
    const seeProfileAnchor = document.createElement('a');
    seeProfileAnchor.href = './userprofile.html';
    seeProfileAnchor.textContent = 'See profile';
    
    seeProfileAnchor.addEventListener('click', async () => {
        sessionStorage.setItem('userId', `${userData.id}`);
    })
    userCard.append(userInfoContainer,seeProfileAnchor);
    userList.append(userCard);
}
