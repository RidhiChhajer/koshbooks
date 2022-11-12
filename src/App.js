import Landing from './components/landingPage/landingReact';
import Explore from './components/explore/exploreReact';
import Login from './components/login/loginReact';
import BookDetails from './components/bookDetails/bookDetails'
import Cart from './components/cart/cartReact'
import Ccu from './components/ccu/ccuReact'
import Profile from './components/profile/profileReact'
import Wishlist from './components/wishlist/wishlistReact'
import Loading from './components/Loading';
// import Cookies from "js-cookie";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import API from './api/api';
import { useEffect, useState } from 'react';

const App = () => {

  const [ load, setLoad ] = useState();
  const [ user, setUser ] = useState();
  const fetchUser = async () => {
    setLoad(false);
    const { data } = await axios.get(API + `user`, {
      withCredentials: true,
    });
    console.log("User");
    console.log(data);
    setUser(data);
    setLoad(true);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/explore' component={Explore} />
        <Route exact path='/auth' component={() => user === undefined && load ? <Login /> : user !== undefined && load ? <Redirect to='/explore' /> : <Loading />} />
        <Route exact path='/books/:id' component={BookDetails} />
        <Route exact path='/profile' component={() => user === undefined && load ? <Redirect to='/auth' /> : user !== undefined && load ? <Profile /> : <Loading />} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/ccu' component={Ccu} />
        <Route exact path='/wishlist' component={Wishlist} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;