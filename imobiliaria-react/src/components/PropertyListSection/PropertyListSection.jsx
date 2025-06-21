import React from 'react';
import PropertyCard from '../PropertyCard/PropertyCard'; 
import styles from './PropertyListSection.module.css'; 
{/*Container dos cards dos produtos*/}

const PropertyListSection = ({ displayedProperties, loading, error }) => {
  return (
    <section className={styles.propertyListSection}>
      <h2 className={styles.mainTitle}>Imóveis Disponíveis em Chapecó</h2> 



      {loading && <p className={styles.statusMessage}>Carregando imóveis...</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}

      {!loading && !error && (
        <div className={styles.propertyGrid}>
          {displayedProperties.length > 0 ? (
            displayedProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <p className={styles.noResults}>Nenhum imóvel encontrado no catálogo.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default PropertyListSection;