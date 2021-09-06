const SingUp = ({handleType}) => {
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
      <p>Prohlašuji, že jsem se seznámil se <a href="/">Zásadami zpracování osobních údajů</a> i s <a href="/">obchodními podmínkami</a>.</p>
      <div className="uk-margin-medium">
        <a href="/" className="button uk-width-1-1">registrovat</a>
      </div>
      <hr />
      <div className="uk-text-center uk-margin">
        <p>Již máte účet? <a href="/" className="link-bold" onClick={e => handleType(e, 'login')}>Přihlásit se</a></p>
      </div>
    </div>
  )
}

export default SingUp
