/* eslint-disable react/jsx-max-depth */
import { connect } from 'react-redux';
import React from 'react';
import propTypes from 'prop-types';
import { emailAction } from '../redux/actions';

import './css/login.css';
import walletImg from '../images/walletImg.png';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    buttonChecker: true,
  };

  componentDidMount() {
    document.title = 'Login';
  }

  handleChange = ({ target }) => this.setState(
    { [target.name]: target.value },
    this.buttonChecker,
  );

  buttonChecker = () => {
    const { email, password } = this.state;
    const three = 3;
    const minimumOfCharacters = 6;
    if (email.includes('@')
    && email.split('@').length < three
    && email.includes('.com')
    && password.length >= minimumOfCharacters) {
      this.setState({ buttonChecker: false });
    } else {
      this.setState({ buttonChecker: true });
    }
  }

  logIn = () => {
    const { history: { push }, saveEmail } = this.props;
    const { email } = this.state;
    localStorage.setItem('email', email);
    saveEmail(email);
    push('/carteira');
  }

  render() {
    const { buttonChecker } = this.state;
    const sizeWidth = 600;
    return (
      <section className="main-login">
        <div className="flexible-horizon flex-gap100 div-main-form">
          { window.screen.width >= sizeWidth
            && (
              <>
                <img
                  src={ walletImg }
                  alt="My Wallet"
                  className="wallet-image-login"
                />
                <hr />
              </>
            )}
          <form
            className="Form"
            data-testid="form-login"
          >
            <h3 className="title-form-login">Login</h3>
            <div className="form-main">
              <div className="col-md-4 div-label-inputs">
                <label
                  htmlFor="email-input"
                  className="form-label"
                >
                  Email
                  <div className="div-inputs">
                    <span
                      className="input-group-text"
                      id="inputGroupPrepend"
                    >
                      <svg
                        id="i-mail"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        width="32"
                        height="32"
                        fill="none"
                        stroke="currentcolor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="svg-30p"
                      >
                        <path d="M2 26 L30 26 30 6 2 6 Z M2 6 L16 16 30 6" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      data-testid="email-input"
                      placeholder="xaolinmatadordeporco@example.com"
                      name="email"
                      id="email-input"
                      onChange={ this.handleChange }
                      className="form-control input-from-login input"
                    />
                  </div>
                </label>
              </div>
              <div className="col-md-4 div-label-inputs">
                <label
                  htmlFor="password"
                  className="form-label"
                >
                  Senha
                  <div className="div-inputs">
                    <span
                      className="input-group-text"
                      id="inputGroupPrepend"
                    >
                      <svg
                        id="i-lock"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        width="32"
                        height="32"
                        fill="none"
                        stroke="currentcolor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="svg-30p"
                      >
                        <path
                          d="M5 15 L5 30 27 30 27 15 Z M9 15 C9 9
                        9 5 16 5 23 5 23 9 23 15 M16 20 L16 23"
                        />
                        <circle cx="16" cy="24" r="1" />
                      </svg>
                    </span>
                    <input
                      type="password"
                      testid="email-input"
                      placeholder="biruleibeleibe"
                      name="password"
                      id="password"
                      data-testid="password-input"
                      onChange={ this.handleChange }
                      className="form-control input-from-login input"
                    />
                  </div>
                </label>
              </div>
            </div>
            <button
              className="btn btn-success"
              type="button"
              disabled={ buttonChecker }
              onClick={ this.logIn }
            >
              Entrar
            </button>
          </form>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  push: propTypes.func,
  saveEmail: propTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(emailAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
