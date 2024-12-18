import * as Yup from 'yup';

export const userSchema = Yup.object({
    fullName: Yup.string().required('This field is required'),
    userName: Yup.string().required('This field is required'),
    email: Yup.string().email('This is invalid email format').required('This field is required'),
    password: Yup.string().required('This field is required'),
});
export const userLoginSchema = Yup.object({
    userName: Yup.string().required('This field is required'),
    password: Yup.string().required('This field is required'),
});