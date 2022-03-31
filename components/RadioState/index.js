const RadioState = ({
  state,
  setState
}) => {
  return (
    <div className="radio-state">
      <label>
        <input 
          className="uk-radio" 
          type="radio" 
          name="state"  
          value="cz"
          onChange={() => setState("cz")} 
          checked={state === 'cz'} 
          />
        <span>Česká republika</span>
      </label>
      <label>
        <input 
          className="uk-radio" 
          type="radio" 
          name="state" 
          value="sk"
          checked={state === "sk"}
          onChange={() => setState("sk")} 
        />
        <span>Slovensko</span>
      </label>
    </div>
  )
}

export default RadioState