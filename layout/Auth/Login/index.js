import {useState, useEffect, useContext} from 'react'
import { DataStateContext } from '../../../context/dataStateContext'
import { getUserQuery, loginQuery } from '../../../queries/auth'
import { useLazyQuery, useMutation } from '@apollo/client'

const Login = ({handleType}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)
  const [callMutation, {loading, data, error}] = useMutation(loginQuery);
  const [exist, setExist] = useState(false)

  const [getUser, {data: user}] = useLazyQuery(getUserQuery)

  useEffect(() => {
    if(data) {
      console.log('Login.useEffect.response', data);
      getUser({
        variables: {
          id: data.login.user.id
        }
      })
      dataContextDispatch({ state: data.login.jwt, type: 'token' })
    }
  }, [data])

  useEffect(() => {
    if(user) {
      console.log(user)
      dataContextDispatch({ state: user.user, type: 'user' })
      window.location.href = '/user'
    }
  }, [user])

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    callMutation({variables: {
      input: {
        identifier: email,
        password: password
      }
    }}).catch(err => setExist(true));
  }

  const alertClose = (e) => {
    e.preventDefault()
    alert('#alert-not-exist').close()
    setExist(false)
  }

  return (
    <div className="form-canvas-wrap">
      {exist && <div id="alert-not-exist" className="alert uk-alert-danger" uk-alert="">
        <a href="/" onClick={e => alertClose(e)}>
          <img className="uk-svg" src="/assets/times.svg" uk-svg="" />
        </a>
        <p>E-mail nebo heslo je špatné</p>
      </div>}
      <div className="uk-margin">
        <label className="uk-form-label" htmlFor="form-stacked-text">e-mail</label>
        <div className="uk-form-controls">
          <input onChange={e => setEmail(e.target.value)} value={email} className="uk-input" id="form-stacked-text" type="email" />
        </div>
      </div>
      <div className="uk-margin uk-margin-small-bottom">
        <label className="uk-form-label" htmlFor="form-stacked-text">heslo</label>
        <div className="uk-form-controls">
          <input onChange={e => setPassword(e.target.value)} value={password} className="uk-input" id="form-stacked-text" type="password" />
        </div>
      </div>
      <a href="/" className="link-bold" onClick={e => handleType(e, 'forgot')}>Zapomněli jste heslo?</a>
      <div className="uk-margin-medium">
        <a href="/" onClick={e => handleOnSubmit(e)} className="button uk-width-1-1">přihlásit se</a>
      </div>
      <hr />
      <div className="uk-text-center uk-margin">
        <p>Nemáte ještě účet? <a href="/" className="link-bold" onClick={e => handleType(e, 'singup')}>Registrace</a></p>
      </div>
    </div>
  )
}

export default Login
