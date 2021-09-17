import React from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { globalStyles } from "../styles/global";
import FlatButton from "../shared/button";
import { Formik } from "formik";

const validate = ({ title, body, rating }, props) => {
    const errors = {};
  
    if (!title) {
      errors.title = 'Field is Required';
    } else if (title.length < 4) {
      errors.title = 'To short! Add at least 4 characters';
    }

    if (!body) {
        errors.body = 'Field is Required';
      } else if (body.length < 8) {
        errors.body = 'To short! Add at least 8 characters';
      }

      if (!rating) {
        errors.rating = 'Field is Required';
      } else if (isNaN(parseInt(rating)) || parseInt(rating) >= 6 || parseInt(rating) <= 0) {
        errors.rating = 'Rating must be a number 1-5';
      }
    return errors;
};

export default function ReviewForm({ addReview }) {
    return(
        <View style={globalStyles.container}>
            <Formik
                initialValues={{ title: '', body: '', rating: '' }}
                validate={validate}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    addReview(values);
                }}>
                {(formikProps) => (
                    <View>
                        <TextInput 
                            style={globalStyles.input}
                            placeholder='Review title'
                            onChangeText={formikProps.handleChange('title')}
                            value={formikProps.values.title}
                            onBlur={formikProps.handleBlur('title')}
                        />
                        <Text style={globalStyles.errorText}>{ formikProps.touched.title && formikProps.errors.title }</Text>
                        <TextInput 
                            multiline
                            minHeight={40}
                            style={globalStyles.input}
                            placeholder='Review body'
                            onChangeText={formikProps.handleChange('body')}
                            value={formikProps.values.body}
                            onBlur={formikProps.handleBlur('body')}
                        />
                        <Text style={globalStyles.errorText}>{ formikProps.touched.body && formikProps.errors.body }</Text>
                        <TextInput 
                            style={globalStyles.input}
                            placeholder='Rating (1-5)'
                            onChangeText={formikProps.handleChange('rating')}
                            value={formikProps.values.rating}
                            keyboardType='numeric'
                            onBlur={formikProps.handleBlur('rating')}
                        />
                        <Text style={globalStyles.errorText}>{ formikProps.touched.rating && formikProps.errors.rating }</Text>
                        <FlatButton
                            text='submit'
                            onPress={formikProps.handleSubmit}    
                        />
                    </View>
                )}
            </Formik>
        </View>
    );
};