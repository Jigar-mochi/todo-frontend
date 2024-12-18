import { useFormik } from 'formik';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { userLoginSchema } from '../../utils/validation';
import { UserLoginTypes } from './modals';
import './style.scss';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogin } from '../../redux/api/auth/thunk';

const SignIn = () => {
    const { loading } = useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch();

    const handleFormSubmit = (values: UserLoginTypes) => {
        dispatch(handleLogin({ body: values, callBack: handleCallBack }));
    };

    const handleCallBack = (token: string) => {
        localStorage.setItem('accessToken', token);
    };

    const { handleSubmit, touched, errors, values, handleChange } = useFormik({
        initialValues: {
            userName: '', password: ''
        },
        validationSchema: userLoginSchema,
        onSubmit: handleFormSubmit
    });

    return (
        <div className='register-container'>
            <Card title="Sign In" className='register-form'>
                <form onSubmit={handleSubmit}>
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
                            <InputText invalid={!!touched.password && !!errors.password} type='password' id="password" value={values.password} onChange={handleChange} />
                            <label htmlFor="password">Password</label>
                        </FloatLabel>
                        {!!touched.password && !!errors.password && <small id="password">
                            {errors.password}
                        </small>}
                    </div>
                    <Button icon="pi pi-check" label="Submit" loading={loading} />
                </form>
            </Card>
        </div>
    );
};

export default SignIn;