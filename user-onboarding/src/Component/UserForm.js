import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function UserForm({values, errors, touched, status}) {

    const [value, setValue] = useState([]);
    useEffect(() => {
    if (status) {
      setValue([...value, status]);
    }
    }, [status]);

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

            {value.map(val => (
                <ul key={val.id}>
                    <li>Name:{val.name}</li>
                    <li>Email: {val.email}</li>
                </ul>))}

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
    handleSubmit(values , { setStatus }) {
        axios
        .post(' https://reqres.in/api/users', values )
        .then(res => {
            setStatus(res.data)
        })
        .catch(err => console.log(err.res))
    }
})(UserForm)

console.log('this is Hoc' , FormikUserForm)
export default FormikUserForm