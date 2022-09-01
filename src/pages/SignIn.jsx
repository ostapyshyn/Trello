import { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import OAuth from '../components/OAuth';
import { setUser } from '../store/slices/userSlice';

import board from '../assets/back-img-min.jpg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';

function SignIn() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      dispatch(
        setUser({
          email: user.email,
          id: user.uid,
          token: user.accessToken,
          name: user.displayName,
        }),
      );

      if (userCredential.user) {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      toast.error('Wrong User Credentials');
    }
  };

  return (
    <PageContainer>
      <LoginContainer>
        <header>
          <LoginTitle>Welcome Back!</LoginTitle>
        </header>
        <form onSubmit={onSubmit}>
          <input
            autoComplete="off"
            type="email"
            className="emailInput"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />

          <div className="passwordInputDiv">
            <input
              type={showPassword ? 'text' : 'password'}
              className="passwordInput"
              placeholder="Password"
              id="password"
              value={password}
              onChange={onChange}
            />

            <img
              src={visibilityIcon}
              alt="show password"
              className="showPassword"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>

          <Link to="/forgot-password" className="forgotPasswordLink">
            Forgot Password
          </Link>

          <div className="signInBar">
            <p className="signInText">Sign In</p>
            <button className="signInButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>
        <OAuth />
        <Link to="/sign-up" className="registerLink">
          Sign Up Instead
        </Link>
      </LoginContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  background-image: url(${board});

  height: 100vh;
  width: 100vw;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  --primary-light-hsl: 200, 100%, 91%;
  --primary-hsl: 200, 100%, 50%;
  --primary-dark-hsl: 200, 100%, 6%;
  --success-hsl: 100, 60%, 50%;
  --error-hsl: 0, 60%, 50%;
`;

const LoginContainer = styled.div`
  --color: hsl(var(--primary-dark-hsl), 0.7);
  background-color: var(--color);
  box-shadow: 0 0 15px 0 var(--color);
  padding: 40px 30px;
  width: 80%;
  max-width: 600px;
  border-radius: 20px;
`;

const LoginTitle = styled.h1`
  margin: 0;
  color: white;
  text-align: center;
  font-size: 2rem;
  font-weight: normal;
  margin-bottom: 2rem;
`;

export default SignIn;
