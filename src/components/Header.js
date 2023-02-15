import { Link, Routes, Route } from 'react-router-dom';
import headerLogo from '../images/header-logo.svg';


export function Header({loggedIn, userProfile, onLogout}) {

  return (
    <header className="header">
      <img className="logo" src={headerLogo} alt="Логотип проекта Mesto" />
      <Routes>
        <Route path="/sign-in" element={<Link className="header__link" to="/sign-up">Регистрация</Link>}/>
        <Route path="/sign-up" element={<Link className="header__link" to="/sign-in">Войти</Link>}/>
      </Routes>
      {loggedIn &&
        <div className="header__auth">
          <p className="header__auth-email">{userProfile}</p>
          <button className="header__auth-logout" onClick={onLogout}>Выйти</button>
        </div>}
    </header>
  );
}
