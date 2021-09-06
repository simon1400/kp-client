const Login = ({handleType}) => {
  return (
    <div className="form-canvas-wrap">
      <div class="uk-margin">
        <label class="uk-form-label" for="form-stacked-text">e-mail</label>
        <div class="uk-form-controls">
          <input class="uk-input" id="form-stacked-text" type="email" />
        </div>
      </div>
      <div class="uk-margin uk-margin-small-bottom">
        <label class="uk-form-label" for="form-stacked-text">heslo</label>
        <div class="uk-form-controls">
          <input class="uk-input" id="form-stacked-text" type="password" />
        </div>
      </div>
      <a href="/" className="link-bold" onClick={e => handleType(e, 'forgot')}>Zapomněli jste heslo?</a>
      <div className="uk-margin-medium">
        <a href="/" className="button uk-width-1-1">přihlásit se</a>
      </div>
      <hr />
      <div className="uk-text-center uk-margin">
        <p>Nemáte ještě účet? <a href="/" className="link-bold" onClick={e => handleType(e, 'singup')}>Registrace</a></p>
      </div>
    </div>
  )
}

export default Login
