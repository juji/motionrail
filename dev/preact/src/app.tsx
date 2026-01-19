import Router from "preact-router";
import Home from "./pages/Home";
import Arrows from "./pages/Arrows";
import Dots from "./pages/Dots";
import Logger from "./pages/Logger";
import Thumbnails from "./pages/Thumbnails";

export function App() {
  return (
    <Router>
      <Home path="/" />
      <Arrows path="/arrows" />
      <Dots path="/dots" />
      <Logger path="/logger" />
      <Thumbnails path="/thumbnails" />
    </Router>
  );
}
