
//-----------Show Password---------------
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

//----------Show Conferma Password----------
const showcpass = document.querySelector('.showcpassword');
showcpass.addEventListener('click', showcp);

function showcp(){
    const input = document.querySelector('.cpassword');
    input.type = 'text';
    showcpass.removeEventListener('click', showcp);
    showcpass.addEventListener('click', hidecp);
}

function hidecp(){
    const input = document.querySelector('.cpassword');
    input.type = 'password';
    showcpass.removeEventListener('click', hidecp);
    showcpass.addEventListener('click', showcp);
}
//------------------------

const form = document.forms['formaggio'];
form.addEventListener('submit', validazione);
/*const avviso = document.createElement('span');
const campoerrore = document.createElement('div');
campoerrore.classList.add('errore');*/
const camponome = document.querySelector('.camponome');
camponome.addEventListener('blur', checkNome);
const campocognome = document.querySelector('.campocognome');
campocognome.addEventListener('blur', checkCognome);
const campousername = document.querySelector('.campousername');
campousername.addEventListener('blur', checkUsername);
const campopassword = document.querySelector('.password');
campopassword.addEventListener('blur', checkPassword);
const campocpassword = document.querySelector('.cpassword');
campocpassword.addEventListener('blur', checkCpassword);
const campoemail = document.querySelector('.campoemail');
campoemail.addEventListener('blur', checkEmail);

let erroren = false;
let errorec = false;
let erroreu = false;
let errorep = false;
let errorecp = false;
let errorem = false;


function validazione(event){
    if((form.username.value.length == 0 ||
        form.password.value.length == 0 ||
        form.nome.value.length == 0 ||
        form.cognome.value.length == 0 ||
        form.email.value.length == 0 ||
        form.cpassword.value.length == 0) &&
        erroren == false && errorec == false &&
        erroreu == false && errorep == false &&
        errorecp == false && errorem == false){
            avviso.textContent = 'Compilare tutti i campi';
            campoerrore.appendChild(avviso);
            event.preventDefault();
    }
    if(erroreu == true || errorep == true ||
        errorecp == true || errorem == true){
            avviso.textContent = 'Errore da qualche parte';
            campoerrore.appendChild(avviso);
            event.preventDefault();
    }
}

function checkNome(event){
    console.log('evento nome');
    const input = event.currentTarget;
    if(input.parentNode.querySelector('.errore')){
        input.parentNode.querySelector('.errore').remove();
    }
    if(form.nome.value.length > 0){
        erroren = false;
    } else {
        const padre = input.parentNode;
        const avviso = document.createElement('span');
        const campoerrore = document.createElement('div');
        campoerrore.classList.add('errore');
        avviso.textContent = 'Inserire il Nome';
        campoerrore.appendChild(avviso);
        padre.appendChild(campoerrore);
        erroren = true;
    }
}

function checkCognome(event){
    console.log('evento cognome');
    const input = event.currentTarget;
    if(input.parentNode.querySelector('.errore')){
        input.parentNode.querySelector('.errore').remove();
    }
    if(form.cognome.value.length > 0){
        errorec = false;
    } else {
        const padre = input.parentNode;
        const avviso = document.createElement('span');
        const campoerrore = document.createElement('div');
        campoerrore.classList.add('errore');
        avviso.textContent = 'Inserire il Cognome';
        campoerrore.appendChild(avviso);
        padre.appendChild(campoerrore);
        errorec = true;
    }
}

function checkUsername(event){
    console.log('evento username');
    const input = event.currentTarget;
    if(input.parentNode.querySelector('.errore')){
        input.parentNode.querySelector('.errore').remove();
    }
    if(input.parentNode.querySelector('.errore_piccolo')){
        input.parentNode.querySelector('.errore_piccolo').remove();
    }
    let flag = false;
    if(form.username.value.length == 0) {
        if(input.parentNode.querySelector('.errore_piccolo')){
            input.parentNode.querySelector('.errore_piccolo').remove();
        }
        const padre = input.parentNode;
        const avviso = document.createElement('span');
        const campoerrore = document.createElement('div');
        campoerrore.classList.add('errore');
        avviso.textContent = 'Inserire l\'Username';
        campoerrore.appendChild(avviso);
        padre.appendChild(campoerrore);
        erroreu = true;
        console.log('inserire username');
    }
    if(!/^[a-zA-Z0-9_]{1,20}$/.test(input.value) && form.username.value.length > 0){
        if(input.parentNode.querySelector('.errore')){
            input.parentNode.querySelector('.errore').remove();
        }
        const padre = input.parentNode;
        const avviso = document.createElement('span');
        const campoerrore = document.createElement('div');
        campoerrore.classList.add('errore_piccolo');
        avviso.textContent = 'Inserisci solo lettere, numeri e _ ';
        campoerrore.appendChild(avviso);
        padre.appendChild(campoerrore);
        flag =true;
        erroreu = true;
    }
    if(form.username.value.length > 0 && !flag){
        fetch('checkusername.php?username=' + input.value).then(onResponse).then(onJson_user);
        if(!user_disponibile){
            if(input.parentNode.querySelector('.errore')){
                input.parentNode.querySelector('.errore').remove();
            }
            if(input.parentNode.querySelector('.errore_piccolo')){
                input.parentNode.querySelector('.errore_piccolo').remove();
            }
            const padre = input.parentNode;
            const avviso = document.createElement('span');
            const campoerrore = document.createElement('div');
            campoerrore.classList.add('errore');
            avviso.textContent = 'Username non disponibile';
            campoerrore.appendChild(avviso);
            padre.appendChild(campoerrore);
            erroreu = true;
        }
        else{
            erroreu = false;
        }
    }
}

