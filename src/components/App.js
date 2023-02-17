import React from 'react';
import { Routes, Route, useNavigate} from 'react-router';
import { Header } from './Header.js';
import { Main } from './Main.js';
import { Footer } from './Footer.js';
import { ImagePopup } from './ImagePopup.js';
import { EditProfilePopup } from './EditProfilePopup.js';
import { EditAvatarPopup } from './EditAvatarPopup.js';
import { InfoTooltip } from './InfoTooltip.js';
import { UserContext } from '../contexts/CurrentUserContext.js';
import { api } from '../utils/Api.js';
import * as auth from '../utils/auth/auth'
import { AddPlacePopup } from './AddPlacePopup.js';
import { PopupWithConfirmation } from './PopupWithConfirmation.js';
import { Login } from './Login.js';
import { Register } from './Register.js';
import { ProtectedRoute } from './ProtectedRoute.js';


function App() {

  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = React.useState(false);
  const [isEditAvatarPopupOpened, setIsEditAvatarPopupOpened] = React.useState(false);
  const [isAddPlacePopupOpened, setIsAddPlacePopupOpened] = React.useState(false);
  const [isConfirmationPopupOpened, setIsConfirmationPopupOpened] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cardToDelete, setCardToDelete] = React.useState({});
  const [isCardPopupOpened, setIsCardPopupOpened] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [userProfile, setUserProfile] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [isLoadingScreenClosed, setIsLoadingScreenClosed] = React.useState(false);
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();

  function handleConfirmPopupOpen(card){
    setIsConfirmationPopupOpened(true);
    setCardToDelete(card);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpened(true);
  }

  function handleUpdateUser(userData) {
    api.setProfileData(userData)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка обращения к серверу ${err}`);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpened(true);
  }

  function handleUpdateAvatar(avatar) {
    api.setProfileAvatar(avatar)
    .then((newData) => {
      setCurrentUser(newData);
      closeAllPopups();
    })
    .catch(err => {
      console.log(`Ошибка обращения к серверу ${err}`);
    });
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpened(true);
  }

  function handleAddPlace(card) {
    api.addCard(card)
      .then((newCard) =>{
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка обращения к серверу ${err}`);
      });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpened(false);
    setIsEditAvatarPopupOpened(false);
    setIsAddPlacePopupOpened(false);
    setIsCardPopupOpened(false);
    setIsConfirmationPopupOpened(false);
    setIsInfoTooltipOpened(false);
    if (selectedCard.link) {
      setTimeout(() => setSelectedCard({}), 500); //не убираю картинку пока показывается анимация закрытия попапа
    }
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsCardPopupOpened(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(`Ошибка обращения к серверу ${err}`);
      });
  }

  function handleConfirmRemove() {
    api.deleteCard(cardToDelete._id)
      .then(() => {
        setCards((state) => state.filter((oldCard) => oldCard._id !== cardToDelete._id));
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка обращения к серверу ${err}`);
      });
  }

  function handleClickOnPopup(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
      closeAllPopups();
    }
  }

  const closeByEsc = (e) => {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  };

  function onRegister({password, email}) {
    auth
      .register(password, email)
      .then((res) => {
        setLoggedIn(true);
        setIsError(false);
        setUserProfile(res.data.email);
        navigate('/');
        setIsInfoTooltipOpened(true);
        handleInitialLoading();
      })
      .catch((err) => {
        setErrorMessage(err.error);
        setIsInfoTooltipOpened(true);
        setIsError(true);
      });
  }

  function onLogin({password, email}) {
    auth
    .login(password, email)
    .then(() => {
      setLoggedIn(true);
      setIsError(false);
      navigate('/');
      setUserProfile(email);
      handleInitialLoading();
    })
    .catch((err) => {
      setErrorMessage(err.message);
      setIsInfoTooltipOpened(true);
      setIsError(true);
    });
  }

  const tokenCheck = async () => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      try {
        const res = await auth.getContent(token);
        if (res.data) {
          setLoggedIn(true);
          setUserProfile(res.data.email);
          navigate('/');
          handleInitialLoading();
        }
      } catch (err) {
        setLoggedIn(false);
        navigate('/sign-in');
      }
    }
  };

  function onLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserProfile('');
  }

  function handleInitialLoading() {
    Promise.all([api.getInitialCards(),api.getProfileData()])
    .then(([cards,user]) => {
      setCurrentUser(user);
      setCards(cards);
      setIsLoadingScreenClosed(true);
    })
    .catch(err => {
      console.log(`Ошибка обращения к серверу ${err}`);
    });
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (isAddPlacePopupOpened || isEditAvatarPopupOpened || isEditProfilePopupOpened || isCardPopupOpened || isConfirmationPopupOpened || isInfoTooltipOpened) {
      document.addEventListener('keydown', closeByEsc);
    }
    return () => document.removeEventListener('keydown', closeByEsc);
  }, [isAddPlacePopupOpened, isEditAvatarPopupOpened, isEditProfilePopupOpened, isCardPopupOpened, isConfirmationPopupOpened, isInfoTooltipOpened]);


  return (
    <div className="page">
      <UserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} userProfile={userProfile} onLogout={onLogout}/>
        <Routes>
          <Route path="/sign-up" element={<Register onRegister={onRegister}/>}/>
          <Route path="/sign-in" element={<Login onLogin={onLogin}/>}/>
          <Route exact path={"/"} element={
            <ProtectedRoute
              element={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete ={handleConfirmPopupOpen}
              cards={cards}
              loadingScreenStatus={isLoadingScreenClosed}
              loggedIn={loggedIn}
            />}
          />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpened}
          onClose={handleClickOnPopup}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpened}
          onClose={handleClickOnPopup}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpened}
          onClose={handleClickOnPopup}
          onAddNewCard={handleAddPlace}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isCardPopupOpened}
          onClose={handleClickOnPopup}
        />
        <PopupWithConfirmation
          isOpen={isConfirmationPopupOpened}
          onClose={handleClickOnPopup}
          onConfirmRemove={handleConfirmRemove}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpened}
          onClose={handleClickOnPopup}
          isError={isError}
          errorMessage={errorMessage}
        />
      </UserContext.Provider>
    </div>);
}

export default App;
