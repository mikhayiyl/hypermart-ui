import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../components/adminDashboard/Firebase';
import removeEmptyValues from '../../utilities/RemoveKeys';
import { PublishOutlined } from '@material-ui/icons';
import Joi from 'joi-browser';
import FormExtension from '../../Forms/FormExtention';
import { toast } from 'react-toastify';
import logger from '../../apiServices/logger';
import { updateUser } from '../../apiServices/userService';


class UpdateProfile extends FormExtension {
    state = {
        data: { username: "", email: "", password: "", image: "", phone: "", location: "", },
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
    };

    user = this.props.user;




    componentDidMount() {
        this.setState({ data: this.mapToViewModel(this.user) });
    }


    mapToViewModel(user) {
        const obj = {
            _id: user._id,
            createdAt: user.createdAt,
            username: user.username,
            image: user.image,
            email: user.email,
            password: '',
        };

        if (user.address.location) obj.location = user.address.location;
        if (user.address.phone) obj.phone = user.address.phone;

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
            const fileName = new Date().getTime() + obj.image.name;




            const storage = getStorage(app);
            const storageRef = ref(storage, fileName);

            const uploadTask = uploadBytesResumable(storageRef, obj.image);


            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                    logger.log(error);
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateUser({ ...obj, image: downloadURL });
                        toast.info('success');
                        window.location.reload();

                    }).catch(ex => logger.log(ex))
                }
            );

        } else {
            await updateUser(obj);
            toast.info('success');
            window.location.reload()
        }





    };


    render() {
        const { image } = this.state.data


        return (
            <form onSubmit={this.handleSubmit} className="form m-2">
                <div className='profile'>
                    <h2>Edit details</h2>
                    {image &&
                        <img
                            className='edit-image'
                            src={image.name ? URL.createObjectURL(image) : image} alt={image}
                        />
                    }
                    <div className="UpdateImage">
                        <label htmlFor="file" className="publish btn btn-sm btn-primary">
                            <PublishOutlined /> <small>Update Image</small>
                        </label>
                        <input type="file" id="file" style={{ display: "none" }} onChange={(e) => this.setState({ data: { ...this.state.data, image: e.target.files[0] } })} />
                    </div>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("email", "Email")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderInput("phone", "Phone")}
                    {this.renderInput("location", "Address")}
                    {this.renderButton("Edit")}

                </div>
            </form>
        )
    }
}
export default UpdateProfile;