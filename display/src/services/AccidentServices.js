const API_URL = process.env.REACT_APP_API_URL;

export const accidentService = {
  getAccident,
};

function getAccident() {
  return fetch(`${API_URL}/api/accident`, {
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
    throw new Error("Network response was not ok");
  }
  return response.json();
}

function handleError(error) {
  console.error("There was a problem with the fetch operation:", error);
}
