import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

import AccidentPanel from "./accidentPanel/AccidentPanel";
import Preview from "./preview/Preview";
import SlideshowList from "./slideshow/SlideshowList";
import { use } from "i18next";
import SlideshowConfig from "./slideshow/SlideshowConfig";

function Dashboard() {
  const [slideshow, setSlideshow] = useState(null);
  useEffect(() => {
    console.log("media", slideshow);
  }
  , [slideshow]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <AccidentPanel />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Preview />
      </Grid>
      <Grid item xs={12} sm={4}>
        {slideshow? (
          <SlideshowConfig slideshow={slideshow} setSlideshow={setSlideshow} />
        ) : (
          <SlideshowList setSlideshow={setSlideshow} />
        )}
      </Grid>
    </Grid>
  );
}

export default Dashboard;
