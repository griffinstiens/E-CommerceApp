import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import './App.css';
import SignInAndSignUpPage from './pages/sign-in-sign-out/sign-in-sign-out.component.jsx';
import { auth, createUserProfileDocument } from './firebase/firebase.utils.js';
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
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {

        const userRef = await createUserProfileDocument(userAuth);

        /*
        We get a documentSnapshot object from our documentReference object. The documentSnapshot object allows us to check
        if a document exists at this query using the .exists property which returns a boolean. We can also get the actual properties on
        the object by calling the .data() method, which returns a JSON object of the document
        */
        userRef.onSnapshot(snapShot => {
          this.setState(
            {
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()
              }
            }
          );
          });   
      } else {
        this.setState({ currentUser: userAuth });
      }
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
