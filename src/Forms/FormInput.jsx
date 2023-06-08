import "./style.css";
const FormInput = ({ name, label, error, ...rest }) => {
  return (
    <div className="Item">
      <label htmlFor={name}>{label}</label>
      <input name={name} id={name} {...rest} className="Input form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>

  );
};

export default FormInput;
