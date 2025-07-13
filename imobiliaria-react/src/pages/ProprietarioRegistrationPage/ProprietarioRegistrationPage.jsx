// src/pages/ProprietarioRegistrationPage/ProprietarioRegistrationPage.jsx
import React from 'react';
import ProprietarioRegistrationForm from '../../components/ProprietarioRegistrationForm/ProprietarioRegistrationForm';

const ProprietarioRegistrationPage = () => {
  return (
    // Esta página renderiza apenas o formulário. O layout é gerenciado pelo ManagementLayout.
    <ProprietarioRegistrationForm />
  );
};

export default ProprietarioRegistrationPage;