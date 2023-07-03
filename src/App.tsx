import "swiper/css/bundle";
import Routing from "./routing/Routing";
import useAuthUser from "./hooks/useAuthUser";

function App() {
  useAuthUser();
  return <Routing />;
}

export default App;
