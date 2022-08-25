import { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/init-firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import Spinner from '../components/Spinner';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

function CreateBoard() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
  });
  const { name } = formData;
  const { email } = useSelector((state) => state.user);

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  const goBack = () => navigate(-1);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate('/sign-in');
          toast.error('Please log in or sign up to create a board');
        }
      });
    }
    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataCopy = {
      ...formData,
      timestamp: serverTimestamp(),
      users: [email],
    };

    const docRef = await addDoc(collection(db, 'boards'), formDataCopy);
    setLoading(false);
    toast.success('Board saved');
    navigate(`/boards/${docRef.id}`);
  };

  const onMutate = (e) => {
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="profile">
      <BackButton onClick={goBack}>Go back</BackButton>
      <header>
        <p className="pageHeader">Create a Board</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <FormLabel>Board Name:</FormLabel>
          <FormInputName
            className="formInputName"
            type="text"
            id="name"
            value={name}
            onChange={onMutate}
            maxLength="32"
            minLength="3"
            required
          />

          <ButtonSubmit type="submit">Create a Board</ButtonSubmit>
        </form>
      </main>
    </div>
  );
}

const FormLabel = styled.label`
  font-weight: 600;
  margin-top: 1rem;
  display: block;
`;

const FormInputName = styled.input`
  background-color: #ffffff;
  font-weight: 600;
  border-radius: 1rem;
  font-size: 1rem;
  margin: 0.5rem 0.5rem 0 0;
  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  outline: none;
  font-family: 'Montserrat', sans-serif;

  padding: 0.9rem 1rem;
  width: 90%;
  max-width: 326px;
`;

const ButtonSubmit = styled.button`
  cursor: pointer;
  background: #00cc66;
  border-radius: 1rem;
  padding: 0.85rem 2rem;
  color: #ffffff;
  font-weight: 600;
  font-size: 1.25rem;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
`;

const BackButton = styled.button`
  min-width: 130px;
  height: 40px;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  overflow: hidden;
  border-radius: 5px;
  border: none;
  background-color: #3d348b;

  &:hover {
    border-radius: 5px;
    padding-right: 24px;
    padding-left: 8px;
  }

  &:hover:after {
    opacity: 1;
    right: 10px;
  }

  &:after {
    content: '←';
    position: absolute;
    opacity: 0;
    font-size: 20px;
    line-height: 40px;
    top: 0;
    right: -20px;
    transition: 0.4s;
  }
`;

export default CreateBoard;
