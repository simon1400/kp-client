import Login from './Login'
import SingUp from './SingUp'
import ForgotPassword from './ForgotPassword'

import { offcanvas, util } from 'uikit'

import {useState} from 'react'

const Auth = () => {

  const [type, setType] = useState('login')

  const handleType = (e, type) => {
    e.preventDefault()
    setType(type)
  }

  const closeCanvas = (e) => {
    e.preventDefault()
    offcanvas(util.find('#auth')).hide();
  }

  return (
    <div id="auth" className="uk-offcanvas" uk-offcanvas="flip: true; overlay: true;">
      <div className="uk-offcanvas-bar">
        <div className="uk-flex uk-flex-between">
          <div className="canvas-head uk-flex uk-flex-between uk-flex-middle">
            <h3>
              {type === 'login' && 'Přihlášení'}
              {type === 'singup' && 'Registrace'}
              {type === 'forgot' && 'Reset hesla'}
            </h3>
            <a href="/" onClick={e => closeCanvas(e)}><img className="uk-svg" src="/assets/times.svg" uk-svg="" /></a>
          </div>
        </div>
        <hr />

        {type === 'login' && <Login handleType={handleType}/>}
        {type === 'singup' && <SingUp handleType={handleType}/>}
        {type === 'forgot' && <ForgotPassword handleType={handleType}/>}

      </div>
    </div>
  )
}

export default Auth
