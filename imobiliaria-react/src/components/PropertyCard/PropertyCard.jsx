import React from "react";
import styles from "./PropertyCard.module.css";
{/*Card do produto está pegando os dados de data/properties.js*/}
const PropertyCard = ({ property }) => {
  return (
    <div className={styles.card}>
      <img src={property.image} alt={property.title} className={styles.image} />
      <div className={styles.info}>
        <h3 className={styles.title}>{property.title}</h3>
        <p className={styles.location}>{property.location}</p>
        <p className={styles.price}>{property.price}</p>
        <div className={styles.details}>
          {property.bedrooms > 0 && <span>{property.bedrooms} Quarto(s)</span>}
          {property.bathrooms > 0 && <span>{property.bathrooms} Banheiro(s)</span>}
          <span>{property.area}</span>
        </div>
        <p className={styles.description}>{property.description}</p>
      </div>
    </div>
  );
};

export default PropertyCard;