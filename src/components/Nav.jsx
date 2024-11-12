import { IconButton, StyledEngineProvider } from "@mui/material";
import React, { useState } from "react";
import {
  Toolbar,
  Typography,
  AppBar,
  Button,
  Menu,
  Box,
  MenuList,
  MenuItem,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const pages = [
  { title: "일기장", url: "/diary" },
  { title: "기록", url: "/record" },
  { title: "통계", url: "/analysis" },
  { title: "로그인", url: "/sign-in" },
];

const Nav = () => {
  const [anchorNav, setAnchorNav] = useState(null);
  const openMenu = (event) => {
    setAnchorNav(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorNav(null);
  };

  const customTheme = createTheme({
    palette: {
      background: { default: "#ffffff" },
      primary: { main: "#000000" },
    },
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={customTheme}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              color="inherit"
            >
              오늘의 하루
            </Typography>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {pages.map((page, index) => (
                <Button
                  component={Link}
                  to={page.url}
                  color="inherit"
                  key={page.title}
                >
                  {page.title}
                </Button>
              ))}
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                onClick={openMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorNav}
                open={Boolean(anchorNav)}
                onClose={closeMenu}
                sx={{ display: { xs: "flex", md: "none" } }}
              >
                <MenuList>
                  {pages.map((page, index) => (
                    <MenuItem component={Link} to={page.url} key={index}>
                      {page.title}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Box>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              오늘의 하루
            </Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Nav;