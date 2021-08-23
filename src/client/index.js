import { performAction } from './js/app'
import { updateUI } from './js/updateUI'

import './styles/style.scss'

window.onload = () => {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1; 
    let year = today.getFullYear();
    if (day < 10) {
        day = '0' + day
    }
    if (month < 10) {
        month = '0' + month
    }
    today = year + '-' + month + '-' + day;

    const startDate = document.getElementById('start');
    startDate.setAttribute("min", today);
    startDate.valueAsDate = new Date();

    const button = document.getElementById('generate');
    document.querySelector('#generate').addEventListener("click", performAction);
}

export { 
    performAction, 
    updateUI 
}