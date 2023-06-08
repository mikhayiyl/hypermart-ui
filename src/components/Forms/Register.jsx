import Joi from "joi-browser";
import { Navigate } from "react-router-dom";
import FormExtention from "./FormExtention";
import { toast } from "react-toastify";
import { Button, FormContainer, FormLink, FormWrapper } from "./FormStyles";
import Advert from "./Advert";
import auth from "../../apiServices/authService";
import { registerUser } from "../../apiServices/userService";

export default class Register extends FormExtention {
  state = {
    data: { username: "", email: "", password: "", password2: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().min(5).label("Username"),
    email: Joi.string().required().min(5).email().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    password2: Joi.string().required().min(5).label("Password"),
  };

  async doSubmit(data) {
    try {
      await registerUser(data);
      toast.success("Registered");
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = error.response.data;
        toast.warn(errors.email);
        this.setState({ errors });
      }
    }
  }

  render() {
    if (auth.currentUser()) return <Navigate to="/" />;
    return (
      <FormContainer>
        <Advert />
        <FormWrapper onSubmit={this.handleSubmit}>
          {this.renderInput(
            "username",
            "Username",
            "We'll never share your name with anyone else"
          )}
          {this.renderInput(
            "email",
            "Email address",
            "We'll never share your email with anyone else"
          )}

          {this.renderInput(
            "password",
            "Password",
            " never share your password with anyone else",
            "password"
          )}
          {this.renderInput(
            "password2",
            "Confirm Password",
            " never share your password with anyone else",
            "password"
          )}
          {this.renderButton("signup")}
          <FormLink to="/">
            <Button color="green">Login</Button>
          </FormLink>
        </FormWrapper>
      </FormContainer>
    );
  }
}
