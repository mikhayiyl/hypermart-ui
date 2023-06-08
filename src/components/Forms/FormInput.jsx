const FormInput = ({ name, label, error, sometext, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input name={name} id={name} {...rest} className="form-control" />
      <small id={name} className="form-text text-muted">
        {sometext}
      </small>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default FormInput;
