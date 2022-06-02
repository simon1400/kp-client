import { logMissingFieldErrors } from '@apollo/client/core/ObservableQuery'
import {useEffect, useState} from 'react'
import RadioState from '../RadioState'

const Method = ({
  title,
  state,
  setState,
  errorMessages,
  allow,
  error,
  name,
  radioCountry,
  resetFromDelivery,
  pickupData = false,
  getPickup = () => {}
}) => {

  const selectRadio = (index, reset = false) => {
    const newState = [...state]
    newState.map(item => item.check = false)
    if(!reset) {
      newState[index].check = true
    }
    setState([...newState])
    if(name == 'deliveryMethod') {
      resetFromDelivery()
    }
  }

  let disable = false

  useEffect(() => {
    selectRadio(0, true)
  }, [radioCountry])

  return (
    <div className="methods uk-margin-medium-bottom">
      <table className="uk-table uk-table-middle uk-table-divider uk-margin-remove">
        <caption>
          <span>{title}</span>
          {!!error[name] && <span className="uk-text-danger">{errorMessages[name]}</span>}
        </caption>
        <tbody>
          {state.map((item, index) => {

            if(allow !== 'all' && name !== "deliveryMethod") {
              let findElement = allow.find(e => e.title === item.label)
              if(findElement === undefined) disable = true
              else disable = false
            }else{
              disable = false
            }
            
            if(item.state === radioCountry) {
              return <tr key={index} className={`checkout-item${disable ? ' disabled-check-item' : ''}`}>
                <td className="uk-flex uk-flex-between">
                  <div className="uk-form-controls radio-wrap">
                    <label>
                      <input 
                        className="uk-radio" 
                        type="radio" 
                        name={item.name} 
                        disabled={disable} 
                        value={item.value} 
                        onChange={() => selectRadio(index)} 
                        checked={item.check} />
                      <span>{item.label}</span>
                    </label>
                    {item.check && item.type === 'zasilkovna' && pickupData && <div>
                      <p>Vybraná pobočka: {pickupData.name}</p>
                      <a href="/" onClick={e => {
                          e.preventDefault()
                          window.Packeta.Widget.pick('497b43a88a3af5e8', getPickup)
                        }}>Změnit pobočku</a>
                    </div>}
                  </div>
                  <div className="uk-text-right">
                    {item.value > 0 && <span className="price-method">{item.value} Kč</span>}
                    {item.value <= 0 && <span className="yellow-text">ZDARMA</span>}
                  </div>
                </td>
              </tr>
            }else{
              return null
            }
          })}
            
        </tbody>
      </table>
    </div>
  )
}

export default Method
