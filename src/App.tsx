import "swiper/css/bundle";
import Routing from "./routing/Routing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { AuthService } from "./services/authService";
import { StorageService } from "./services/storageService";
import { API } from "./api";
import { PostProvider } from "./context/PostContext";
import { PostService } from "./services/postService";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});
const storageService = new StorageService(localStorage);
const authService = new AuthService(API, storageService);
const postService = new PostService(API);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider authService={authService}>
        <PostProvider postService={postService}>
          <Routing />
        </PostProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
