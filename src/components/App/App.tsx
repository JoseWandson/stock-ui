import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import ProductsView from '../../views/ProductsView';
import LoginView from '../../views/LoginView';
import NotFoundView from '../../views/NotFoundView';
import ProfileView from '../../views/ProfileView';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/products" />
          </Route>
          <Route path="/products/:id?" exact component={ProductsView} />
          <Route path="/login" exact component={LoginView} />
          <Route path="/profile" exact component={ProfileView} />
          <Route component={NotFoundView} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
