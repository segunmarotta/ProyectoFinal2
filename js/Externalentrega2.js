//Login
function login(event){
const loginForm = document.querySelector("#login")
event.preventDefault();
let userName = loginForm.username.value;
let passWord = loginForm.password.value;
let nUser = userName + " " + passWord;
console.log(userName, passWord);
const newLog = JSON.stringify(nUser)
localStorage.setItem("userLoginIN", newLog);
const loginUser = localStorage.getItem("userLoginIN");
const newLogParseado = JSON.parse(loginUser);
if(userName == "" || passWord == ""){
    Toastify({
        text: "Por favor complete todos los campos!",
        duration: 2000,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
        background: "red",
        },
    }).showToast();
}else {
    let loginOK = document.getElementById("page");
    let header = document.getElementById("page_title");
    let bodyBg = document.getElementById("body");
    bodyBg.className = "login_color2";
    loginOK.className = "container-fluid d-block login_color";
    loginForm.className = "d-none";
    header.className = "col-12 pb-3 pt-3";
    Toastify({
        text: `Bienvenido ${nUser} !`,
        duration: 2000,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
        background: "",
        },
    }).showToast();
    }
}

class Usuario {
    constructor (fName, lName, age, documento, estadoCivil, income, gastos, rDependencia, actividad, montoASolicitar, id, counter){
        this.fName = fName.toUpperCase();
        this.lName = lName.toUpperCase();
        this.age = parseInt(age);
        this.documento = parseInt(documento);
        this.estadoCivil = estadoCivil.toUpperCase();
        this.income = parseInt(income);
        this.gastos = parseInt(gastos);
        this.rDependencia = rDependencia.toUpperCase();
        this.actividad = actividad.toUpperCase();
        this.montoASolicitar = parseInt(montoASolicitar);
        this.id = id;
        this.counter = counter;
    }
}


let usuarios = [];
let counter = 1;
let idEditUser = 0;
let sector = document.querySelector("#usuario ubody");
const userForm = document.querySelector('#addUser');
updateUserHTML();


//Add User
function agregarUsuario(){
    console.log(idEditUser)
    if (idEditUser !=0){
        for (let index = 0; index < usuarios.length; index++) {
            if (usuarios[index].counter == idEditUser){
                usuarios[index].fName = userForm.fName.value;
                usuarios[index].lName = userForm.lName.value;
                usuarios[index].age = userForm.age.value;
                usuarios[index].documento = userForm.documento.value;
                usuarios[index].estadoCivil = userForm.estadoCivil.value;
                usuarios[index].income = userForm.income.value;
                usuarios[index].gastos = userForm.gastos.value;
                usuarios[index].rDependencia = userForm.rDependencia.value;
                usuarios[index].actividad = userForm.actividad.value;
                usuarios[index].montoASolicitar = userForm.montoASolicitar.value;
                Toastify({
                    text: `Usuario ${usuarios[index].fName} ${usuarios[index].lName} editado correctamente!`,
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                    background: "",
                    },
                }).showToast();
                break;
                
            }  
        }
        idEditUser = 0;
        updateUserHTML();
        updateSec();
    }else{
        //Create User
        let newUser = new Usuario(userForm.fName.value,
            userForm.lName.value,
            userForm.age.value,
            userForm.documento.value,
            userForm.estadoCivil.value,
            userForm.income.value,
            userForm.gastos.value,
            userForm.rDependencia.value,
            userForm.actividad.value,
            userForm.montoASolicitar.value,
            usuarios.length + 1,
            counter);
        usuarios.push(newUser);
        const userData = document.getElementById('userData');
        const infoSimu = document.getElementById('infoSimu');
        if (usuarios.length <= 1) {
            userData.className = "titles_design text-center mt-3";  
            infoSimu.className = ""
        }

        
        fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: `${usuarios[0].fName}`,
            body: 'Post de prueba',
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((data) => console.log(data))

        const usuariosJSON = (user, valor) => {sessionStorage.setItem(user,valor)};
        for (const user of usuarios) {
            usuariosJSON(user.fName, JSON.stringify(user))
        }
        Toastify({
            text: `Usuario creado correctamente!`,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
            background: "green",
            },
        }).showToast();
        counter++;
        console.log(usuarios);
        updateUserHTML();
        updateSec();
    }
}


function updateUserHTML(){
    sector.innerHTML = "";
    usuarios.forEach((user) => {
        let cont = document.createElement("div");
        cont.setAttribute("class", "col-md-4 usuarios_color mx-2 mt-2 width_box_users" )
        cont.innerHTML = `<h3>${user.fName} ${user.lName} </h3>
                        <p>Edad: ${user.age}</p>
                        <p>Documento: ${user.documento}</p>
                        <div id="info${user.counter}" class="d-none">
                        <p>Estado Civil: ${user.estadoCivil}</p>
                        <p>Ingreso: ${user.income}</p>
                        <p>Gastos: ${user.gastos}</p>
                        <p>Relacion de dependencia: ${user.rDependencia}</p>
                        <p>Actividad: ${user.actividad}</p>
                        <p>Monto a Solicitar: ${user.montoASolicitar}</p>
                        </div>
                        <button id="editBtn_${user.counter}" type="button" class="btn btn-primary" onclick="editUsuario(event)" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                        <button id="deleteBtn_${user.counter}" type="button" class="btn btn-danger" onclick="deleteUsuario(event)">Delete</button>
                        <button id="deleteBtn_${user.counter}" type="button" class="btn btn-secondary" onclick="userInfo(event)">More</button>
                        `;
        sector.appendChild(cont);
    } )
}


