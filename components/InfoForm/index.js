import React from 'react'
import country from '../../data/country'
import Input from '../Input'
import Select from '../Select'

const InfoForm = ({
  state, 
  setState, 
  name, 
  title, 
  error = {}, 
  setError = () => {}, 
  errorMessages, 
  onBlur = () => {}
}) => {

  const changeState = (name, value) => {
    setError({...error, [e.target.name]: false})
    setState({...state, [e.target.name]: e.target.value})
  }

  const handleSelect = (name, value) => {
    setState({...state, [name]: value})
  }

  return(
    <>
      {!!title.length && <div>
        <h2 className="uk-h4">{title}</h2>
        <hr />
      </div>}
      <div className="uk-grid uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s" uk-grid="">
        <Input 
          label="e-mail"
          error={error.email || error.exist}
          errorAlert={error.email}
          errorMessages={errorMessages.email}
          onBlur={onBlur}
          id={`email_${name}`}
          name="email"
          value={state.email}
          handle={changeState}
        />
        <Input 
          label="telefon"
          error={error.phone}
          errorAlert={error.phone}
          errorMessages={errorMessages.phone}
          onBlur={onBlur}
          id={`phone_${name}`}
          name="phone"
          value={state.phone}
          handle={changeState}
        />
      </div>
      <div className="uk-grid uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s" uk-grid="">
        <Input 
          label="jméno"
          error={error.name}
          errorAlert={error.name}
          errorMessages={errorMessages.name}
          id={`name_${name}`}
          name="name"
          value={state.name}
          handle={changeState}
        />
        <Input 
          label="příjmení"
          error={error.surname}
          errorAlert={error.surname}
          errorMessages={errorMessages.surname}
          id={`surname_${name}`}
          name="surname"
          value={state.surname}
          handle={changeState}
        />
      </div>
      <div className="uk-grid uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s" uk-grid="">
        <Input 
          label="ulice a č.p."
          error={error.address}
          errorAlert={error.address}
          errorMessages={errorMessages.address}
          id={`address_${name}`}
          name="address"
          value={state.address}
          handle={changeState}
        />
        <Input 
          label="město"
          error={error.city}
          errorAlert={error.city}
          errorMessages={errorMessages.city}
          id={`city_${name}`}
          name="city"
          value={state.city}
          handle={changeState}
        />
      </div>
      <div className="uk-grid uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s" uk-grid="">
        <Input 
          label="PSČ"
          error={error.zip}
          errorAlert={error.zip}
          errorMessages={errorMessages.zip}
          id={`zip_${name}`}
          name="zip"
          value={state.zip}
          handle={changeState}
        />
        <Select 
          label="stát"
          id={`state_${name}`}
          options={country}
          name="state"
          value={state.state}
          handle={handleSelect}
        />
      </div>
    </>
  )
}

export default InfoForm
