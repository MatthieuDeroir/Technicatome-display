import {Box, Grid, IconButton, Paper, Stack, Typography} from "@mui/material";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import React from "react";


function Preview() {
    const PREVIEW_URL = process.env.REACT_APP_DISPLAY_URL

    return (
        <>
            <Grid item xs={12}>
                <Paper className="mainPaperPage">
                    <Stack className="herderTitlePage">
                        <Box className="headerLeft">
                            <IconButton disabled className="headerButton">
                                <VideoLabelIcon sx={{color: "primary.light"}}/>
                            </IconButton>
                            <Typography
                                variant="h6"
                                sx={{color: "text.primary"}}
                                className="headerTitle"
                            >
                                Aperçu
                            </Typography>
                        </Box>
                    </Stack>
                    <Box
                        className="containerPage"
                        style={{display: "flex", justifyContent: "center"}}

                    >
                        <iframe
                            src={PREVIEW_URL}
                            title="Preview"
                            style={{border: "none", height: "288px", width: "576px"}}
                        ></iframe>
                    </Box>
                </Paper>
            </Grid>
        </>
    );
}

export default Preview;
