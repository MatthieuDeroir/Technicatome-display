import config from "../config/config.json";
const API_URL = config.API_URL;
const TOKEN = localStorage.getItem('token'); // Récupère le token du localStorage

export const slideshowService = {
  getSlideshow,
  createSlideshow,
  updateSlideshow,
  deleteSlideshow,
};

function getSlideshow() {
  return fetch(`${API_URL}/api/slideshow`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${TOKEN}` // Ajout du token dans les en-têtes
    },
  })
  .then(handleResponse)
  .catch(handleError);
}

function createSlideshow(data) {
  return fetch(`${API_URL}/api/slideshow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${TOKEN}` // Ajout du token dans les en-têtes
    },
    body: JSON.stringify(data) // Envoi des données du nouveau slideshow
  })
  .then(handleResponse)
  .catch(handleError);
}

function updateSlideshow(dataToUpdate) {
  return fetch(`${API_URL}/api/slideshow`, {
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
function deleteSlideshow(slideshowId) {
  return fetch(`${API_URL}/api/slideshow/${slideshowId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${TOKEN}` // Ajout du token dans les en-têtes
    },
  })
  .catch(handleError);
}

function handleResponse(response) {
  if (!response.ok) {
    throw new Error("La réponse du réseau n'était pas correcte");
  }
  return response.json();
}

function handleError(error) {
  console.error("Il y a eu un problème avec l'opération fetch :", error);
}
