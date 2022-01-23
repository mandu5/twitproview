import "./App.css";
import Routers from "./Router";
import { Helmet, HelmetProvider } from "react-helmet-async";
import favicon from "./routes/twitter.svg";

function App() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Twitproview</title>
          <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
        </Helmet>
      </HelmetProvider>
      <Routers />
    </>
  );
}

export default App;
