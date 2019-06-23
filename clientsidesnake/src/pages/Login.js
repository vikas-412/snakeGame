import React from 'react';
import TextField from '@material-ui/core/TextField';
import AuthCard from './AuthCard';
import Button from '@material-ui/core/Button';
import { login, resetTest } from '../services/auth'

const initialState = {
  email: '',
  password: '',
  errors: {
    invalidEmail: false,
    invalidPassword: false
  }
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      ...initialState
    }
  }
  handleReset = () => {
    // let client_secret = 'f5da19c73f63b1cf9544bfa434d7f997f180ebc5';
    let source = "import sys;print(sys.path)";
    let client_secret = 'f5da19c73f63b1cf9544bfa434d7f997f180ebc5';
    let lang = "PYTHON";
      let data = {
        client_secret: 'f5da19c73f63b1cf9544bfa434d7f997f180ebc5',
        async: 0,
        source: source,
        lang: "PYTHON",
        time_limit: 5,
        memory_limit: 262144
      }
    // this.setState({...initialState});
    resetTest(client_secret,lang,source, data);
  }

  handleOnChange = (key, value) => {
    this.setState({ [key]: value });
  }
  handleValidation = () => {
    let errors = this.state.errors;
    let valid = true;
    if (this.state.password.length < 6) {
      errors.invalidPassword = true;
      valid = false;
    } else {
      errors.invalidPassword = false;
    }
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (re.test(this.state.email)) {
      errors.invalidEmail = false;
    } else {
      errors.invalidEmail = true;
      valid = false;
    }
    this.setState({
      errors: errors
    })
    console.log(errors);
    return valid;
  }
  handleLogin = () => {
    if (this.handleValidation()) {
      login(this.state.email, this.state.password)
        .then(res => {
          if (res.status) {
            alert('Login success');
          } else {
            alert(res.message);
          }
        })
    }
  }
  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <AuthCard>
        {classes => (
          <div>
            <TextField label="Email" className={classes.textField} type="text" margin="normal" onChange={(e) => { this.handleOnChange('email', e.target.value) }} />
            {errors.invalidEmail && <p>Email is invalid</p>}
            <TextField label="Password" className={classes.textField} type="password" margin="normal" onChange={(e) => { this.handleOnChange('password', e.target.value) }} />
            {errors.invalidPassword && <p>Password must be 6 character long</p>}

            <div className={classes.right}>
              <Button variant="contained" color="secondary" onClick={this.handleReset} className={classes.button}>
                Resettest
              </Button>
              <Button variant="contained" color="primary" onClick=
                {this.handleLogin} className={classes.button}>
                Login
              </Button>
            </div>
          </div>
        )}
      </AuthCard>
    );
  }
}


export default Login;
