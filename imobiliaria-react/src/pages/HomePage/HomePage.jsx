import React, { useState, useEffect, useCallback, useRef } from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import BelowHero from '../../components/BelowHero/BelowHero';
import PropertyListSection from '../../components/PropertyListSection/PropertyListSection'; 
import styles from './HomePage.module.css';

const HomePage = () => {
  const [allProperties, setAllProperties] = useState([]); // Guarda todos os imóveis
  const [displayedProperties, setDisplayedProperties] = useState([]); // Guarda os imóveis filtrados
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Criar uma referência para a seção de resultados
  const resultsRef = useRef(null);

  // Busca todos os imóveis visíveis uma única vez
  useEffect(() => {
    const loadVisibleProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:8080/api/imoveis');
        if (!response.ok) {
          throw new Error('Não foi possível buscar os imóveis.');
        }
        const propertiesFromApi = await response.json();
        const visibleProperties = propertiesFromApi.filter(p => p.exibirNoSite === true);
        
        setAllProperties(visibleProperties); // Armazena todos
        setDisplayedProperties(visibleProperties); // Exibe todos inicialmente

      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadVisibleProperties();
  }, []);

  // Função que recebe os critérios e filtra os imóveis
  const handleHeroSearch = useCallback((criteria) => {
    setLoading(true);
    let filteredProperties = [...allProperties];

    // 1. Filtro por Finalidade (Comprar/Alugar)
    if (criteria.activeTab === 'comprar') {
      filteredProperties = filteredProperties.filter(p => p.tipoFinalidade === 'Vender');
    } else if (criteria.activeTab === 'alugar') {
      filteredProperties = filteredProperties.filter(p => p.tipoFinalidade === 'Alugar');
    }

    // 2. Filtro por Tipo de Imóvel (Categoria)
    if (criteria.propertyType) {
      filteredProperties = filteredProperties.filter(p => p.categoria.id == criteria.propertyType);
    }

    // 3. Filtro por Localização (Bairro)
    if (criteria.location) {
      filteredProperties = filteredProperties.filter(p => 
        p.bairro?.nome.toLowerCase().includes(criteria.location.toLowerCase())
      );
    }
    
    setDisplayedProperties(filteredProperties);
    setLoading(false);

    // 2. Scroll suave para a seção de resultados após a busca
    // Usamos um pequeno timeout para garantir que o DOM foi atualizado
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

  }, [allProperties]); // Depende de allProperties para ter a lista completa

  return (
    <div className={styles.homePage}>
      <HeroSection onSearch={handleHeroSearch} />
      <BelowHero />
      {/* 3. Anexar a referência ao elemento que queremos focar */}
      <div ref={resultsRef}>
        <PropertyListSection
          displayedProperties={displayedProperties}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default HomePage;
