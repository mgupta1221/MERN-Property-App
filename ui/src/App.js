import React from 'react';
import './App.css';
import {
  Switch,
  Route,
  withRouter,
  Redirect
} from "react-router-dom";
import LogIn from './Components/Login/login';
import Header from './Components/Common/Header/header';
import ProductList from './Components/ProductList/productList';
import authClient from './Auth/Auth';
import UserHome from './Components/UserHome/userHome';
import ProductDetail from './Components/ProductDetail/productDetail';
function App(props) {

  return (
    <div>
      {
        props.location.pathname !== '/' ? <Header /> : ''
      }
      <Switch>
      <Route  path="/productList" render={
        (props) => <ProductList {...props} key={Math.random()}/>} />       
        <Route path="/userHome">
          <UserHome />
        </Route>
        <Route path="/productDetail/:id">
          <ProductDetail />
        </Route>
        <Route path="/">
          {
            authClient.isAuthenticated() ? <Redirect to='/userHome' /> : <LogIn />
          }
        </Route>
      </Switch>
    </div>
  );
}

export default withRouter(App);
