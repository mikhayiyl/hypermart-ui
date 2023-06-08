import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import "./user.css";
import withRouter from "../../../../utilities/withRouter";
import FormExtension from "../../../../Forms/FormExtention";
import Joi from "joi-browser";
import removeEmptyValues from "../../../../utilities/RemoveKeys";
import asyncErrors from "../../../../middleware/AsyncErrors";
import { getUser, updateUser } from "../../../../apiServices/userService";
import { format } from "timeago.js";
import { toast } from "react-toastify";
import logger from "../../../../apiServices/logger";
import { uploadImage } from "../../Firebase";


class User extends FormExtension {
  state = {
    data: { username: "", email: "", password: "", image: "", phone: "", location: "", isAdmin: "", isStaff: "" },
    errors: {}
  }

  schema = {
    _id: Joi.string(),
    createdAt: Joi.string(),
    username: Joi.string().required().min(5).label("Username"),
    email: Joi.string().required().min(5).email().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    image: Joi.optional().allow({} || "").label("Image"),
    phone: Joi.string().optional().allow('').label("Phone"),
    location: Joi.string().optional().allow('').label("Address"),
    isAdmin: Joi.boolean().optional().allow('').label("Admin"),
    isStaff: Joi.boolean().optional().allow('').label("Staff"),
  };

  userId = this.props.params.id;



  populateUser = asyncErrors(async () => {
    if (this.userId === "new") return;

    const { data: product } = await getUser(this.userId);

    this.setState({ data: this.mapToViewModel(product) });

  });






  componentDidMount() {
    this.populateUser();
  }


  mapToViewModel(user) {
    const obj = {
      _id: user._id,
      createdAt: user.createdAt,
      username: user.username,
      email: user.email,
      password: '',
      isAdmin: user.isAdmin,
      isStaff: user.isStaff,
    };

    if (user.address.location) obj.location = user.address.location;
    if (user.address.phone) obj.phone = user.address.phone;
    if (user.image) obj.image = user.image;

    return obj;

  }

  doSubmit = async (data) => {

    const obj = {
      ...data
    };
    removeEmptyValues(obj);

    if (obj.location && !obj.phone) obj.address = { location: obj.location };
    if (obj.phone && !obj.location) obj.address = { phone: obj.phone };
    if (obj.location && obj.phone) obj.address = { location: obj.location, phone: obj.phone };

    delete obj.phone;
    delete obj.location;
    delete obj.createdAt;



    if (obj.image && obj.image.name) {

      const doSubmit = async (firebaseUrl) => {
        console.log({ firebaseUrl })

        // try {


        //   console.log({ imageUrl })
        //   await updateUser({ ...obj, image: firebaseUrl });

        //   toast.info('success');

        //   window.location.replace("/admin/users");
        // } catch (error) {
        //   logger.log(error);
        // }
      }

      uploadImage(obj.image, doSubmit);

    } else {
      try {
        await updateUser(obj);
        toast.info('success');
        window.location.replace("/admin/users");
      } catch (error) {
        logger.log(error);
      }

    }





  };


  render() {
    const { username, image, createdAt, email, location, phone, isAdmin, isStaff } = this.state.data;
    const id = this.userId === "new";

    return (
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">{id ? "Create User" : "Edit User"}</h1>
        </div>
        <div className="userContainer">
          {!id && <div className="userShow">
            <div className="userShowTop">
              {image && <img
                src={image.name ? URL.createObjectURL(image) : image} alt={username}
                className="userShowImg"
              />}
              <div className="userShowTopTitle">
                <span className="userShowUsername">{username}</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{(isAdmin && "Admin") || (isStaff && "Staff") || "User"}</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">{format(createdAt)}</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">{phone}</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{email}</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">{location}</span>
              </div>
            </div>
          </div>}
          <div className="userUpdate">
            <h2 className="userUpdateTitle">User Details</h2>
            <form className="userUpdateForm" onSubmit={this.handleSubmit}>
              <div className="userUpdateLeft">
                {this.renderInput("username", "Username")}
                {this.renderInput("email", "Email")}
                {this.renderInput("password", "Password", "password")}
                {this.renderInput("phone", "Phone")}
                {this.renderInput("location", "Address")}
                {this.renderInput("isAdmin", "Admin")}
                {this.renderInput("isStaff", "Staff")}
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  {image && <img
                    className="userUpdateImg"
                    src={image.name ? URL.createObjectURL(image) : image} alt={image}
                  />}
                  <label htmlFor="file" className="publish">
                    <Publish className="userUpdateIcon" /> <small>{id ? "Add Image" : "Update Image"}</small>
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} onChange={(e) => this.setState({ data: { ...this.state.data, image: e.target.files[0] } })} />
                </div>
                {this.renderButton(id ? "create" : "Update")}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(User);