import { Helmet } from "react-helmet-async";
import Routers from "./Router";

import "./App.css"; // 전역 스타일링 (기존에 있다면 그대로 사용)

function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>AI X Post Simulator - Generate Realistic Twitter/X Posts</title>
      </Helmet>
      <Routers />
    </>
  );
}

export default App;
