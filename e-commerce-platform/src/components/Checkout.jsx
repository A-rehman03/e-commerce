// src/components/Checkout.jsx
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Checkout = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => setStep(step + 1);
  const handlePrevStep = () => setStep(step - 1);

  const validationSchemaStep1 = Yup.object({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
  });

  const validationSchemaStep2 = Yup.object({
    cardNumber: Yup.string()
      .required('Card number is required')
      .matches(/^[0-9]{16}$/, 'Card number must be 16 digits'),
    expiration: Yup.string()
      .required('Expiration date is required')
      .matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, 'Must be a valid date (MM/YY)'),
  });

  const initialValues = {
    name: '',
    address: '',
    cardNumber: '',
    expiration: '',
  };

  const handleSubmit = (values) => {
    console.log('Order submitted:', values);
    // Implement further actions such as sending data to an API
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ values, isValid }) => (
          <Form>
            {step === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Step 1: Shipping Information</h2>
                <div className="mb-4">
                  <label className="block text-gray-700">Name</label>
                  <Field
                    name="name"
                    className="border rounded-lg p-2 w-full"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Address</label>
                  <Field
                    name="address"
                    className="border rounded-lg p-2 w-full"
                  />
                  <ErrorMessage name="address" component="div" className="text-red-500" />
                </div>
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!isValid}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Next
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Step 2: Payment Information</h2>
                <div className="mb-4">
                  <label className="block text-gray-700">Card Number</label>
                  <Field
                    name="cardNumber"
                    className="border rounded-lg p-2 w-full"
                  />
                  <ErrorMessage name="cardNumber" component="div" className="text-red-500" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Expiration Date (MM/YY)</label>
                  <Field
                    name="expiration"
                    className="border rounded-lg p-2 w-full"
                  />
                  <ErrorMessage name="expiration" component="div" className="text-red-500" />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Step 3: Review Order</h2>
                <p><strong>Name:</strong> {values.name}</p>
                <p><strong>Address:</strong> {values.address}</p>
                <p><strong>Card Number:</strong> {values.cardNumber}</p>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Submit Order
                  </button>
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Checkout;
