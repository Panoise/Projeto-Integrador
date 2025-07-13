import React from 'react';
import { Outlet } from 'react-router-dom';
import ManagementMenu from '../../components/ManagementMenu/ManagementMenu'; 
import styles from './ManagementLayout.module.css'; 

const ManagementLayout = () => {
  return (
    <div className={styles.managementPageWrapper}>
      <div className={styles.managementContainer}>
        <ManagementMenu /> 
        <div className={styles.managementContentArea}>
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default ManagementLayout;