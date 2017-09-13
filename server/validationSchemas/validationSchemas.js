"use strict";

export const registrationSchema = {
    "username" : {
        notEmpty: true,
        errorMessage: "Username is required"
    },
    "password" : {
        notEmpty: true,
        isLength : {
            options:[{min:12}],
            errorMessage: "Password must be at least 12 characters."
        },
        errorMessage: "Invalid password"
    }
}