import { Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ErrorBoundary from "../pages/Error";
import NotFound from "../pages/NotFound";
import Loading from "../components/fallback/Loading";

const Home = lazy(() => import("../pages/Home"));
const PostDetail = lazy(() => import("../pages/PostDetail"));
const Upload = lazy(() => import("../pages/Upload"));
const UserDetail = lazy(() => import("../pages/UserDetail"));
const Main = lazy(() => import("../components/common/Main"));

const Routing = () => {
  return (
    // TODO fallback 컴포넌트 제작
    <ErrorBoundary fallback={<p>에러 발생</p>}>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<Home />} />
              <Route path="user/:userId" element={<UserDetail />} />
              <Route path="upload" element={<Upload />} />
              <Route path="update/:postId" element={<Upload />} />
            </Route>
            <Route path="post/:postId" element={<PostDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Routing;
