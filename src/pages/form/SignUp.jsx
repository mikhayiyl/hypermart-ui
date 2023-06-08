import { LockOpenOutlined, MailOutline, PersonOutline } from '@material-ui/icons';
import Joi from 'joi-browser';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { currentUser } from '../../apiServices/authService';
import { registerUser } from '../../apiServices/userService';
import FormExtension from '../../Forms/FormExtention';
import withRouter from '../../utilities/withRouter';

class SignUp extends FormExtension {
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
        delete data.password2
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
        if (currentUser()) return <Navigate to="/" />;
        const { data, errors } = this.state
        return (
            <div className="signup_form">
                <form onSubmit={this.handleSubmit}>
                    <h2>Sign Up</h2>

                    <div className="inputBox">
                        <input autoComplete='on' type="text" required
                            name="username"
                            defaultValue={data.username}
                            onChange={this.handleChange}
                            error={errors.username}

                        />
                        <PersonOutline className="icon" />
                        <span className="label">username</span>
                        {errors.username && <div className="inputBox alert alert-danger">{errors.username}</div>}

                    </div>
                    <div className="inputBox">
                        <input autoComplete='on' type="text" required
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
                        <LockOpenOutlined className="icon" />
                        <span className="label">password</span>
                        {errors.password && <div className="inputBox alert alert-danger">{errors.password}</div>}

                    </div>
                    <div className="inputBox">
                        <input autoComplete='on' type="password" required name="password2"
                            defaultValue={data.password2}
                            onChange={this.handleChange}
                            error={errors.password2} />
                        <LockOpenOutlined className="icon" />
                        <span className="label">Confirm password</span>
                        {errors.password2 && <div className="inputBox alert alert-danger">{errors.password2}</div>}

                    </div>
                    <div className="inputBox">
                        <input autoComplete='on' type="submit" value="Submit" />
                    </div>
                    <small>
                        Already have account ? <label htmlFor="toggle">Login</label>
                    </small>
                </form>
            </div>
        )
    }
}
export default withRouter(SignUp);