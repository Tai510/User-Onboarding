import React, { useState } from 'react';
import { withFormik, Form, Field, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function UserForm({values, handleChange}) {
  return (
      <div className ='userForm-Section'>
            <form>
                <input onChange={handleChange} value={values.name} name='name' placeholder='Name'></input>
                <input onChange={handleChange} value={values.email} name='email' placeholder='Email'></input>
                <input onChange={handleChange} value={values.password} name='password' placeholder='Password'></input>
            </form>
      </div> /* userForm-Section end */
  )
}

const FormikUserForm = withFormik({
    mapPropsToValues() {
        return {
            name: 'Tai510',
            email: 'tashiwoeser@gmail.com',
            password: '**********'
        }
    }
})(UserForm)

console.log('this is Hoc' , FormikUserForm)
export default FormikUserForm