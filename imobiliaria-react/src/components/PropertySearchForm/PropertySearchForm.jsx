import React, { useState, useEffect } from 'react';
import styles from './PropertySearchForm.module.css';

const PropertySearchForm = ({ onSearch }) => {
  const [activeTab, setActiveTab] = useState("comprar"); 
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  
  // Novo estado para armazenar as categorias vindas da API
  const [categories, setCategories] = useState([]);

  // Busca as categorias da API quando o componente é montado
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/categorias');
        if (!response.ok) {
          throw new Error('Falha ao buscar categorias');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };
    fetchCategories();
  }, []); // O array vazio garante que isso rode apenas uma vez

  const handleSearchSubmit = (event) => {
    event.preventDefault(); 
    // Envia os critérios de busca para a HomePage
    onSearch({ activeTab, propertyType, location });
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tabButton} ${activeTab === "comprar" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("comprar")}
        >
          Comprar
        </button>
        <button
          type="button"
          className={`${styles.tabButton} ${activeTab === "alugar" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("alugar")}
        >
          Alugar
        </button>
        {/* O botão "Imóvel novo" pode ser usado para um filtro futuro */}
      </div>

      <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="propertyType" className="sr-only">Tipo de imóvel</label>
          <select
            id="propertyType"
            className={styles.selectInput}
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">Todos os tipos</option>
            {/* Popula o dropdown com as categorias do banco */}
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nome}</option>
            ))}
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="location" className="sr-only">Onde deseja morar?</label>
          <input
            type="text"
            id="location"
            className={styles.textInput}
            placeholder="Digite o nome da rua, bairro ou cidade"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.searchButton}>
          Buscar
        </button>
      </form>
    </div>
  );
};

export default PropertySearchForm;
