import React, {Component} from 'react';
import { withCookies } from 'react-cookie';

class Login extends Component {
  state = {
    credentials: {
      username: '',
      password: ''
    }
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
    }})
  }

  registerClicked = () => {
    console.log("I want to sign up!!!");
  }

  render(){
    return (
      <div className="App">
        <h1>Login</h1>
          <div>Username :</div>
          <input type="text" name="username" value={this.state.credentials.username} onChange={ event => this.onInputChange(event) } />
          <div>Password :</div>
          <input type="password" name="password" value={this.state.credentials.password} onChange={ event => this.onInputChange(event) } />
          <button onClick={() => this.loginClicked(this.state.credentials) }>Log In</button>
          <button onClick={() => this.cancleClicked() }>Cancle</button>
          <button onClick={() => this.registerClicked() }>Sign Up</button>
      </div>
    )
  }
}

export default withCookies(Login);