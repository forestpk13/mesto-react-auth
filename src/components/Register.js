import { Link } from "react-router-dom";
export function Register() {

  return (
    <section className="content content_place_auth-screen">
      <form className="form form_place_auth-screen"
          id="login"
        >
          <h2 className="form__title form__title_place_auth-screen">Регистрация</h2>
          <fieldset className="form__fields">
            <label className="form__field">
              <input
                type="email"
                className="form__item form__item_place_auth-screen"
                name="email"
                placeholder="Email"
                required
              />
              <span className="form__error form__error_field_avatar-link"></span>
            </label>
            <label className="form__field">
              <input
                type="password"
                className="form__item form__item_place_auth-screen"
                name="password"
                placeholder="Пароль"
                minLength="7"
                required
              />
              <span className="form__error form__error_field_avatar-link"></span>
            </label>
          </fieldset>
          <button
            type="submit"
            className="button form__submit-button form__submit-button_place_auth-screen"
            name="login"
            value="Сохранить"
          >
            Зарегистрироваться
          </button>
          <Link className="form__bottom-link" to="/sign-in">Уже зарегистированы? Войти</Link>
        </form>
    </section>
  );
}