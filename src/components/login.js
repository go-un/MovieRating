import React, {Component, Fragment} from 'react';
import { withCookies } from 'react-cookie';

class Login extends Component {
  state = {
    credentials: {
      username: '',
      password: ''
    },
    isLoginView: true
  }

  onInputChange = event => {
    let cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({credentials: cred});
  }

  loginClicked = cred => {
    /* Post data */
    fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(this.state.credentials)
    })
    .then( response => response.json())
    .then( result => {
      if(result.token) {
        this.props.cookies.set("mr-token", result.token);
        window.location.href = "/movies";
      } else {
        console.log("login failed!", result);
      }
    })
    .catch( error => console.log(error));
  }

  cancleClicked = () => {
    this.setState({credentials: {
      username: '',
      password: ''
    }, isLoginView: true})
  }

  registerClicked = () => {
    this.setState({isLoginView: false})
  }

  createAccount = account => {
    console.log("create", account)
    /* Post data */
    fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(this.state.credentials)
    })
    .then( response => response.json())
    .then( result => {
      alert("Welcome!");
      this.setState({isLoginView: true});
    })
    .catch( error => console.log(error));
  }

  render(){
    return (
      <div className="App">
        <h1>{ this.state.isLoginView ? 'Login' : 'Register' }</h1>
        <div>Username :</div>
        <input type="text" name="username" value={this.state.credentials.username} onChange={ event => this.onInputChange(event) } />
        <div>Password :</div>
        <input type="password" name="password" value={this.state.credentials.password} onChange={ event => this.onInputChange(event) } />
        {
          this.state.isLoginView ? 
            <Fragment>
              <button onClick={() => this.loginClicked(this.state.credentials) }>Log In</button>
              <button onClick={() => this.registerClicked() }>I don't have account...</button>
            </Fragment> :
            <Fragment>
              <button onClick={() => this.createAccount(this.state.credentials) }>Sign Up</button>
            </Fragment>
        }
        <button onClick={() => this.cancleClicked() }>Cancle</button>
      </div>
    )
  }
}

export default withCookies(Login);