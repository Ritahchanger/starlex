import React from "react";

import Home from "./pages/user/Home/Home";

import ScrollProgress from "./components/ScrollProgress/ScrollProgress";

const App = () => {
  return (
    <div>
      <ScrollProgress />
      <Home />
    </div>
  );
};

export default App;
