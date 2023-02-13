import { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export class Filter extends Component {
  handleSubmit = (values, actions) => {
    this.props.handleFilter(values.filter);
    this.props.handleContacts()
        actions.resetForm();
    };
  render() {

    return (
      <>
        <Formik
       initialValues={{ filter: ''}}
       onSubmit={this.handleSubmit}
        >
                <Form>

            <h2>Filter</h2>
           <Field type="text" name="filter" />
           <ErrorMessage name="filter" component="div" />
           <button type="submit">
            Submit
           </button>
         </Form>   
     </Formik>
      </>
          
    );
  }
}
