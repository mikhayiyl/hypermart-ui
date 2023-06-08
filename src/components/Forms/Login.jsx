import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import FormExtension from "./FormExtention";
import { Button, FormContainer, FormLink, FormWrapper } from "./FormStyles";
import Advert from "./Advert";
import auth from "../../apiServices/authService";
import WithRouter from "../../utilities/withRouter"

class Login extends FormExtension {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email Address"),
    password: Joi.string().required().min(5).label("Password"),
  };

  async doSubmit(data) {

    try {
      await auth.Login(data);
      toast.success("success");
      const { from: location } = this.props.location.state;
      window.location = location.pathname || "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = error.response.data;
        toast.error(errors.email);
        this.setState({ errors });
      }
    }
  }



  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    if (auth.currentUser()) return <Navigate to={from} replace={true} />;
    return (
      <FormContainer>
        <Advert />
        <FormWrapper onSubmit={this.handleSubmit} className="form">
          <h1>Login</h1>
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
          {this.renderButton("Login")}
          <FormLink to="/password">Forgot Password</FormLink>
          <FormLink to="/register">
            <Button color="green">Create New Account</Button>
          </FormLink>
        </FormWrapper>
      </FormContainer>
    );
  }
}



export default WithRouter(Login);