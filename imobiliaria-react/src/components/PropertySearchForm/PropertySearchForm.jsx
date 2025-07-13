import React, { useState } from "react";
import styles from "./PropertySearchForm.module.css";
{/*Define a estrutura do Card */}

const PropertySearchForm = ({ onSearch }) => {
  const [activeTab, setActiveTab] = useState("omprar"); 
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");

  const handleSearchSubmit = (event) => {
    event.preventDefault(); 
    onSearch({ activeTab, propertyType, location });
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${activeTab === "comprar" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("comprar")}
        >
          Comprar
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "alugar" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("alugar")}
        >
          Alugar
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "novo" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("novo")}
        >
          Imóvel novo
        </button>
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
            <option value="apartamento">Apartamento</option>
            <option value="casa">Casa</option>
            <option value="terreno">Terreno</option>
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