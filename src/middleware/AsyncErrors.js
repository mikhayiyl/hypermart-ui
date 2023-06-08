import logger from "../apiServices/logger";

function asyncErrors(handler) {
    return async () => {
        try {
            await handler();
        } catch (error) {
            console.log("ERROR:", error.message)
            logger.log(error);
            if (error && error.response && error.response.status === 404) return window.location.replace("/notFound");

        }
    };
};


export default asyncErrors;