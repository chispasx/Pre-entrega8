import ErrorDictionary from "./ErrorDictionary.js";

class CustomError extends Error {

    constructor(code, details = null) {

        super(ErrorDictionary[code].message);

        this.code = code;

        this.status = ErrorDictionary[code].status;

        this.details = details;

    }

}

export default CustomError;