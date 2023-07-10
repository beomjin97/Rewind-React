import { useState } from "react";
import { useRecoilState } from "recoil";
import { userType } from "../../types/user";
import { userState } from "../../store";
import MenuIcon from "@mui/icons-material/Menu";
import Search from "./Search";
import AuthButtons from "./AuthButtons";
import SideBar from "./SideBar";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

const Header = () => {
  const [userData, setUserData] = useRecoilState<userType>(userState);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <AppBar position="relative" color="transparent" className="p-4 rounded-md">
      <Grid container spacing={2}>
        <Grid item xs className="relative sm:text-center">
          <h1 className="text-5xl font-bold">
            <a href="/">Rewind</a>
          </h1>
          <IconButton
            type="button"
            aria-label="menu"
            className="!hidden sm:!block !absolute top-3"
            onClick={() => {
              setIsDrawerOpen(true);
              console.log("clicked");
            }}
          >
            <MenuIcon />
          </IconButton>
        </Grid>
        <Grid item xs className="sm:hidden">
          <Search />
        </Grid>
        <Grid item xs className="flex items-center justify-center sm:hidden">
          <AuthButtons />
        </Grid>
      </Grid>
      <SideBar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
    </AppBar>
  );
};

export default Header;
