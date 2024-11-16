// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVIBx9ThIClC9nhKHKDeOkw_xaoS4UvGo",
  authDomain: "waterpump-9a720.firebaseapp.com",
  databaseURL: "https://waterpump-9a720-default-rtdb.firebaseio.com",
  projectId: "waterpump-9a720",
  storageBucket: "waterpump-9a720.appspot.com",
  messagingSenderId: "1067784158517",
  appId: "1:1067784158517:web:74f2542fd394a6814a607c",
  measurementId: "G-Z8DXG0T7QE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Elements for displaying values
const ultrasoundValueElement = document.getElementById("ultrasoundValue");
const motorStateElement = document.getElementById("motorState");
const toggleMotorButton = document.getElementById("toggleMotorButton");
const fanElement = document.getElementById("fan");

// Reference the root of the database
const dataRef = ref(database, "/");

// Listen for changes in data
onValue(dataRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data);

  ultrasoundValueElement.textContent = data.ultrasound_value || "No data";
  motorStateElement.textContent = data.motor_status === 1 ? "ON" : "OFF";

  // Update the fan rotation based on motor state
  if (data.motor_status === 1) {
    fanElement.classList.remove('stopped');
  } else {
    fanElement.classList.add('stopped');
  }

  // Update button text based on motor state
  toggleMotorButton.textContent = data.motor_status === 1 ? "Turn Motor OFF" : "Turn Motor ON";
});

// Toggle motor state on button click
toggleMotorButton.addEventListener("click", () => {
  const currentState = motorStateElement.textContent === "ON" ? 1 : 0;
  const newState = currentState === 1 ? 0 : 1;

  // Update the motor state in Firebase
  update(dataRef, { motor_status: newState })
    .then(() => {
      console.log("Motor state updated successfully.");
    })
    .catch((error) => {
      console.error("Error updating motor state:", error);
    });
});
