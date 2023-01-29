import * as Yup from "yup";

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const phoneNumberValidationSchema = Yup.string()
    .required("Phone Number is required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(11, "Phone number too short")
    .max(11, "Phone number too long");

const emailValidationSchema = Yup.string()
    .email("Enter a valid email")
    .required("Email is required");

export const loginValidationSchema = Yup.object({
    email: emailValidationSchema,
    password: Yup.string().required("Password is required").min(8),
});

export const signUpValidationSchema = Yup.object({
    fullName: Yup.string().required("Name is required"),
    phone: phoneNumberValidationSchema,
    email: emailValidationSchema,
    password: Yup.string()
        .min(8, "Password must contain at least 8 characters")
        .required("Password required"),
});

export const billValidationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: emailValidationSchema,
    phone: phoneNumberValidationSchema,
    paidAmount: Yup.number().required("Paid Amount is required"),
});
