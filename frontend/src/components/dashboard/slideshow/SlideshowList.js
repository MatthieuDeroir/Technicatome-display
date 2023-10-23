import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { t } from "i18next";
import FolderIcon from "@mui/icons-material/Folder";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import { slideshowService } from "../../../services/SlideshowService";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteSlideshowDialog from "../../dialogs/DeleteSlideshowDialog";
import AddSlideshowDialog from "../../dialogs/AddSlideshowDialog";

function SlideshowList(props) {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [slideshows, setSlideshows] = useState([]);
  const [slideshowToDelete, setSlideshowToDelete] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await slideshowService.getSlideshow();
        const dataSlideshow = data.data.slideshows;
        setSlideshows(dataSlideshow);
      } catch (error) {
        console.error("Erreur lors de la récupération du slideshow:", error);
      }
    }
    fetchData();
  }, []);

  async function AddSlideshow(name) {
    const data = { name: name };
    await slideshowService.createSlideshow(data).then((data) => {
      console.log("data", data);
      setSlideshows([...slideshows, data.data.slideshow]);
      closeDialog();
    });
  }

  function openDeleteDialog(slideshow) {
    console.log("slideshow", slideshow.name);
    setDeleteDialogOpen(true);
    setSlideshowToDelete(slideshow);
  }

  async function deleteSlideshow(eventToDelete) {
    console.log("eventToDelete", eventToDelete);
    await slideshowService.deleteSlideshow(eventToDelete).then((data) => {
      setSlideshows(
        slideshows.filter((slideshow) => slideshow._id !== eventToDelete)
      );
      closeDialog();
      setSlideshowToDelete({});
    });
  }

  function closeDialog() {
    setDeleteDialogOpen(false);
    setAddDialogOpen(false);
  }

  

  return (
    <>
      <Grid item xs={12}>
        <Paper className="mainPaperPage">
          <Stack className="herderTitlePage">
            <Box className="headerLeft">
              <IconButton disabled className="headerButton">
                <FolderIcon sx={{ color: "primary.light" }} />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ color: "text.primary" }}
                className="headerTitle"
              >
                {t("Slideshow")}
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

           {/*  <input
              type="file"
              id="inputFile"
              style={{ display: "none" }}
              onChange={goToCrop}
            /> */}
            </Box>
          </Stack>
          <Box className="containerPage">
            {slideshows && slideshows.length ? (
              <Box className="containerPage">
                {slideshows.map((slideshow) => (
                  <Table size="big" key={slideshow._id}>
                    <TableBody>
                      <TableRow hover>
                        <TableCell
                          onClick={(e) => {
                            e.stopPropagation();
                            props.setSlideshow(slideshow);
                          }}
                        >
                          {slideshow.name}
                        </TableCell>
                        <TableCell sx={{ p: 0 }} align="right">
                          <IconButton
                            sx={{ p: 0 }}
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              openDeleteDialog(slideshow);
                            }}
                          >
                            <DeleteIcon
                              sx={{ fontSize: 15, color: "secondary.main" }}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                ))}
              </Box>
            ) : (
              <Box className="infoPage">
                <Typography sx={{ color: "text.secondary" }}>
                  {t("slideshowListEmptyText")}
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Grid>
      <DeleteSlideshowDialog
        open={deleteDialogOpen}
        onClose={closeDialog}
        onDelete={deleteSlideshow}
        slideshowToDelete={slideshowToDelete && slideshowToDelete}
      />
      <AddSlideshowDialog
        open={addDialogOpen}
        onClose={closeDialog}
        AddSlideshow={AddSlideshow}
      />
    </>
  );
}

export default SlideshowList;
