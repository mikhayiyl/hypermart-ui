import { motion } from "framer-motion";
import SignIn from './SignIn';
import SignUp from './SignUp';
import "./style.scss";


const dropIn = {

    hidden: {
        y: "-100vh",
        opacity: 0,
    },

    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.2,
            type: "spring",
            damping: 15,
            stiffness: 500
        }
    },

    exit: {
        y: "100vh",
        opacity: 0,
    }
}







const Login = () => {
    const maxHeight = window.innerHeight;
    const maxWidth = window.innerWidth;

    return (
        <motion.div variants={dropIn}
            initial="hidden"
            animate="visible"
            drag
            dragConstraints={{
                top: 0,
                left: 0,
                right: maxWidth / 5, // adjust for element width
                bottom: maxHeight - 230, // adjust for element height
            }}
            exit="exit" className="FormContainer">
            <input autoComplete='on' type="checkbox" id="toggle" />
            <SignIn />
            <SignUp />
        </motion.div>
    )
}

export default Login














