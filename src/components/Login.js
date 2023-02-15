import React from "react";

export function Login({onLogin}) {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  function onSubmit(e) {
    e.preventDefault();
    onLogin({
      password: passwordRef.current.value,
      email: emailRef.current.value
    });
  }

  return (
    <section className="content content_place_auth-screen">
      <form
        className="form form_place_auth-screen"
        id="login"
        onSubmit={onSubmit}
      >
        <h2 className="form__title form__title_place_auth-screen">Вход</h2>
        <fieldset className="form__fields">
          <label className="form__field">
            <input
              type="email"
              className="form__item form__item_place_auth-screen"
              name="email"
              placeholder="Email"
              ref={emailRef}
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
              ref={passwordRef}
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
          Войти
        </button>
      </form>
    </section>
  );
}
