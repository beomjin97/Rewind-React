import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Container from "@mui/material/Container";

const Main = () => {
  return (
    <Container maxWidth="xl">
      <Header />
      {/* <Outlet /> */}
    </Container>
  );
};

export default Main;
