import config from "../config/config.json";
const API_URL = config.API_URL;
const TOKEN = JSON.parse(localStorage.getItem('token')); // Récupère le token du localStorage et enlève les guillemets

export const accidentService = {
  getAccident,
  updateAccident,
};

function getAccident() {
  return fetch(`${API_URL}/api/accident`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${TOKEN}` // Ajout du token dans les en-têtes
    },
  })
    .then(handleResponse)
    .catch(handleError);
}

function updateAccident(dataToUpdate) {
  return fetch(`${API_URL}/api/accident`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${TOKEN}` // Ajout du token dans les en-têtes
    },
    body: JSON.stringify(dataToUpdate) // Envoi des données à mettre à jour
  })
    .then(handleResponse)
    .catch(handleError);
}

function handleResponse(response) {
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

function handleError(error) {
  console.error("There was a problem with the fetch operation:", error);
}
