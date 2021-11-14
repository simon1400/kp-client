const Input = ({
  error = false,
  errorMessages = '',
  errorAlert = false,
  label = false,
  id,
  type = 'text',
  name,
  value,
  handle,
  onBlur
}) => {
  return (
    <div>
      {label && <label className="uk-form-label" htmlFor={id}>
        {label}
        {errorAlert && <span className="uk-text-danger">{errorMessages}</span>}
      </label>}
      <div className="uk-form-controls">
        <input 
          className={`uk-input ${error ? 'uk-form-danger' : ''}`} 
          id={id}
          type={type}
          onBlur={() => onBlur(name)}
          name={name}
          value={value} 
          onChange={e => handle(e.target.name, e.target.value)} />
      </div>
    </div>
  )
}

export default Input