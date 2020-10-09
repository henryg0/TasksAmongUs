import React from 'react'; 
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import init_auth from './utils/init.auth';

import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home/Home';
import Todos from './pages/Todos/Todos';
import Social from './pages/Social';
import Template from './pages/Template';
import ErrorPage from './pages/ErrorPage';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.initAuth = init_auth;
  }
  
  componentDidMount() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.onload = () => this.initAuth();
    document.body.appendChild(script);
  }

  render() {  
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/todos" exact component={Todos} />
          <PrivateRoute path="/social" exact component={Social} />
          <PrivateRoute path="/template" exact component={Template} />
          <Route path="/" component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    )
  }
}
