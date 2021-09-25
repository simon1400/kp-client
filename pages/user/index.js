import {useState, useEffect, useContext} from 'react'
import { DataStateContext } from '../../context/dataStateContext'
import loadable from '@loadable/component'
import errorMessages from '../../data/errorMessages'
import { useQuery, useMutation } from "@apollo/client";
import userQuery from '../../queries/user'
import {updateUserQuery} from '../../queries/auth'

const Page = loadable(() => import('../../layout/Page'))
const InfoForm = loadable(() => import('../../components/InfoForm'))
const FirmInfo = loadable(() => import('../../components/FirmInfo'))

const User = () => {

  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)
  const { loading, data } = useQuery(userQuery);
  const [updateUser, { data: dataUpdatingUser }] = useMutation(updateUserQuery);

  const [state, setState] = useState({
    deliveryAnother: false,
    firmInfo: false
  })

  useEffect(() => {
    if(dataUpdatingUser){
      dataContextDispatch({ state: dataUpdatingUser.updateUser.user, type: 'user' })
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
    name: dataContextState?.user?.name || '',
    surname: dataContextState?.user?.surname || '',
    address: dataContextState?.user?.address || '',
    city: dataContextState?.user?.city || '',
    zip: dataContextState?.user?.zip || '',
    state: dataContextState?.user?.state || 'Česko',
  })

  const [anotherAddress, setAnotherAddress] = useState({
    email: dataContextState?.user?.anotherAddress?.email || '',
    phone: dataContextState?.user?.anotherAddress?.phone || '',
    name: dataContextState?.user?.anotherAddress?.name || '',
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
    const dataSend = {
      ...contactInfo,
      anotherAddress,
      firmInfo
    }
    updateUser({ variables: {
      input: {
        where: {
          id: dataContextState.user.id
        },
        data: dataSend
      }
    }})
  }

  if(loading) return 'Loadding...'

  return (
    <Page globalData={data.global} nav={data.navigation}>
      <div className="uk-grid" uk-grid="">
        <div className="uk-width-1-4"></div>
        <div className="uk-width-1-2">
          <h1 className="uk-h3 uk-margin-large-top">Kontatkní údaje</h1>

          <div className="uk-margin-medium-top">
            <InfoForm state={contactInfo} setState={setContactInfo} name="contact" error={error} setError={setError} errorMessages={errorMessages} title=""  />
          </div>

          <div className="uk-margin-medium-top margin-last-bottom">
            <div className="uk-grid uk-child-width-1-1" uk-grid="">

              <label className="uk-margin-small">
                <input className="uk-checkbox" type="checkbox" name="deliveryAnother" checked={state.deliveryAnother} onChange={e => setState({...state, deliveryAnother: !state.deliveryAnother})} />
                Doručit na jinou adresu
              </label>
              {state.deliveryAnother && <div className="uk-margin-small-bottom uk-margin-small-top">
                <InfoForm state={anotherAddress} setState={setAnotherAddress} name="another_adrress" title="" />
              </div>}

              <label className="uk-margin-small">
                <input className="uk-checkbox" type="checkbox" name="firmInfo" checked={state.firmInfo} onChange={e => setState({...state, firmInfo: !state.firmInfo})} />
                Doplnit firemní údaje
              </label>
              {state.firmInfo && <div className="uk-margin-small-bottom uk-margin-small-top">
                <FirmInfo state={firmInfo} setState={setFirmInfo} error={error} />
              </div>}

            </div>
          </div>
          <div className="uk-grid uk-child-width-1-2" uk-grid="">
            <div>
              <a href="/" className="uk-margin-top button" onClick={e => handleUserInfo(e)}>uložit změny</a>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default User
