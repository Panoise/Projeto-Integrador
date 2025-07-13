import React from "react";
import styles from "./HeroSection.module.css";
import PropertySearchForm from "../PropertySearchForm/PropertySearchForm"; 
import heroImage from '../../assets/images/hero-person.jpg'; 

const HeroSection = ({ onSearch }) => { // onSearch será uma prop para passar a lógica de busca da HomePage
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.imageContainer}>
          <img src={heroImage} alt="Pessoa navegando no celular" className={styles.heroImage} />
        </div>
        <div className={styles.textAndFormContainer}>
          <h1 className={styles.headline}>A chance de encontrar o imóvel dos sonhos começa aqui!</h1>
          <PropertySearchForm onSearch={onSearch} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;