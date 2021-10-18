import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LanguageContext } from "./context/language";
import Home from './Home';

import './index.css';
import Navbar from './Navbar';
import Quiz from "./Quiz";
function App(props) {
  const [language, setLanguage] = useState("ro");
  const origin = (window.location.origin.includes("github")) ? "/md_constitution" : "";

  return (
    <LanguageContext.Provider value={{ language, setLanguage}}>
      <Router>
        <div>
          <Navbar />
          <Route exact path={origin + "/"} component={Home} />
          <Route path={origin + "/quiz"} component={Quiz} />

        </div>
      </Router>
    </LanguageContext.Provider>
  );
}

export default App;
