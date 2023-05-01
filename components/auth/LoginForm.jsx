import { Formik, Form, Field, ErrorMessage, setSubmitting } from 'formik';
import { useSignIn } from '../../hooks/useAuth';
import { useEffect } from 'react';

export default function LoginForm(){
    const [loading, error, signIn] = useSignIn()

    useEffect(() => {
    }, loading)

    const validation = values => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }
      return errors;
    }

    return <div className="p-6 bg-white dark:bg-slate-600">
        <Formik
       initialValues={{ email: '', password: '' }}
       validate={validation}
       onSubmit={(values, { setSubmitting }) => {
            setSubmitting(loading)
            signIn(values)
       }}
     >
       {({ isSubmitting }) => (
         <Form>
          <label htmlFor="email">Email Address</label>
           <Field type="email" name="email" className="border block text-black p-1 mb-1"/>
           <ErrorMessage name="email" component="div" />
           <label htmlFor="password">Password</label>
           <Field type="password" name="password" className="border block text-black p-1 mb-1"/>
           <ErrorMessage name="password" component="div" />
           <button className="bg-yellow-500	text-black my-2 p-1 px-2 rounded" type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
     </Formik>
    </div>
}