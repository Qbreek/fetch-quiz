import getUsers from "./modules/getUsers.js";

function index() {
    
    getUsers('https://jsonplaceholder.typicode.com/users');
}

index();


