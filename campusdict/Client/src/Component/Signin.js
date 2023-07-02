import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { Field, Form, Formik } from "formik";
import * as yup from 'yup';
import { CircularProgress } from "@mui/material";

toast.configure();

function Signin({ setLogin }) {
  let history = useHistory();
  const [send, setSend] = useState(false);
  const [loader,setLoader] =useState(false);
  const formikRef = useRef(null);
  const Postdata = (values) => {
    setLoader(true);
    axios.post('/api/v1/user/login', {
      email: values.email,
      password: values.password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setLoader(false);
        const data = response.data;
        if (data.error) {
          toast.error(data.error);
        } else {
          localStorage.setItem('jwt', data.token);
          localStorage.setItem('user', data.user.role);
          localStorage.setItem('userEmail', data.user.email);
          setLogin(true);
          history.push('/');
          toast.success('LoggedIn Successfully 😃');
        }
      })
      .catch(error => {
        setLoader(false);
        const arr=Object.values(error)
        const status=(arr[2].status);
        if(status === 400 )setSend(true);
        toast.error(status === 400? arr[2].data.message : arr[2].statusText);
      });
  }
  const initialSchema = {
    password: '',
    email: '',
  }
  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Required'),
    password: yup.string().required('Please enter your password'),
  })

  return (
    <Formik initialValues={initialSchema} validationSchema={validationSchema} 
    innerRef={formikRef}>
    {({values,errors,handleChange,handleSubmit,setFieldValue ,handleBlur,touched})=>{
      return(
        <Form>
    <div
      style={{ display: 'flex', justifyContent: 'center', fontFamily: 'monospace' }}>
      <div className="bg-white mt-4" style={{
        display: 'flex', width: '75%',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
      }}>
        <div className="p-4" style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img  style={{maxWidth:'100%'}} class="materialboxed" width="650" src="/banner.png" />
        </div>
        <div style={{ width: '50%' }}>
          <div className="mycard ">
            <div className="card auth-card input-field">
              <h2>Campus Dictionary</h2>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Field value={values.email} onChange={handleChange('email')} onBlur={handleBlur('email')}type="text" placeholder="Email" />
              {touched.email && errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Field value={values.password}onChange={handleChange('password')} onBlur={handleBlur('password')}type="text" placeholder="Password"  />
              {touched.password && errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
              </div>
              {send && <div style={{
                backgroundColor: 'red', color: 'white', margin: 4,
                borderRadius: 8,
              }}>
                <p>An Email has been sent to you for verification . Please verify </p>
              </div>}
              {!send && !loader &&<button
               onClick={() => {Postdata(values)}} className="btn waves-effect #ee6e73 clrbtn" >
                Log In
              </button>}
              {!send && !loader && <h5>
                <Link style={{ color: "black" }} to="/user/register"> Don't Have an Account?</Link>
              </h5>}
              {loader && 
                <div className="flex justify-center">
                  <CircularProgress color="secondary" />
                </div>}
            </div>

          </div>
        </div>
      </div>
    </div>
    </Form>
      )
    }}
    </Formik>

  );
}
export default Signin;