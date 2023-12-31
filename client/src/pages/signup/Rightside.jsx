import React, { useState, useEffect } from 'react';
import { InputBtn, MainBtn, AuthenicationBtn, OTPcard } from '../../components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup, signin } from '../../redux/auth/authActions';

const Rightside = ({ value1, logo1, value2, logo2 }) => {
  const [showOTP, setShowOTP] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.token !== null);

  useEffect(() => {
    if (isAuthenticated) {
      setShowOTP(true)
    }
  }, [isAuthenticated, navigate]);

  const handleAuthentication = async (values) => {
    try {
      if (value1.includes('Sign Up')) {
        await dispatch(signup({
          email: values.email,
          password: values.password
        }));
      } else {
        await dispatch(signin({
          email: values.email,
          password: values.password
        }));
      }
      setShowOTP(true);
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .min(4, 'Must be 4 or greater')
        .required('Required'),
    }),
    onSubmit: handleAuthentication,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <InputBtn
          text={'ENTER EMAIL'}
          type={'email'}
          name={'email'}
          width={85}
          height={8}
          placeholder={'Email'}
          change={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email ? (
          <span className='text-rose-600'>{formik.errors.email}</span>
        ) : (
          <></>
        )}

        <div className='mt-[-40px] lg:mt-0'>
          <InputBtn
            text={'ENTER PASSWORD'}
            type={'password'}
            name={'password'}
            width={85}
            height={8}
            placeholder={'Password'}
            change={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password ? (
            <span className='text-rose-600'>{formik.errors.password}</span>
          ) : (
            <></>
          )}
        </div>

        <div className='flex items-center justify-center'>
          <p className='text-[#A1A1A1] text-[13px] lg:w-[25vw] w-[250px] text-center mt-1 mb-3'>
            By proceeding, I agree to the Zoomify’s Privacy Statement and Terms of Service.
          </p>
        </div>

        <div className='mb-8'>
          <MainBtn
            value={'Continue'}
            width={60}
            height={60}
            maxWidth={'max-w-[300px]'}
            type={'submit'}
          />
        </div>
      </form>

      <div className='items-center justify-center flex flex-col'>
        <p className='text-[#A1A1A1] text-[12px] text-center mt-2 absolute'>
          OR SELECT YOUR {value1.includes('Sign Up') ? 'SIGN UP' : 'SIGN IN'} METHOD
          <span className='absolute mt-2 w-full flex items-center h-[0.5px] bg-[#FFFFFF]'></span>
        </p>
      </div>
      <div className='lg:mt-7 mt-5 flex items-center justify-center flex-col'>
        <AuthenicationBtn value={value1} logo={logo1} />
        <AuthenicationBtn value={value2} logo={logo2} />
      </div>
      {showOTP && value1.includes('Sign Up') ? (
        <OTPcard
          email={formik.values.email}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Rightside;