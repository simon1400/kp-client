const Login = ({handleType}) => {
  return (
    <div className="form-canvas-wrap">
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="form-stacked-text">e-mail</label>
        <div className="uk-form-controls">
          <input className="uk-input" id="form-stacked-text" type="email" />
        </div>
      </div>
      <div className="uk-margin uk-margin-small-bottom">
        <label className="uk-form-label" htmlFor="form-stacked-text">heslo</label>
        <div className="uk-form-controls">
          <input className="uk-input" id="form-stacked-text" type="password" />
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
