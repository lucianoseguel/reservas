import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBjZYpyz-o1paUSxMOcbdsGc9LcSLrKc4Q",
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

import { doc, setDoc, addDoc, collection, getDocs, deleteDoc  } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"; 



//* Add a new document in collection "reservas"


let nombre = document.getElementById("name");
nombre.addEventListener("input", function() {
  console.log(nombre.value)
})

let dia = document.getElementById("date");
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

const querySnapshot = await getDocs(collection(db, table));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());

  let li= document.createElement("li")//* Crea el Elemento Lista

  let name = document.createElement('p') //Crea el p de nombre o x elemento para leer en firebase
  name.textContent = `${doc.data().nombre}` //escribe lo que dice firebase dentro del elemento


  let fecha = document.createElement('p')
  fecha.textContent = `${doc.data().dia}`


  let hora = document.createElement('p')
  hora.textContent = `${doc.data().hora}`


  let seña = document.createElement('p')
 seña.textContent = `${doc.data().seña}`


  let telefono = document.createElement('p')
 telefono.textContent = `${doc.data().telefono}`

 let deleteador = document.createElement("button")// !Boton para borrar reservas en la base de datos
 deleteador.textContent = "Borrar"

 deleteador.addEventListener("click", async function () { // Listener para boton x


    await borradocs(( doc.id ));
    
    console.log(`ID Reserva: ${doc.id} borrado`)

    location.reload();
    
  })


li.appendChild(name) //* Agrega al li del html 
li.appendChild(fecha)
li.appendChild(hora)
li.appendChild(telefono)
li.appendChild(seña)


li.appendChild(deleteador)

clientes.appendChild(li) //* Agrega al ul del html 

console.log(li)
});





//* Funcion para borrar docs

async function borradocs(id) {

  await deleteDoc(doc(db, table, id));
  
}



