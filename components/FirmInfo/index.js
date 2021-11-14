import React from 'react'
import Input from '../Input'

const FirmInfo = ({state, setState, title = "", error = {}}) => {

  const handle = (name, value) => {
    setState({...state, [name]: value})
  }

  return(
    <>
      {!!title.length && <div>
        <h2>{title}</h2>
      </div>}
      <div className="uk-grid uk-width-1-1 uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s" uk-grid="">
        <Input 
          label="Obchodní jméno"
          error={error.nameCompany}
          id="name_firm"
          name="nameCompany"
          value={state.nameCompany}
          handle={handle}
        />
        <Input 
          label="IČO"
          error={error.ico}
          id="ico_firm"
          name="ico"
          value={state.ico}
          handle={handle}
        />
        <Input 
          label="DIČ"
          id="dic_firm"
          name="dic"
          value={state.dic}
          handle={handle}
        />
      </div>
    </>
  )
}

export default FirmInfo
