import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import './App.css';
import SignInAndSignUpPage from './pages/sign-in-sign-out/sign-in-sign-out.component.jsx';
import CheckoutPage from './pages/checkout/checkout.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils.js';
import Header from './components/header/header.component.jsx';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
import { createStructuredSelector } from 'reselect';

class App extends React.Component {
  
  //method by default equal to null
  unsubscribeFromAuth = null;

  componentDidMount() {
    
    const { setCurrentUser } = this.props;
    //parameter is state of user -- opens subscription
    //using auth library from firebase, we listen for any changes on state, pass userAuth object
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {

        const userRef = await createUserProfileDocument(userAuth);

        /*
        We get a documentSnapshot object from our documentReference object. The documentSnapshot object allows us to check
        if a document exists at this query using the .exists property which returns a boolean. We can also get the actual properties on
        the object by calling the .data() method, which returns a JSON object of the document
        */
       //whenever snapobject changes, pass snapshot into setCurrentUser redux method to set currentUser object
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        }); 
      } else {
        setCurrentUser(userAuth);
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
        <Header />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)}/>
          </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
