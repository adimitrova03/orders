import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import LoginComponent from './components/login/login';
import DeliveryComponent from './components/delivery/delivery';
import {Layout} from 'react-mdl';
import HeaderComponent from './components/header/header';

function App() {
  return (
    <Layout fixedHeader>
      <HeaderComponent />
      <Router>
        <Switch>
          <Route path="/" exact component={LoginComponent} />
          <Route path="/delivery" exact component={DeliveryComponent} />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </Router>
    </Layout>  
  );
}

export default App;
