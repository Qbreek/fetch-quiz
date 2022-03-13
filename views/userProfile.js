import displayUserPosts from '../modules/displayUserPosts.js'
import formSubmitButtonLogic from '../modules/formSubmitButtonLogic.js';
import displayUserInformation from '../modules/displayUserInformation.js';

function userProfile() {
    
    displayUserInformation('https://jsonplaceholder.typicode.com/users');
    displayUserPosts('https://jsonplaceholder.typicode.com/posts');
    
    const pseudoSubmitBtn = document.querySelector('.post-card-btn');
    // Simulates submit procedure? Maybe im wrong here
    pseudoSubmitBtn.addEventListener('click', formSubmitButtonLogic);
}

userProfile();