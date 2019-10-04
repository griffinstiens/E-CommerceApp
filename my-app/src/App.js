import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import './App.css';
import SignInAndSignUpPage from './pages/sign-in-sign-out/sign-in-sign-out.component.jsx';
import { auth } from './firebase/firebase.utils.js';
import Header from './components/header/header.component.jsx';

class App extends React.Component {
  constructor() {
    super();

    //storing state of user in APP so we can pass it into components that will need access to it

    this.state = {
      currentUser: null
    }
  }
  //method by default equal to null
  unsubscribeFromAuth = null;

  componentDidMount() {
    //parameter is state of user -- opens subscription
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user});
      console.log(user);
    });
  }

  //closes subscription
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route path='/signin' component={SignInAndSignUpPage} />
          </Switch>
      </div>
    );
  }
}

export default App;
