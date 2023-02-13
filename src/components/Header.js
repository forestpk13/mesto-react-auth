import headerLogo from '../images/header-logo.svg';

export function Header() {
  return (
    <header className="header">
      <img className="logo" src={headerLogo} alt="Логотип проекта Mesto" />
    </header>
  );
}
