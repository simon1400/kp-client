import {useState, useEffect, useContext} from 'react'
import useRegister from '../useRegister'
import { DataStateContext } from '../../../context/dataStateContext'
import { getUserQuery } from '../../../queries/auth'
import { useLazyQuery } from '@apollo/client'

const SingUp = ({handleType}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({
    email: false,
    password: false
  })
  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)
  const [register, response, loading] = useRegister();

  const [getUser, {data: user}] = useLazyQuery(getUserQuery)

  useEffect(() => {
    if(response) {
      console.log('Register.useEffect.response', response);
      getUser({
        variables: {
          id: response.register.user.id
        }
      })
      dataContextDispatch({ state: response.register.jwt, type: 'token' })
    }
  }, [response])

  useEffect(() => {
    if(user) {
      dataContextDispatch({ state: user.user, type: 'user' })
      window.location.href = '/user'
    }
  }, [user])

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    await register(email, password);

  }


  return (
    <div className="form-canvas-wrap">
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="form-stacked-text">e-mail</label>
        <div className="uk-form-controls">
          <input onChange={e => setEmail(e.target.value)} className="uk-input" id="form-stacked-text" type="email" value={email} />
        </div>
      </div>
      <div className="uk-margin uk-margin-small-bottom">
        <label className="uk-form-label" htmlFor="form-stacked-text">heslo</label>
        <div className="uk-form-controls">
          <input onChange={e => setPassword(e.target.value)} className="uk-input" id="form-stacked-text" type="password" value={password} />
        </div>
      </div>
      <p>Prohlašuji, že jsem se seznámil se <a href="/">Zásadami zpracování osobních údajů</a> i s <a href="/">obchodními podmínkami</a>.</p>
      <div className="uk-margin-medium">
        <a href="/" className="button uk-width-1-1" onClick={e => handleOnSubmit(e)}>registrovat</a>
      </div>
      <hr />
      <div className="uk-text-center uk-margin">
        <p>Již máte účet? <a href="/" className="link-bold" onClick={e => handleType(e, 'login')}>Přihlásit se</a></p>
      </div>
    </div>
  )
}

export default SingUp
