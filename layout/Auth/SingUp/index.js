import {useState, useEffect, useContext} from 'react'
import useRegister from '../useRegister'
import { DataStateContext } from '../../../context/dataStateContext'
import { getUserQuery, controlUser } from '../../../queries/auth'
import globalQuery from '../../../queries/global'
import { useLazyQuery, useQuery } from '@apollo/client'
import { alert, offcanvas, util } from 'uikit'
import { useRouter } from 'next/router'


const SingUp = ({handleType}) => {

  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({
    email: false,
    password: false,
    exist: false
  })
  const { dataContextDispatch } = useContext(DataStateContext)
  const [register, response, loading, errorReg] = useRegister();

  const [getUser, {data: user}] = useLazyQuery(getUserQuery)
  const [controlExistUser, {data: existUser}] = useLazyQuery(controlUser)
  const { loading: loadingGl, data: dataGl } = useQuery(globalQuery);

  useEffect(() => {
    if(response) {
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
      dataContextDispatch({ state: {...user.usersPermissionsUser.data.attributes, id: user.usersPermissionsUser.data.id}, type: 'user' })
      // axios.post('/api/mail/registration', {email}).catch((err) => {
      //   console.error('Send email registration', err)
      // })
      offcanvas(util.find('#auth')).hide();
      router.push('/user')
    }
  }, [user])

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await controlExistUser({
      variables: {
        email
      }
    })
  }

  const handleReg = async () => {
    await register(email, password);
  }

  useEffect(() => {
    if(existUser?.usersPermissionsUsers?.meta.pagination.total === 0){
      handleReg()
    }else if(existUser?.usersPermissionsUsers?.meta.pagination.total > 0){
      setError({...error, exist: true})
    }
  }, [existUser])

  const alertClose = (e) => {
    e.preventDefault()
    alert('#alert-exist').close()
    setError({...error, exist: false})
  }

  if(loadingGl) {
    return null
  }

  const gdpr = dataGl.global.data.attributes.gdpr
  const terms = dataGl.global.data.attributes.terms

  return (
    <div className="form-canvas-wrap">
      {error.exist && <div id="alert-exist" className="alert uk-alert-danger" uk-alert="">
        <a href="/" onClick={e => alertClose(e)}><img className="uk-svg" src="/assets/times.svg" uk-svg="" /></a>
        <p>Email už se používá, <a href="/" className="link-bold" onClick={e => handleType(e, 'login')}>přihlásit se?</a></p>
      </div>}
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
      <p>Prohlašuji, že jsem se seznámil se <a href={`/${gdpr.data.attributes.category.data[0].attributes.slug}/${gdpr.data.attributes.slug}`}>Zásadami zpracování osobních údajů</a> i s <a href={`/${terms.data.attributes.category.data[0].attributes.slug}/${terms.data.attributes.slug}`}>obchodními podmínkami</a>.</p>
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
