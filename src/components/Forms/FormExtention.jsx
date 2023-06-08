import React, { Component } from "react";
import Joi from "joi-browser";
import FormInput from "./FormInput";
import { Button } from "./FormStyles";

export default class FormExtension extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (!error) return null;
    let errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  handleChange =
    (input) =>
    ({ currentTarget: target }) => {
      const errors = { ...this.state.errors };

      const errorMessage = this.validateProperty(target);
      if (errorMessage) errors[target.name] = errorMessage;
      else delete errors[target.name];

      const { data } = this.state;
      data[input] = target.value;
      this.setState({ data, errors });
    };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit(this.state.data);
  };

  renderInput(name, label, sometext, type = "text") {
    const { data, errors } = this.state;

    return (
      <FormInput
        name={name}
        label={label}
        type={type}
        sometext={sometext}
        defaultValue={data[name]}
        error={errors[name]}
        onChange={this.handleChange(name)}
      />
    );
  }

  renderButton(label, color = "blue") {
    return (
      <Button disabled={this.validate()} color={color}>
        {label}
      </Button>
    );
  }
}
