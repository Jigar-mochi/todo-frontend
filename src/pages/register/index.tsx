import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { AppDispatch, RootState } from '../../redux/store';
import { handleRegister } from '../../redux/api/auth/thunk';
import { userSchema } from '../../utils/validation';
import { UserRegisterTypes } from './modals';
import './style.scss';

const Register = () => {
    const { loading } = useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const handleFormSubmit = (values: UserRegisterTypes) => {
        dispatch(handleRegister({ body: values, callBack: handleCallBack }));
    };

    const handleCallBack = (token: string) => {
        localStorage.setItem('accessToken', token);
        navigate('/');
    };

    const { handleSubmit, touched, errors, values, handleChange } = useFormik({
        initialValues: {
            fullName: '', userName: '', email: '', password: ''
        },
        validationSchema: userSchema,
        onSubmit: handleFormSubmit
    });

    return (
        <div className='register-container'>
            <Card title="Create account" className='register-form'>
                <form onSubmit={handleSubmit}>
                    <div className='input-field'>
                        <FloatLabel>
                            <InputText invalid={!!touched.fullName && !!errors.fullName} id="fullName" value={values.fullName} onChange={handleChange} />
                            <label htmlFor="fullName">Fullname</label>
                        </FloatLabel>
                        {!!touched.fullName && !!errors.fullName && <small id="fullName">
                            {errors.fullName}
                        </small>}
                    </div>
                    <div className='input-field'>
                        <FloatLabel>
                            <InputText invalid={!!touched.userName && !!errors.userName} id="userName" value={values.userName} onChange={handleChange} />
                            <label htmlFor="userName">Username</label>
                        </FloatLabel>
                        {!!touched.userName && !!errors.userName && <small id="userName">
                            {errors.userName}
                        </small>}
                    </div>
                    <div className='input-field'>
                        <FloatLabel>
                            <InputText invalid={!!touched.email && !!errors.email} id="email" value={values.email} onChange={handleChange} />
                            <label htmlFor="email">Email</label>
                        </FloatLabel>
                        {!!touched.email && !!errors.email && <small id="email">
                            {errors.email}
                        </small>}
                    </div>
                    <div className='input-field'>
                        <FloatLabel>
                            <InputText type='password' id="password" value={values.password} onChange={handleChange} />
                            <label htmlFor="password">Password</label>
                        </FloatLabel>
                        {!!touched.password && !!errors.password && <small id="password">
                            {errors.password}
                        </small>}
                    </div>
                    <Button type='submit' icon="pi pi-check" label="Submit" loading={loading} />
                </form>
            </Card>
        </div>
    );
};

export default Register;