//Delete User
function deleteUsuario(event){
    Swal.fire({
        title: `Esta seguro que quiere eliminar el usuario?`,
        text: "Se eliminara de forma permanente!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Eliminar!'
        }).then((result) => {
        if (result.isConfirmed) {
            Toastify({
                text: `Usuario eliminado correctamente`,
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                background: "red",
                },
            }).showToast();
            const btn = event.target;
            const coun = btn.id.split('_')[1];
            usuarios = usuarios.filter((users) => users.counter != coun);
            console.log(usuarios)
            updateUserHTML()
            updateSec()
        }
    })
}


//Edit User
function editUsuario (event){
    const btn = event.target;
    const coun = btn.id.split('_')[1];
    const user = usuarios.filter((user) => user.counter == coun)[0];
    userForm.fName.value = user.fName;
    userForm.lName.value = user.lName;
    userForm.age.value = user.age;
    userForm.documento.value = user.documento;
    userForm.estadoCivil.value = user.estadoCivil;
    userForm.income.value = user.income;
    userForm.gastos.value = user.gastos;
    userForm.rDependencia.value = user.rDependencia;
    userForm.actividad.value = user.actividad;
    userForm.montoASolicitar.value = user.montoASolicitar;
    idEditUser = user.counter
    console.log(user);
    
}


//User Info
function userInfo(event){
    const btnMore = event.target;
    const coun = btnMore.id.split('_')[1];
    const user = usuarios.filter((user) => user.counter == coun)[0];
    const info = document.getElementById(`info${coun}`);
    info.className = "";
    console.log(btnMore)
    console.log(coun)
    
}

//Simulador
let miSimulador = document.querySelector("#simulador select");

function updateSec (){
    miSimulador.innerHTML="";
    for (let index = 0; index < usuarios.length; index++) {
        let opt = document.createElement("option");
        opt.setAttribute("value", index );
        opt.innerHTML = `${usuarios[index].counter}. ${usuarios[index].fName} ${usuarios[index].lName}`;
        miSimulador.appendChild(opt); 
    }
}


function iniSimulacion(event){
    event.preventDefault();
    let simu = document.querySelector("#result");
    console.log(miSimulador.value)
        if (usuarios[miSimulador.value].age <= 25 && usuarios[miSimulador.value].montoASolicitar >= 30000){
            Swal.fire({
                title: `${usuarios[miSimulador.value].fName} ${usuarios[miSimulador.value].lName} fue rechazado! `,
                text: "No le podremos dar un prestamo",
                icon: 'error',
                })
            console.log(`No le podremos dar un prestamo al usuario ${usuarios[miSimulador.value].fName} ${usuarios[miSimulador.value].lName}`);
        }
        else if (usuarios[miSimulador.value].income <= usuarios[miSimulador.value].montoASolicitar / 60) {
            Swal.fire({
                title: `${usuarios[miSimulador.value].fName} ${usuarios[miSimulador.value].lName} fue rechazado! `,
                text: "No le podremos dar un prestamo",
                icon: 'error',
                })
            console.log(`No le podremos dar un prestamo al usuario ${usuarios[miSimulador.value].fName} ${usuarios[miSimulador.value].lName}`);
        }
        else if(usuarios[miSimulador.value].gastos >= usuarios[miSimulador.value].income ) {
            Swal.fire({
                title: `${usuarios[miSimulador.value].fName} ${usuarios[miSimulador.value].lName} fue rechazado! `,
                text: "No le podremos dar un prestamo. Sus gastos son mayores o iguales a sus ingresos.",
                icon: 'error',
                })
            console.log(`No le podremos dar un prestamo al usuario ${usuarios[miSimulador.value].fName} ${usuarios[miSimulador.value].lName}.Sus gastos son mayores o iguales a sus ingresos`);
        }
        else {
            Swal.fire({
                title: `Felicitaciones! ${usuarios[miSimulador.value].fName} ${usuarios[miSimulador.value].lName} `,
                text: "Fue aceptado para recibir un prestamo. Nos estaremos comunicando con usted.",
                icon: 'success',
                })
            console.log(`${usuarios[miSimulador.value].fName} ${usuarios[miSimulador.value].lName} fue aceptado para recibir un prestamo. Nos estaremos contactando con usted`);
        }
}

fetch('https://api.openweathermap.org/data/2.5/weather?lat=-34.60&lon=-58.38&appid=4d2be61d4f7a67ef14c1f9b61ec9122f&units=metric&lang=es')
.then (res => res.json())
.then(res => getData(res))

function getData(dato){
    const datos = dato
    const main = dato.main
    const tempSec = document.getElementById('temp');
    const conTemp = document.createElement("div")
    conTemp.setAttribute("class", "row text-white");
    conTemp.innerHTML = `<div class="col-6">                       
                        </div>
                        <div class="col-2">
                            <div class=" float-end pt-2">
                                <p>Buenos Aires</p>
                            </div>                
                        </div>
                        <div class="col-2">
                            <div class=" float-end pt-2">
                                <p>Temp min: ${main.temp_min}</p>
                                
                            </div>
                        </div>     
                            <div class="col-2">
                                <div class=" float-end pt-2">
                                <p>Temp max: ${main.temp_max}</p>
                                </div>
                            </div>                 
                        </div> `
    tempSec.appendChild(conTemp)
    console.log(datos)
    console.log(main.temp)
}
