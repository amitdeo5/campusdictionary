import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Field, Form, Formik } from "formik";
import * as yup from 'yup'
import { InputLabel, MenuItem, Select } from "@mui/material";

toast.configure();
function Signup() {
  const [show, setShow] = useState(false);
  let history = useHistory();
  const initialSchema = {
    name: '',
    password: '',
    email: '',
    role: '',
  }
  const validationSchema = yup.object().shape({
    name: yup.string().required("Required"),
    email: yup.string().email('Invalid email').required('Required'),
    role: yup.string().required('Please choose from the dropdown'),
    password: yup.string().required('Please enter your password'),
  })
  const Postdata = (values, errors) => {
    console.log(JSON.stringify(values, null, 2))
    if (errors.length > 0) {
      toast.error("Please complete all the required fields")
    }
    else {
      fetch("/api/v1/user/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role

        })
      }).then(res => res.json())
        .then(data => {
          console.log(JSON.stringify(data));
          if (data.error) {
            toast.error("Please check all your fields")
          }
          else {
            setShow(true);
          }

        })
        .catch(err => {
          console.log(err);
          toast.error("Something went wrong ")
        })
    }
  }

  return (
    <Formik initialValues={initialSchema} validationSchema={validationSchema}>
      {({ values, errors, handleChange, handleBlur, handleSubmit, setFieldValue, touched, dirty }) => (
        <div className="mycard">
          <Form>
            <div
              style={{ display: 'flex', justifyContent: 'center', fontFamily: 'monospace' }}>
              <div className="bg-white mt-4" style={{
                display: 'flex', width: '75%',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
              }}>
                <div className="p-4" style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img class="materialboxed" width="650" style={{maxWidth:'100%'}} src="/banner.png" />
                </div>
                <div style={{ width: '50%' }}>
                  <div className="card auth-card input-field" style={{ fontFamily: 'monospace' }}>
                    <h2>Campus Dictionary</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Field
                        onChange={handleChange('name')}
                        onBlur={handleBlur('name')}
                        type="text" placeholder="Username"
                        value={values.name}
                      />
                      {touched.name && errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Field
                        onChange={handleChange('email')}
                        onBlur={handleBlur('email')}
                        type="text" placeholder="Email"
                        value={values.email}
                      />
                      {touched.email && errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Field
                        onChange={handleChange('password')}
                        onBlur={handleBlur('password')}
                        type="text" placeholder="Password"
                        value={values.password}
                      />
                      {touched.password && errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                    </div>
                    <p style={{ display: 'flex', justifyContent: 'flex-start', color: 'grey', marginBottom: 8, marginTop: 8 }}>Please Choose your Role</p>
                    <Select id="label" className="mb-2" value={values.role} onBlur={handleBlur('role')} onChange={handleChange('role')} placeholder="Please Choose your Role">
                      <MenuItem value={'HR'}>HR</MenuItem>
                      <MenuItem value={'head_of_placement_cell'}>head_of_placement_cell</MenuItem>
                    </Select>
                    {touched.role && errors.role && <p style={{ color: 'red', display: 'flex', justifyContent: 'flex-start' }}>{errors.role}</p>}
                    {show && <div style={{
                      backgroundColor: '#03AC13', color: 'white', margin: 4,
                      borderRadius: 8,
                    }}>
                      <p>An Email has been sent to you Successfully. Please verify </p>
                    </div>
                    }
                    {!show && <button
                      onClick={() => { Postdata(values, errors) }} className="btn waves-effect #64b5f6 clrbtn" >
                      Sign Up
                    </button>}
                    {!show && <h5>
                      <Link style={{ color: "black" }} to="/user/login"> Already Have an Account?</Link>
                    </h5>}
                  </div>
                </div>
              </div>
            </div>

          </Form>
        </div>
      )}
    </Formik>
  );
}
export default Signup;