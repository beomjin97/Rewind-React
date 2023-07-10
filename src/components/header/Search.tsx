import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { searchUser } from "../../api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const search = async (e: React.KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.startsWith("#")) {
      navigate(`/?tag=${searchTerm.slice(1)}`);
    } else {
      try {
        const res = await searchUser(searchTerm);
        navigate(`/user/${res.data.userId}`);
      } catch (error) {
        navigate("/user/NotFound");
        console.log(error);
      }
    }
  };

  return (
    <Paper component="form" className="flex align-center">
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
  );
};

export default Search;
