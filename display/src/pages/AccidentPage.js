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
    marginTop: "5px",
  };

  const flexItem = {
    marginBottom: "15px",
    textAlign: "left",
    marginLeft: "2px",
    display: "flex",
    alignItems: "center",
  };

  const numberStyle = {
    marginLeft: "10px",
    fontSize: "50px",
    width: "150px",
  };
  const texte = {
    fontSize: "25px",
    width: "100%",
  };

  return (
    <div style={flexContainer}>
      <div style={flexItem}>
        <div style={numberStyle}>{numberOfAccidentsSinceStartOfTheYear}</div>
        <div style={texte}>
          Nombre d'accidents avec arrêt depuis le début de l'année
        </div>
      </div>
      <div style={flexItem}>
        <div style={numberStyle}>{daysWithoutAccident}</div>
        <div style={texte}> Nombre de jours sans accident avec arrêt</div>
      </div>
      <div style={flexItem}>
        <div style={numberStyle}>{recordDaysWithoutAccident}</div>
        <div style={texte}> Record de jours sans accident avec arrêt</div>
      </div>
    </div>
  );
}

export default AccidentPage;
