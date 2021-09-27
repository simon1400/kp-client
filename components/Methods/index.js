import React from 'react'

const Method = ({
  title,
  state,
  setState,
  errorMessages,
  error,
  name,
  pickupData = false,
  getPickup = () => {}
}) => {

  const selectRadio = (index) => {
    const newState = [...state]
    newState.map(item => item.check = false)
    newState[index].check = true
    setState([...newState])
  }

  return (
    <div className="methods uk-margin-medium-bottom">
      <table className="uk-table uk-table-middle uk-table-divider uk-margin-remove">
        <caption>{title}{!!error[name] && <span className="uk-text-danger">{errorMessages[name]}</span>}</caption>
        <tbody>
          {state.map((item, index) => <tr key={index} className={`checkout-item ${item.disabled && 'disabled-check-item'}`}>
            <td className="uk-flex uk-flex-between">
              <div className="uk-form-controls radio-wrap">
                <label>
                  <input className="uk-radio" type="radio" name={item.name} disabled={item.disabled} value={item.value} onChange={() => selectRadio(index)} checked={item.check} />
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
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default Method
