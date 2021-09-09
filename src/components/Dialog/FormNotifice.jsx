import './formNotifice.scss';

import { FastField, Form, Formik } from 'formik';

import React from 'react';

function FormNotifice(props) {
    const initialValues = {
        shape: '',
    }
    return (
        <div className="dialog-container">
            <div className="dialog__form">
                <Formik
                    initialValues = {initialValues}
                >

                    {formikProps=>{
                        // const {values} = formikProps;
                    
                        return(
                            <Form>
                                <FastField 
                                    name="shape"
                                    // component={SelectInputField}

                                    label="Shape 1"

                                />
                            </Form>
                        )
                    }}
                </Formik>   
            </div>            
        </div>
    );
}

export default FormNotifice;

