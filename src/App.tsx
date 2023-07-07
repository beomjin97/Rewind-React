import "swiper/css/bundle";
import Routing from "./routing/Routing";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Routing />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
