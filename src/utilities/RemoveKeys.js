//remove empty values in objects

const removeEmptyValues = (object) => {
    for (var key in object) {
        if (object.hasOwnProperty([key])) {
            var value = object[key];
            if (value === null || value === undefined || value === "") {
                delete object[key];
            }
        }
    }
}

export default removeEmptyValues;