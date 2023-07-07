import React, { Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ErrorBoundary from "../pages/Error";
import NotFound from "../pages/NotFound";

const Auth = lazy(() => import("../pages/Auth"));
const Home = lazy(() => import("../pages/Home"));
const PostDetail = lazy(() => import("../pages/PostDetail"));
const Upload = lazy(() => import("../pages/Upload"));
const UserDetail = lazy(() => import("../pages/UserDetail"));
const Main = lazy(() => import("../components/common/Main"));

const Routing = () => {
  return (
    // TODO fallback 컴포넌트 제작
    <ErrorBoundary fallback={<p>에러 발생</p>}>
      <Suspense fallback={<p>로딩 중...</p>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<Home />} />
              <Route path="user/:userId" element={<UserDetail />} />
              <Route path="upload" element={<Upload />} />
              <Route path="update/:postId" element={<Upload />} />
            </Route>
            <Route path="auth" element={<Auth />} />
            <Route path="post/:postId" element={<PostDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Routing;
