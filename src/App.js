import Landing from './components/landingPage/landingReact';
import Explore from './components/explore/exploreReact';
import Login from './components/login/loginReact';
import BookDetails from './components/bookDetails/bookDetails'
import Cart from './components/cart/cartReact'
import Ccu from './components/ccu/ccuReact'
import Profile from './components/profile/profileReact'
import Wishlist from './components/wishlist/wishlistReact'
// import Cookies from "js-cookie";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import API from './api/api';
import { useEffect, useState } from 'react';

const App = () => {

  const [ user, setUser ] = useState();
  const fetchUser = async () => {
    const { data } = await axios.get(API + `user`, {
      withCredentials: true,
    });
    console.log("User");
    console.log(data);
    setUser(data);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/explore' component={Explore} />
        <Route exact path='/auth' component={() => user.username === undefined ? <Login /> : <Redirect to='/explore' />} />
        <Route exact path='/books/:id' component={BookDetails} />
        <Route exact path='/profile' component={() => user.username === undefined ? <Redirect to='/auth' /> : <Profile />} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/ccu' component={Ccu} />
        <Route exact path='/wishlist' component={Wishlist} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;