import { Box, GlobalStyles, Grid } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";

import { darkTheme } from "./themes/darkTheme.ts";
import { clairTheme } from "./themes/clairTheme.ts";
import Header from "./components/common/Header";
import NavBar from "./components/common/NavBar";
import Login from "./components/login/Login";
import { useEffect, useState } from "react";
import { useThemeMode, toggleTheme } from "./context/ThemeModeContext.js";
import "./styles/Global.css";
import DashBoard from "./components/dashboard/Dashboard.js";

function App() {
  const [token, setToken] = useState(null);
  const { themeMode, toggleTheme } = useThemeMode();

  const theme = themeMode === "dark" ? darkTheme : clairTheme;

  useEffect(() => {
    toggleTheme();
    setToken(localStorage.getItem("token"));
    console.log("theme", theme);
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: theme.palette.background.default,
          },
        }}
      />
      <Header themeMode={themeMode} />
      <Box className="mainContainer">
        {token ? (
          <>
            <Grid container className="gridComponentLittle">
              <DashBoard />
            </Grid>
          </>
        ) : (
          <Grid container className="gridComponentLittle">
            <Login />
          </Grid>
        )}
       
      </Box>
      <NavBar />
    </MuiThemeProvider>
  );
}

export default App;
