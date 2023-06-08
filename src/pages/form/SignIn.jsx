import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { currentUser, Login } from "../../apiServices/authService";
import FormExtension from '../../Forms/FormExtention'
import withRouter from "../../utilities/withRouter";
import { LockOutlined, MailOutline } from "@material-ui/icons";

class SignIn extends FormExtension {
    state = {
        data: {},
        errors: {}
    }

    location = this.props.location;


    schema = {
        email: Joi.string().required().email().label("Email Address"),
        password: Joi.string().required().min(5).label("Password"),
    };



    async doSubmit(data) {

        try {
            await Login(data);

            toast.success("Success");

            const location = this.props.location;
            window.location = (location.state ? this.props.location.state.from.pathname : location.pathname);


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
        const { data, errors } = this.state;



        if (currentUser()) return <Navigate to="/" replace={true} />;

        return (
            <div className="signin_form">
                <form onSubmit={this.handleSubmit} className="form">
                    <h2>Sign In</h2>
                    <div className="inputBox">
                        <input type="text" required
                            autoComplete='on'
                            name="email"
                            defaultValue={data.email}
                            onChange={this.handleChange}
                            error={errors.email}
                        />
                        <MailOutline className="icon" />
                        <span className="label">Email Adress</span>
                        {errors.email && <div className="inputBox alert alert-danger">{errors.email}</div>}
                    </div>
                    <div className="inputBox">
                        <input autoComplete='on' type="password" required name="password"
                            defaultValue={data.password}
                            onChange={this.handleChange}
                            error={errors.password} />
                        <LockOutlined className="icon"></LockOutlined>
                        <span className="label">password</span>
                        {errors.password && <div className="inputBox alert alert-danger">{errors.password}</div>}

                    </div>
                    <div className="inputBox">
                        <input type="submit" value="Login" />
                    </div>
                    <small
                    >Don't have an account? <label htmlFor="toggle">Register</label>
                    </small>
                </form>
            </div>)
    }
}
export default withRouter(SignIn);