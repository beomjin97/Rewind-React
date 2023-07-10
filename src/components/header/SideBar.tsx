import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { Dispatch, SetStateAction } from "react";

interface Props {
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

const SideBar = ({ isDrawerOpen, setIsDrawerOpen }: Props) => {
  return (
    <Drawer
      anchor="left"
      open={isDrawerOpen}
      onClose={() => {
        setIsDrawerOpen(false);
      }}
    >
      <Paper component="form" className="flex pt-4 align-center">
        <TextField
          fullWidth
          color="info"
          id="filled-search"
          label="사용자 검색"
          type="search"
          variant="filled"
        />
        <IconButton type="button" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="회원가입" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="로그인" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

export default SideBar;
