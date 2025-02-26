import React, { useState, useEffect } from "react";

function TestPage() {
  const colors = ["#FF0000", "#00FF00", "#0000FF"]; // RGB colors
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const colorInterval = setInterval(() => {
      setColorIndex((prevColorIndex) => (prevColorIndex + 1) % colors.length);
    }, 2000);

    return () => {
      clearInterval(colorInterval);
    };
  }, []);

  return (
    <div
      style={{
        width: `${process.env.REACT_APP_WIDTH}px`,
        height: `${process.env.REACT_APP_HEIGHT}px`,
        backgroundColor: colors[colorIndex],
      }}
    />
  );
}

export default TestPage;
