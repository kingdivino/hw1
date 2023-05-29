
const form = document.forms['formaggio'];
form.addEventListener('submit', validazione);
const avviso = document.createElement('span');


function validazione(event){
    if(form.username.value.length == 0 ||
        form.password.value.length == 0){
            const campopassword = document.querySelector('#password');
            avviso.classList.add('errore');
            avviso.textContent = 'Compilare tutti i campi';
            campopassword.appendChild(avviso);
            event.preventDefault();
    }
}

const showpass = document.querySelector('.showpassword');
showpass.addEventListener('click', showp);

function showp(){
    const input = document.querySelector('.password');
    input.type = 'text';
    showpass.removeEventListener('click', showp);
    showpass.addEventListener('click', hidep);
}

function hidep(){
    const input = document.querySelector('.password');
    input.type = 'password';
    showpass.removeEventListener('click', hidep);
    showpass.addEventListener('click', showp);
}
