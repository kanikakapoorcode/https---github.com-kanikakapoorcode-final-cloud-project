// src/components/Auth/Signup.jsx
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import { authAPI } from '../../services/api';

const Signup = ({ onSuccess }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [otpData, setOtpData] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      emailOtp: '',
      phoneOtp: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      phone: Yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number').required('Required'),
      password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required')
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        if (step === 1) {
          const response = await authAPI.signup({
            name: values.name,
            email: values.email,
            phone: values.phone,
            password: values.password
          });
          setOtpData(response.data);
          setStep(2);
        } else {
          // Verify OTPs and complete registration
          await authAPI.verifyOtp({
            user_id: otpData.user_id,
            email_otp: values.emailOtp,
            phone_otp: values.phoneOtp
          });
          onSuccess();
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {step === 1 ? 'Create Account' : 'Verify OTP'}
      </Typography>
      
      <form onSubmit={formik.handleSubmit}>
        {step === 1 ? (
          <>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Full Name"
              margin="normal"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              margin="normal"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Phone Number"
              margin="normal"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              margin="normal"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              margin="normal"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
          </>
        ) : (
          <>
            <Typography variant="body1" gutterBottom>
              OTPs sent to your email and phone
            </Typography>
            <TextField
              fullWidth
              id="emailOtp"
              name="emailOtp"
              label="Email OTP"
              margin="normal"
              value={formik.values.emailOtp}
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              id="phoneOtp"
              name="phoneOtp"
              label="Phone OTP"
              margin="normal"
              value={formik.values.phoneOtp}
              onChange={formik.handleChange}
            />
          </>
        )}
        
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : step === 1 ? 'Sign Up' : 'Verify'}
        </Button>
      </form>
    </Box>
  );
};

export default Signup;