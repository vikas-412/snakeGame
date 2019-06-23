import React from 'react';
import AuthCard from './AuthCard';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { signup } from '../services/auth';

const initialState = {
  email: '',
  password: '',
  confirmPassword: '',
  userName: '',
  errors: {
    invalidEmail: false,
    invalidPassword: false,
    invalidConfirmPassword: false
  }
}

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      ...initialState
    }
  }
  handleReset = () => {
    this.setState({...initialState});
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
    if (this.state.password!==this.state.confirmPassword){
      errors.invalidConfirmPassword = true;
      valid = false;
    } else {
      errors.invalidConfirmPassword = false;
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
  handleSignUp = () => {
    if (this.handleValidation()){
    signup({
      email: this.state.email,
      password: this.state.password,
      name: this.state.userName
    })
      .then(res => {
        console.log(res);
        if (res.status) {
          alert('Sign up success');
        } else {
          alert(res.message);
        }
      })
  }}
  render() {
    console.log(this.state);
    const {errors} = this.state;
    return (
      <AuthCard>
        {classes => (
          <div>
            <TextField label="User Name" className={classes.textField} onChange={(e) => { this.handleOnChange('userName', e.target.value) }} type="text" margin="normal" />
            <TextField label="Email" className={classes.textField} onChange={(e) => { this.handleOnChange('email', e.target.value) }} type="text" margin="normal" />
            {errors.invalidEmail && <p>Email is invalid</p>}
            <TextField label="Password" className={classes.textField} onChange={(e) => { this.handleOnChange('password', e.target.value) }} type="password" margin="normal" /> {errors.invalidPassword && <p>Password must be 6 characters long</p>}
            <TextField label="Confirm Password" className={classes.textField} onChange={(e) => { this.handleOnChange('confirmPassword', e.target.value) }} type="password" margin="normal" />{errors.invalidConfirmPassword && <p>Passwords typed are not same</p>}
            <div className={classes.right}>
              <Button disabled variant="contained" color="secondary" onClick={this.handleReset} className={classes.button}>
                Reset
            </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.handleSignUp}
              >
                SignUp
            </Button>
            </div>
          </div>
        )}
      </AuthCard>
    )
  }
}

export default SignUp;
