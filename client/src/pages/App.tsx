import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import Store from "./pages/Store"; //Removed
import Home from "./pages/Home";
import About from "./pages/About";


function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          {/* <Route path="/store" component={Store} /> Removed */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;