// settingsService.js

const API_URL = process.env.REACT_APP_API_URL;

export const settingsService = {
  getSettings,
};

function getSettings() {
  return fetch(`${API_URL}/api/settings/get-settings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(handleResponse)
    .catch(handleError);
}

function handleResponse(response) {
  if (!response.ok) {
    throw new Error("La réponse du réseau n'était pas ok");
  }
  return response.json();
}

function handleError(error) {
  console.error("Il y avait un problème avec l'opération fetch :", error);
}
