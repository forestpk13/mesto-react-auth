import loader from '../images/loader.svg';

export function LoadingScreen({isClose}) {
  return (
    <div className ={`loading-screen${isClose ? '_disabled' : ''}`}>
      <img className ="loading-screen__loader" src={loader} alt="Экран загрузки" />
    </div>
  );
}