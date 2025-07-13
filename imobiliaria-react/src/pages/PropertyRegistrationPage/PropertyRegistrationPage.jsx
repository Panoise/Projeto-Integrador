// src/pages/PropertyRegistrationPage/PropertyRegistrationPage.jsx
import React from 'react';
import PropertyRegistrationForm from '../../components/PropertyRegistrationForm/PropertyRegistrationForm';

const PropertyRegistrationPage = () => {
  return (
    // Esta página renderiza apenas o formulário. O layout é gerenciado pelo ManagementLayout.
    <PropertyRegistrationForm />
  );
};

export default PropertyRegistrationPage;