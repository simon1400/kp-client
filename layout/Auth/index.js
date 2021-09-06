import Login from './Login'
import SingUp from './SingUp'
import ForgotPassword from './ForgotPassword'

import {useState} from 'react'

const Auth = () => {

  const [type, setType] = useState('login')

  const handleType = (e, type) => {
    e.preventDefault()
    setType(type)
  }

  return (
    <div id="offcanvas-auth" className="uk-offcanvas" uk-offcanvas="flip: true; overlay: true;">
      <div className="uk-offcanvas-bar">
        <div className="uk-flex uk-flex-between">
          <div className="canvas-head uk-flex uk-flex-left uk-flex-middle">
            <h3>
              {type === 'login' && 'Přihlášení'}
              {type === 'singup' && 'Registrace'}
              {type === 'forgot' && 'Reset hesla'}
            </h3>
          </div>
          <button className="uk-offcanvas-close uk-close-large" type="button" uk-close=""></button>
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
