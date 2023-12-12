import React from "react";

function AccidentPage(props) {
  const {
    daysWithoutAccident,
    numberOfAccidentsSinceStartOfTheYear,
    recordDaysWithoutAccident,
  } = props.accident;

  const flexContainer = {
    display: "flex",
    flexDirection: "column",

    fontSize: "21px",
    marginTop: "20px",
  };

  const flexItem = {
    marginBottom: "30px",
    textAlign: "left",
    marginLeft: "2px", // adjust this value to move text to the left
    display: "flex",
    alignItems: "center",
  };

  const numberStyle = {
    marginLeft: "10px", // adjust this value to move number to the left
    fontSize: "30px",
    width: "50px", // adjust this value according to your needs
  }

  return (
    <div style={flexContainer}>
      <div style={flexItem}>
        <div style={numberStyle}>
          {numberOfAccidentsSinceStartOfTheYear}
        </div>
        <div> Nombre d'accidents avec arrêt depuis le début de l'année</div>
      </div>
      <div style={flexItem}>
        <div style={numberStyle}>{daysWithoutAccident}</div>
        <div> Nombre de jours sans accident avec arrêt</div>
      </div>
      <div style={flexItem}>
        <div style={numberStyle}>{recordDaysWithoutAccident}</div>
        <div> Record de jour sans accident avec arrêt</div>
      </div>
    </div>
  );
}

export default AccidentPage;