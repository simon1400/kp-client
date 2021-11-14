const Select = ({
  label,
  id,
  options,
  name,
  value,
  handle
}) => {
  return (
    <div>
      <label className="uk-form-label" htmlFor={id}>{label}</label>
      <div className="uk-form-controls">
        <select 
          className="uk-select" 
          name={name}
          onChange={e => handle(e.target.name, e.target.value)} 
          value={value}
          id={id}>
          {options.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)}
        </select>
      </div>
    </div>
  )
}

export default Select