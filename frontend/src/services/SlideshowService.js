import config from "../config/config.json";
import { api } from "../helpers/api"; // Assurez-vous que le chemin d'importation est correct.

const API_URL = config.API_URL;

export const slideshowService = {
  getSlideshow,
  createSlideshow,
  updateSlideshow,
  deleteSlideshow,
};

function getSlideshow() {
  return api.fetchWithAuthorization(`${API_URL}/api/slideshow`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(handleResponse)
  .catch(handleError);
}

function createSlideshow(data) {
  return api.fetchWithAuthorization(`${API_URL}/api/slideshow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  .then(handleResponse)
  .catch(handleError);
}

function updateSlideshow(dataToUpdate) {
  return api.fetchWithAuthorization(`${API_URL}/api/slideshow`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToUpdate)
  })
  .then(handleResponse)
  .catch(handleError);
}

function deleteSlideshow(slideshowId) {
  return api.fetchWithAuthorization(`${API_URL}/api/slideshow/${slideshowId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(handleResponse)
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