function checkPassword(event){
    console.log('evento password');
    const input = event.currentTarget;
    if(input.parentNode.querySelector('.errore')){
        input.parentNode.querySelector('.errore').remove();
    }
    if(form.password.value.length > 0 && form.password.value.length > 8){
        errorep = false;
    }
    if(form.password.value.length == 0){
        if(input.parentNode.querySelector('.errore')){
            input.parentNode.querySelector('.errore').remove();
        }
        const padre = input.parentNode;
        const avviso = document.createElement('span');
        const campoerrore = document.createElement('div');
        campoerrore.classList.add('errore');
        avviso.textContent = 'Inserire la Password';
        campoerrore.appendChild(avviso);
        padre.appendChild(campoerrore);
        errorep = true;
    }
    if(form.password.value.length > 0 && form.password.value.length < 8){
        if(input.parentNode.querySelector('.errore')){
            input.parentNode.querySelector('.errore').remove();
        }
        const padre = input.parentNode;
        const avviso = document.createElement('span');
        const campoerrore = document.createElement('div');
        campoerrore.classList.add('errore');
        avviso.textContent = 'Minimo 8 caratteri';
        campoerrore.appendChild(avviso);
        padre.appendChild(campoerrore);
        errorep = true;
    }
}

function checkCpassword(event){
    console.log('evento cpassword');
    const input = event.currentTarget;
    const input_password = document.querySelector('.password');
    if(input.parentNode.querySelector('.errore')){
        input.parentNode.querySelector('.errore').remove();
    }
    if(input.parentNode.querySelector('.errore_piccolo')){
        input.parentNode.querySelector('.errore_piccolo').remove();
    }
    console.log(input_password);
    if(form.cpassword.value.length > 0 && (form.cpassword.value == input_password.value)){
        if(input.parentNode.querySelector('.errore_piccolo')){
            input.parentNode.querySelector('.errore_piccolo').remove();
        }
        if(input.parentNode.querySelector('.errore')){
            input.parentNode.querySelector('.errore').remove();
        }
        errorecp = false;
    }
    if(form.cpassword.value != input_password.value){
        if(input.parentNode.querySelector('.errore')){
            input.parentNode.querySelector('.errore').remove();
        }
        if(input.parentNode.querySelector('.errore_piccolo')){
            input.parentNode.querySelector('.errore_piccolo').remove();
        }
        const padre = input.parentNode;
        const avviso = document.createElement('span');
        const campoerrore = document.createElement('div');
        campoerrore.classList.add('errore_piccolo');
        avviso.textContent = 'Le Password non corrispondono';
        campoerrore.appendChild(avviso);
        padre.appendChild(campoerrore);
        errorecp = true;
    }
    if(form.cpassword.value.length == 0){
        if(input.parentNode.querySelector('.errore_piccolo')){
            input.parentNode.querySelector('.errore_piccolo').remove();
        }
        const padre = input.parentNode;
        const avviso = document.createElement('span');
        const campoerrore = document.createElement('div');
        campoerrore.classList.add('errore');
        avviso.textContent = 'Confermare la Password';
        campoerrore.appendChild(avviso);
        padre.appendChild(campoerrore);
        errorecp = true;
    }
}

function checkEmail(event){
    console.log('evento email');
    const input = event.currentTarget;
    let flag = false
    if(input.parentNode.querySelector('.errore')){
        console.log('rimosso');
        input.parentNode.querySelector('.errore').remove();
    }
    if(form.email.value.length == 0){
        if(input.parentNode.querySelector('.errore')){
            console.log('rimosso');
            input.parentNode.querySelector('.errore').remove();
        }
        const padre = input.parentNode;
        const avviso = document.createElement('span');
        const campoerrore = document.createElement('div');
        campoerrore.classList.add('errore');
        avviso.textContent = 'Inserire l\'Email';
        campoerrore.appendChild(avviso);
        padre.appendChild(campoerrore);
        errorem = true;
    }
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(input.value).toLowerCase()) && form.email.value.length > 0){
        if(input.parentNode.querySelector('.errore')){
            console.log('rimosso');
            input.parentNode.querySelector('.errore').remove();
        }
        const padre = input.parentNode;
        const avviso = document.createElement('span');
        const campoerrore = document.createElement('div');
        campoerrore.classList.add('errore');
        avviso.textContent = 'Email non valida';
        campoerrore.appendChild(avviso);
        padre.appendChild(campoerrore);
        flag = true;
        errorem = true;
    }
    if(form.email.value.length > 0 && !flag){
        fetch('checkemail.php?email=' + input.value).then(onResponse).then(onJson_email);
        if(!email_disponibile){
            if(input.parentNode.querySelector('.errore')){
                input.parentNode.querySelector('.errore').remove();
            }
            const padre = input.parentNode;
            const avviso = document.createElement('span');
            const campoerrore = document.createElement('div');
            campoerrore.classList.add('errore');
            avviso.textContent = 'Email non disponibile';
            campoerrore.appendChild(avviso);
            padre.appendChild(campoerrore);
            errorem = true;
        }
        else{
            errorem = false;
        }
    }
}

function onResponse(response) {
	console.log('Risposta ricevuta');
	return response.json();
}
let user_disponibile;
function onJson_user(json){
    console.log(json);
    if(json.disponibile){
        user_disponibile = true;
    }
    else{
        user_disponibile = false;
    }
}

let email_disponibile;
function onJson_email(json){
    console.log(json);
    if(json.disponibile){
        email_disponibile = true;
    }
    else{
        email_disponibile = false;
    }
}