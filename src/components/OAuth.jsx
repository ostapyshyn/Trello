import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/init-firebase';
import { toast } from 'react-toastify';
import googleIcon from '../assets/svg/googleIcon.svg';
import styled from 'styled-components';
import { setUser } from '../store/slices/userSlice';
import { useDispatch } from 'react-redux';

function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      dispatch(
        setUser({
          email: user.email,
          id: user.uid,
          token: user.accessToken,
          name: user.displayName,
        })
      );

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate('/');
    } catch (error) {
      toast.error('Could not authorize with Google');
    }
  };

  return (
    <SocialLogin>
      <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with </p>
      <ButtonIcon onClick={onGoogleClick}>
        <GoogleImage src={googleIcon} alt="google"></GoogleImage>
      </ButtonIcon>
    </SocialLogin>
  );
}

const SocialLogin = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonIcon = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem;
  margin: 1.5rem;
  width: 3rem;
  height: 3rem;
  background-color: #ffffff;
  border-radius: 50%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
`;

const GoogleImage = styled.img`
  width: 100%;
`;

export default OAuth;
