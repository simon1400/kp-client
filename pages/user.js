import {useState, useEffect, useContext} from 'react'
import { DataStateContext } from '../context/dataStateContext'
import loadable from '@loadable/component'
import errorMessages from '../data/errorMessages'
import { useMutation } from "@apollo/client";
import userQuery from '../queries/user'
import {updateUserQuery} from '../queries/auth'
import {notification} from 'uikit'
import { client } from '../lib/api';

const Page = loadable(() => import('../layout/Page'))
const InfoForm = loadable(() => import('../components/InfoForm'))
const FirmInfo = loadable(() => import('../components/FirmInfo'))

export async function getServerSideProps() {

  const { data } = await client.query({query: userQuery});

  return {
    props: { 
      global: data.global,
      navigation: data.navigation,
      data: data,
    }
  }
}

const User = () => {

  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)
  const [updateUser, { data: dataUpdatingUser }] = useMutation(updateUserQuery);

  const [state, setState] = useState({
    deliveryAnother: false,
    firmInfo: false
  })

  useEffect(() => {
    if(dataUpdatingUser){
      dataContextDispatch({ 
        state: {
          ...dataUpdatingUser.updateUsersPermissionsUser.data.attributes, 
          id: dataUpdatingUser.updateUsersPermissionsUser.data.id
        }, 
        type: 'user' 
      })
    }
  }, [dataUpdatingUser])

  const [error, setError] = useState({
    email: false,
    phone: false,
    name: false,
    surname: false,
    address: false,
    city: false,
    zip: false,
    state: false,
    nameCompany: false,
    ico: false,
    dic: false,
    exist: false,
    fields: false
  })

  const [contactInfo, setContactInfo] = useState({
    email: dataContextState?.user?.email || '',
    phone: dataContextState?.user?.phone || '',
    firstname: dataContextState?.user?.firstname || '',
    surname: dataContextState?.user?.surname || '',
    address: dataContextState?.user?.address || '',
    city: dataContextState?.user?.city || '',
    zip: dataContextState?.user?.zip || '',
    state: dataContextState?.user?.state || 'Česko',
  })

  const [anotherAddress, setAnotherAddress] = useState({
    email: dataContextState?.user?.anotherAddress?.email || '',
    phone: dataContextState?.user?.anotherAddress?.phone || '',
    firstname: dataContextState?.user?.anotherAddress?.firstname || '',
    surname: dataContextState?.user?.anotherAddress?.surname || '',
    address: dataContextState?.user?.anotherAddress?.address || '',
    city: dataContextState?.user?.anotherAddress?.city || '',
    zip: dataContextState?.user?.anotherAddress?.zip || '',
    state: dataContextState?.user?.anotherAddress?.state || 'Česko',
  })

  const [firmInfo, setFirmInfo] = useState({
    nameCompany: dataContextState?.user?.firmInfo?.nameCompany || '',
    ico: dataContextState?.user?.firmInfo?.ico || '',
    dic: dataContextState?.user?.firmInfo?.dic || ''
  })

  const handleUserInfo = (e) => {
    e.preventDefault()

    const dataSend = contactInfo

    if(anotherAddress.email.length) {
      dataSend.anotherAddress = anotherAddress
    }
    if(firmInfo.ico.length) {
      dataSend.firmInfo = firmInfo
    }

    updateUser({ variables: {
      id: dataContextState.user.id,
      data: dataSend
    }}).then(() => notification({
        message: 'Success update user!',
        status: 'success',
        pos: 'top-center',
        timeout: 10000
      })).catch(err => notification({
        message: 'Error update user',
        status: 'danger',
        pos: 'top-center',
        timeout: 10000
      }))
  }

  const logout = (e) => {
    e.preventDefault()
    dataContextDispatch({ state: {}, type: 'user' })
    dataContextDispatch({ state: '', type: 'token' })
    window.location.href = '/'
  }

  return (
    <Page className="user-content">
      <div className="uk-container uk-container-small">
        <h1 className="uk-h3 uk-margin-large-top">Kontatkní údaje</h1>

        <div className="uk-margin-medium-top">
          <InfoForm state={contactInfo} setState={setContactInfo} name="contact" error={error} setError={setError} errorMessages={errorMessages} title=""  />
        </div>

        <div className="uk-margin-medium-top margin-last-bottom">
          <div className="uk-grid uk-child-width-1-1" uk-grid="">

            <label className="uk-margin-small">
              <input className="uk-checkbox" type="checkbox" name="deliveryAnother" checked={state.deliveryAnother} onChange={e => setState({...state, deliveryAnother: !state.deliveryAnother})} />
              <span>Doručit na jinou adresu</span>
            </label>
            {state.deliveryAnother && <div className="uk-margin-small-bottom uk-margin-small-top">
              <InfoForm state={anotherAddress} setState={setAnotherAddress} name="another_adrress" title="" />
            </div>}

            <label className="uk-margin-small">
              <input className="uk-checkbox" type="checkbox" name="firmInfo" checked={state.firmInfo} onChange={e => setState({...state, firmInfo: !state.firmInfo})} />
              <span>Doplnit firemní údaje</span>
            </label>
            {state.firmInfo && <div className="uk-margin-small-bottom uk-margin-small-top">
              <FirmInfo state={firmInfo} setState={setFirmInfo} error={error} />
            </div>}

          </div>
        </div>
        <div className="buttons-wrap-user">
          <a href="/" className="uk-margin-top button" onClick={e => handleUserInfo(e)}>uložit změny</a>
          <a href="/" className="uk-margin-left button border-button" onClick={e => logout(e)}>Odhlasít</a>
        </div>
      </div>
    </Page>
  )
}

export default User
