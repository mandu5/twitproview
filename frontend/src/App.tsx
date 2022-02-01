import "./App.css";
import Routers from "./Router";
import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Twitproview</title>
        </Helmet>
      </HelmetProvider>
      <Routers />
    </>
  );
}

export default App;
