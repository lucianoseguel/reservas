import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";


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
const firestore = getFirestore(app);
const formulario = document.getElementById("formulario");
const inputX = document.getElementById("X");

formulario.addEventListener("submit", async function (event) {
  event.preventDefault();

  const X = inputX.value;

  try {
    await addDoc(collection(firestore, "Z"), {
      Y: X
    });
  } catch (error) {
    console.error("Error al agregar datos", error);
  }
});

async function mostrarDatos() {
    listDiv.innerHTML = ''; // Limpiar el contenido actual del div

    try {
        const querySnapshot = await getDocs(collection(firestore, "Z"));
        querySnapshot.forEach((doc) => {
            const dato = doc.data().Y;
            listDiv.innerHTML += `
                <div>${dato}</div>
            `;
        });
    } catch (error) {
        console.error("Error al obtener datos", error);
    }
}

// Llamar a mostrarDatos al cargar la página para mostrar los datos existentes
document.addEventListener('DOMContentLoaded', mostrarDatos);

// Explicacion (X, Y, Z) 
/*
X hace referencia al "id" (#) del input de entrada de datos
inputX hace referencia al elemento "input" + el atributo id que posee
Y hace referencia al nombre de campo (base de datos)
Z hace referencia al nombre de la colección (base de datos) */