import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

async function obtenerClave() {
  let clave = "";
  try {
    const response = await fetch('api/clave');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    clave = data.clave;
    return clave; // Devuelve la clave si la necesitas en otro lugar
  } catch (error) {
    console.error('Error al obtener la clave:', error);
    return ""; // Devuelve un valor por defecto en caso de error
  }
}



let key = await obtenerClave()

console.log(key)


  

const firebaseConfig = {
    apiKey: key,
    authDomain: "reservas-restaurante-ce2f3.firebaseapp.com",
    projectId: "reservas-restaurante-ce2f3",
    storageBucket: "reservas-restaurante-ce2f3.firebasestorage.app",
    messagingSenderId: "274837762887",
    appId: "1:274837762887:web:d668c08d58ac8f283fd262",
    measurementId: "G-LYYF8J756F"
  };

const app = initializeApp(firebaseConfig);

const table = "reservas"

const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);



console.log("Conexión a Firebase establecida correctamente.");

// ! Importar librerias de FIRESTORE (FIREBASE)

import { doc, setDoc, addDoc, collection, getDocs, deleteDoc, query, orderBy, limit, where } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"; 


//* Add a new document in collection "reservas"


let nombre = document.getElementById("name");
nombre.addEventListener("input", function() {
  console.log(nombre.value)
})

let dia = document.getElementById("date");
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');

// Establecemos la fecha mínima permitida en el input tipo "date"
dia.min = `${yyyy}-${mm}-${dd}`;



dia.addEventListener("input", function() {


  console.log(dia.value)
  
  })

let hora = document.getElementById("time");
hora.addEventListener("input", function() {
  console.log(hora.value)
  })

let phone = document.getElementById("phone");
phone.addEventListener("input", function() {
  console.log(phone.value)
})




//! Botón para agregar reserva

// Actualziacion de base de datos
let databaseup = document.getElementById("databaseup");



async function reservar(name, date, hour, phone) {
 let sended = new Date()
  const docRef = await addDoc(collection(db, table), {
    nombre: name,
    dia: date,
    hora: hour,
    telefono: phone,
    enviado: sended,
    seña: 0
  });
  console.log("Document written with ID: ", docRef.id);

}

// Llamada a la accion del boton submit
databaseup.addEventListener("click", async function (){
 await reservar(nombre.value, dia.value, hora.value, phone.value)
})




// ? Creador de tabla para mostrar la base de datos

let clientes = document.querySelector("#clientes") // Ul del html

const querySnapshot = await getDocs(query(collection(db, table), orderBy("dia", "asc"), where("dia", ">=", dia.min ))); //Aca van los filtros y parametros 
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());

  let tr = document.createElement("tr")//* Crea el Elemento Lista
  tr.className = ""

  let name = document.createElement('td') //Crea la celda de nombre o x elemento para leer en firebase
  name.textContent = `${doc.data().nombre}` //escribe lo que dice firebase dentro del elemento
  name.className = 'whitespace-nowrap px-4 py-2 font-medium text-gray-800'

  let fecha = document.createElement('td')
  fecha.textContent = `${doc.data().dia}`
  fecha.className = "whitespace-nowrap px-4 py-2 text-gray-700"


  let hora = document.createElement('td')
  hora.textContent = `${doc.data().hora}`
  hora.className = "whitespace-nowrap px-4 py-2 text-gray-700"


  let seña = document.createElement('td')
 seña.textContent = `${doc.data().seña}`
 seña.className = "whitespace-nowrap px-4 py-2 text-gray-700"


  let telefono = document.createElement('td')
 telefono.textContent = `${doc.data().telefono}`
 telefono.className = "whitespace-nowrap px-4 py-2 text-gray-700"

// *Boton para borrar reservas en la base de datos
 let deleteador = document.createElement("td")
 let deleteador_a = document.createElement("button")// crea el a para redirigir o algo

  deleteador_a.textContent = "Borrar" 

  deleteador.className = "whitespace-nowrap px-4 py-2 delete"
  deleteador_a.className = "inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"

  deleteador.appendChild(deleteador_a)



 deleteador.addEventListener("click", async function () { // Listener para boton x


    await borradocs(( doc.id ));
    
    console.log(`ID Reserva: ${doc.id} borrado`)

    location.reload();
    
  })


    tr.appendChild(name) //* Agrega al tr del html 
    tr.appendChild(fecha)
    tr.appendChild(hora)
    tr.appendChild(telefono)
    tr.appendChild(seña)
    tr.appendChild(deleteador)

    clientes.appendChild(tr) //* Agrega al tbody del html 

    console.log(tr)
});





//* Funcion para borrar docs

async function borradocs(id) {

  await deleteDoc(doc(db, table, id));
  
}



