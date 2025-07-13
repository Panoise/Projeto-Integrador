import React, { useState, useEffect, useCallback } from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import BelowHero from '../../components/BelowHero/BelowHero';
import PropertyListSection from '../../components/PropertyListSection/PropertyListSection'; 
import propertiesData from '../../data/properties';

import styles from './HomePage.module.css';

const HomePage = () => {
  const [displayedProperties, setDisplayedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [heroSearchCriteria, setHeroSearchCriteria] = useState({
    activeTab: 'comprar',
    propertyType: '',
    location: ''
  });

  const handleHeroSearch = useCallback((criteria) => {
    console.log('Critérios de busca do Hero:', criteria);
    setHeroSearchCriteria(criteria); // A HomePage ainda mantém o controle dos critérios se precisar
  }, []);

  const loadAllProperties = useCallback(() => {
    setLoading(true);
    setError(null);

    setTimeout(() => {
      setDisplayedProperties([...propertiesData]);
      setLoading(false);
    }, 300);
  }, []);

  useEffect(() => {
    loadAllProperties();
  }, [loadAllProperties]);

  return (
    <div className={styles.homePage}>
      <HeroSection onSearch={handleHeroSearch} />
      <BelowHero />

      <PropertyListSection
        displayedProperties={displayedProperties}
        loading={loading}
        error={error}
      />
      
    </div>
  );
};

export default HomePage;