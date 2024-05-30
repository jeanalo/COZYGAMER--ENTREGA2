import { logout } from "./session.js";

const render = () => {
    const logoutBtn = document.getElementById('button__logout');
    logoutBtn.addEventListener('click', ()=>{
        logout();
        window.location.href = 'index.html';
    });
};
document.addEventListener("DOMContentLoaded", render);