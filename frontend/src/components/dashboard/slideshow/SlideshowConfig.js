import React from "react";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { t, use } from "i18next";

import ImageIcon from "@mui/icons-material/Image";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { mediaService } from "../../../services/MediaServices";
import { slideshowService } from "../../../services/SlideshowService";
import { ReactSortable } from "react-sortablejs";

function SlideshowConfig(props) {
  async function uploadMedia(event) {
    event.preventDefault();
    const id = props.slideshow._id;
    await mediaService
      .uploadMedia(event.target.files[0], id)
      .then((data) => {
        console.log("Uploaded data", data);
        const newMedia = data;
        const updatedMediaList = [...props.slideshow.media, newMedia];
        console.log("updatedMediaList", updatedMediaList);
        props.setSlideshow({
          ...props.slideshow,
          media: updatedMediaList,
        });
      })
      .catch((error) => {
        console.error("Upload error", error);
      });
  }

  function handleDurationChange(event, mediaId) {
    const newDuration = event.target.value;

    slideshowService.updateSlideshowMedia(
      props.slideshow._id,
      mediaId,
      newDuration
    );

    const updatedMediaList = props.slideshow.media.map((media) => {
      if (media._id === mediaId) {
        return { ...media, duration: newDuration };
      }
      return media;
    });
    props.setSlideshow({ ...props.slideshow, media: updatedMediaList });
  }

  function deleteMedia(mediaToDelete) {
    slideshowService
      .deleteMedia(props.slideshow._id, mediaToDelete._id)
      .then(() => {
        const updatedMediaList = props.slideshow.media.filter(
          (media) => media._id !== mediaToDelete._id
        );
        props.setSlideshow({ ...props.slideshow, media: updatedMediaList });
      });
  }

  function handleOrderChange(newOrder) {
    console.log(newOrder);
    props.setSlideshow({ ...props.slideshow, media: newOrder });

    const updatedOrder = newOrder.map((media, index) => ({
      mediaId: media._id,
      newPosition: index,
    }));
    console.log("updatedOrder", updatedOrder);

    slideshowService
      .updateMediaOrder(props.slideshow._id, updatedOrder)
      .then((response) => {
        console.log("Order updated in the database", response);
      })
      .catch((error) => {
        console.error("Error updating order", error);
      });
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
              paddingLeft: { xs: 2 },
              paddingRight: { xs: 2 },
            }}
          >
            <TableContainer>
              <Table sx={{ borderCollapse: "separate", borderSpacing: 0 }}>
                <TableBody>
                  <ReactSortable
                    list={props.slideshow.media}
                    setList={handleOrderChange}
                  >
                    {props.slideshow.media.map((media, index) => (
                      <TableRow key={index}>
                        <TableCell
                          sx={{ borderBottom: 0, p: 0, textAlign: "center" }}
                        >
                          <Box
                            sx={{
                              minHeight: "calc(15vh)",
                              minWidth: "calc(15vh)",
                              maxWidth: "calc(15vh)",
                              maxHeight: "calc(15vh)",
                            }}
                            src={media.path}
                            component="img"
                            key={index}
                          />
                        </TableCell>
                        <TableCell p={0} align="right">
                          <TextField
                            value={media.duration}
                            onChange={(e) => handleDurationChange(e, media._id)}
                            size="small"
                            type="number"
                            inputProps={{ min: 0, max: 999 }}
                            style={{ width: "90px" }}
                          />
                        </TableCell>
                        <TableCell p={0} align="right">
                          <IconButton
                            sx={{ p: 0 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteMedia(media);
                            }}
                          >
                            <DeleteIcon sx={{ color: "secondary.main" }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </ReactSortable>
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
