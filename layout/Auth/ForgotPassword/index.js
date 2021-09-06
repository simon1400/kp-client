const ForgotPassword = ({handleType}) => {
  return (
    <div className="form-canvas-wrap">
      <p>Zadejte e-mailovou adresu svého účtu. My Vám zašleme odkaz pro změnu hesla.</p>
      <div class="uk-margin uk-margin-small-bottom">
        <label class="uk-form-label" for="form-stacked-text">e-mail</label>
        <div class="uk-form-controls">
          <input class="uk-input" id="form-stacked-text" type="email" />
        </div>
      </div>
      <div className="uk-margin-medium">
        <a href="/" className="button uk-width-1-1">poslat</a>
      </div>
      <hr />
      <div className="uk-text-center uk-margin">
        <a href="/" className="link-bold" onClick={e => handleType(e, 'login')}>Přihlásit k vašemu účtu</a>
      </div>
    </div>
  )
}

export default ForgotPassword
