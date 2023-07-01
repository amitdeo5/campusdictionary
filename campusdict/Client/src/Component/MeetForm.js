import React, { useEffect, useRef } from "react";
import M from "materialize-css";
import { Field, Form, Formik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import * as yup from 'yup';
import moment from "moment/moment";
import axios from "axios";
import { useHistory } from 'react-router-dom';
export const MeetForm = ({ email ,clgName}) => {
    const userEmail = localStorage.getItem('userEmail');
    const history = useHistory()
    const datePickerRef = useRef(null);
    const timePickerRef = useRef(null);
    const formikRef = useRef(null);
    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.datepicker');
        var instances = M.Datepicker.init(elems);
    });
    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.timepicker');
        var instances = M.Timepicker.init(elems);
    });
    useEffect(() => {
        M.Datepicker.init(datePickerRef.current, {
            onSelect: handleDateSelect,
            format: 'yyyy-mm-dd',
        });
    }, []);
    useEffect(() => {
        M.Timepicker.init(timePickerRef.current, {
            onSelect: handleTimeSelect,
            format: 'hh:mm:ss'
        })
    }, [])
    const handleDateSelect = (date) => {
        formikRef.current.setFieldValue('date', date);
    };
    const handleTimeSelect = (time) => {
        formikRef.current.setFieldValue('time', time);
    };
    const initialValues = {
        name: '',
        date: '',
        time: '',
        orgname: '',
        instruct: '',
        collegeName:clgName,
    }

    const validationSchema = yup.object().shape({
        name: yup.string().required("Required"),
        date: yup.mixed().required('Please choose date for your meet'),
        time: yup.mixed().required('Please choose time for your meet'),
        orgname: yup.string().required('Required'),
    })
    const handleSubmit = async (values) => {
        // console.log("payload",values);
        try {
            // Send email using the backend API endpoint
            await axios.post('/api/v1/send-email', {
                to: email,
                cc: userEmail,
                subject: 'Campus Dictionary Meeting info',
                text: JSON.stringify(values),
            }).then(res => {
                if (res.status === 200) { toast.success("Email Sent Successfully 👌") }
                history.push('/');
            })


        } catch (error) {
            console.error('Error sending email:', error);
            toast.error('Failed to send email 😖.');
        }

    }
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema}
            innerRef={formikRef}>
            {({ values, errors, handleChange, handleBlur, touched, setFieldValue }) => {
                console.log(values);
                return (
                    <Form>
                        <div className="mycard ">
                            <div className="card auth-card input-field" style={{ fontFamily: 'monospace' }}>
                                <h2 style={{ fontWeight: 600 }}>Meeting Details</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Field
                                        onChange={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                        type="text" placeholder="Name of the person"
                                        value={values.name}
                                    />
                                    {touched.name && errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <input type="text"
                                        ref={datePickerRef}
                                        style={{ fontFamily: 'monospace' }} class="datepicker"
                                        placeholder="Enter date for the meeting">
                                    </input>
                                    {errors.date && <p style={{ color: 'red' }}>{errors.date}</p>}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <input type="text"
                                        ref={timePickerRef}
                                        style={{ fontFamily: 'monospace' }} class="timepicker"
                                        placeholder="Enter time for the meeting">
                                    </input>
                                    {errors.time && <p style={{ color: 'red' }}>{errors.time}</p>}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Field
                                        onChange={handleChange('orgname')}
                                        onBlur={handleBlur('orgname')}
                                        type="text" placeholder="Enter Organization Name"
                                        value={values.orgname}
                                    />
                                    {touched.orgname && errors.orgname && <p style={{ color: 'red' }}>{errors.orgname}</p>}
                                </div>
                                <div class="input-field" style={{ fontFamily: 'monospace' }}>
                                    <textarea id="textarea1" class="materialize-textarea" value={values.instruct} onChange={handleChange('instruct')}></textarea>
                                    <label for="textarea1">Please share anything Acc. to Your needs.</label>
                                </div>
                                <button onClick={() => handleSubmit(values)} className="btn waves-effect #ee6e73 clrbtn" >
                                    Send the Invitation.
                                </button>
                                <h5>
                                </h5>
                            </div>
                        </div>
                    </Form>)
            }}

        </Formik>

    );
}