import React, { useEffect } from "react";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import { t, use } from "i18next";

import ImageIcon from "@mui/icons-material/Image";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { mediaService } from "../../../services/MediaServices";

function SlideshowConfig(props) {
  useEffect(() => {}, []);
  function uploadMedia(event) {
    const id = props.slideshow._id;
    mediaService.uploadMedia(event.target.files[0], id).then((data) => {
      console.log("data", data);
    });

    console.log("addMedia", event.target.files[0]);
  }

  return (
    <>
      <Grid item xs={12}>
        <Paper className="mainPaperPage">
          <Stack className="herderTitlePage">
            <Box className="headerLeft">
              <IconButton
                className="headerButton"
                onClick={() => {
                  props.setSlideshow(null);
                }}
              >
                <CloseIcon sx={{ color: "secondary.main" }} />
              </IconButton>
              <IconButton disabled className="headerButton">
                <ImageIcon sx={{ color: "primary.light" }} />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ color: "text.primary" }}
                className="headerTitle"
              >
                {props.slideshow.name}
              </Typography>
            </Box>
            <Box className="headerRight">
              <IconButton
                className="headerButton"
                onClick={() => {
                  document.getElementById("inputFile").click();
                }}
              >
                <AddIcon sx={{ color: "secondary.main" }} />
              </IconButton>
              <input
                type="file"
                id="inputFile"
                style={{ display: "none" }}
                onChange={uploadMedia}
              />
            </Box>
          </Stack>
          <Box
            className="containerPage"
            sx={{
              paddingLeft: { xs: 2, sm: 6 },
              paddingRight: { xs: 2, sm: 6 },
            }}
          >
            <TableContainer>
              <Table sx={{ borderCollapse: "separate", borderSpacing: 0 }}>
                <TableBody>
                  {props.slideshow.media.map((media, index) => (
                
                   <Box src={media.path}  component="img" key={index} />
                    
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      </Grid>
    </>
  );
}

export default SlideshowConfig;
