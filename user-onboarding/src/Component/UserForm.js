import React, { useState } from 'react';
import { withFormik, Form, Field, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function UserForm({values, errors, touched}) {
  return (
      <div className ='userForm-Section'>
            <Form>

                <div className='fullName'>
                    <p>Full Name</p>
                    <Field type='text' name='name'></Field>
                </div> {/* fullName end */}
                <div className='name-error'>
                {touched.name && errors.name && (<p>{errors.name}</p>)}
                </div>

                <div className='email'>
                    <p>Email</p>
                    <Field type='email' name='email'></Field>
                    {/* {touched.email && errors.email && (<p>{errors.email}</p>)} */}
                </div> {/* email end */}
                {touched.email && errors.email && (<p>{errors.email}</p>)}

                <div className='password'>
                    <p>Password</p>
                    <Field type='password' name='password'></Field>
                    {/* {touched.password && errors.password && (<p>{errors.password}</p>)} */}
                </div> {/* password end */}
                {touched.password && errors.password && (<p>{errors.password}</p>)}

                <div className='checkbox-section'>
                    <Field id='checkbox' name='agreedTerm' checked={values.agreedTerm} type='checkbox'>
                    {/* <p>Agree to terms and services.</p> */}
                    </Field>
                    <p>Agree to terms and services.</p>
                </div> {/* checkbox-section end */}

                <button className='submit-button'>Submit</button>

            </Form>
      </div> /* userForm-Section end */
  )
}

const FormikUserForm = withFormik({
    mapPropsToValues({name , email , password, agreedTerm}) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            agreedTerm: agreedTerm || false
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required() ,
        email: Yup.string().required() ,
        password: Yup.string().required() 
    }),
    handleSubmit(values) {
        axios
        .post(' https://reqres.in/api/users', values )
        .then(res => {
            console.log(res)
        })
        .catch()
    }
})(UserForm)

console.log('this is Hoc' , FormikUserForm)
export default FormikUserForm