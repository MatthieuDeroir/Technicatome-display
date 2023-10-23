import React from 'react'
import { Box, Grid, IconButton, Paper, Stack, Typography } from '@mui/material'
import { t } from 'i18next'

import ImageIcon from '@mui/icons-material/Image';
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";



function SlideshowConfig(props) {
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
              /*   onClick={() => {
                  openAddSlideshowDialog();
                }} */
              >
                <AddIcon sx={{ color: "secondary.main" }} />
              </IconButton>
            </Box>
        </Stack>
        <Box
          className="containerPage"
          sx={{
            paddingLeft: { xs: 2, sm: 6 },
            paddingRight: { xs: 2, sm: 6 },
          }}
        >
         
        </Box>
      </Paper>
    </Grid>
  </>
  )
}

export default SlideshowConfig