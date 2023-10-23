import config from "../config/config.json";

const API_URL = config.API_URL;

export const userService = {
  signin,
  signup,
};

function signin(username, password) {
    return fetch(`${API_URL}/api/auth/signin`, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(username, password ),  
    })
    .then(response => {
      if (!response.ok) { 
        throw new Error('Network response was not ok');
      }
      return response.json();  
    })
    .then(user => {
      return user;
    })
    .catch(error => {
      console.error("There was a problem with the fetch operation:", error);
    });
  }
  

function signup(user) {
  return fetch(`${API_URL}signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(handleResponse)
    .then((user) => {
      // gérer les actions de l'utilisateur inscrit si nécessaire
      return user;
    });
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if ([401, 403].includes(response.status)) {
        // gérer les cas d'erreur d'autorisation si nécessaire
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
