async function getData(url) {
    const fetchData = await fetch(url);
    const dataSet = await fetchData.json();
    dataSet.forEach(data => {
        createUserElement(data);
        
    });
}

getData('https://jsonplaceholder.typicode.com/users');

function createUserElement(userData) {
    const dataView = document.querySelector('.data-view');
    const userCard = document.createElement('li');
    const userInfoContainer = document.createElement('div');
    const userRealName = document.createElement('h1');
    userRealName.textContent = userData.name;
    const userName = document.createElement('h2');
    userName.textContent = userData.username;
    const userEmail = document.createElement('h2');
    userEmail.textContent = userData.email;
    userCard.append(userRealName, userName, userEmail);
    dataView.append(userCard);
    
    //const userAddressContainer = document.createElement('div');
    //const streetName = document.createElement('h');
}