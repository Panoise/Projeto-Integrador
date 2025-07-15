import React, { useState } from "react";
import styles from "./PropertyCard.module.css";

const PropertyCard = ({ property }) => {
  // Estado para controlar o índice da imagem atual
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Novo estado para controlar a visualização expandida (modal)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasImages = property.imagens && property.imagens.length > 0;
  const totalImages = hasImages ? property.imagens.length : 0;

  const nextImage = (e) => {
    e.stopPropagation(); // Impede que o clique se propague para outros elementos
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  // Funções para abrir e fechar o modal
  const openModal = () => {
    if (hasImages) {
      setIsModalOpen(true);
    }
  };

  const closeModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  const imageUrl = hasImages
    ? `http://localhost:8080/${property.imagens[currentImageIndex].caminho.replace(/\\/g, '/')}`
    : "https://placehold.co/600x400/eee/ccc?text=Sem+Imagem";

  const title = `${property.categoria?.nome || 'Imóvel'} em ${property.bairro?.nome || 'Localização Indefinida'}`;
  const location = `${property.endereco?.rua || 'Rua não informada'}, ${property.endereco?.numero || ''} - ${property.bairro?.nome || ''}`;
  const price = `R$ ${parseFloat(property.valorVenda).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const bedrooms = property.quantidadeQuartos;
  const bathrooms = property.quantidadeBanheiros;
  const area = `${property.metragem} m²`;

  return (
    // O React Fragment <> permite retornar múltiplos elementos sem um wrapper extra
    <>
      <div className={styles.card}>
        {/* Adicionado o onClick para abrir o modal */}
        <div className={styles.imageContainer} onClick={openModal}>
          <img
            src={imageUrl}
            alt={title}
            className={styles.image}
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/eee/ccc?text=Erro"; }}
          />
          {totalImages > 1 && (
            <>
              <button onClick={prevImage} className={`${styles.arrow} ${styles.left}`}>
                &#10094;
              </button>
              <button onClick={nextImage} className={`${styles.arrow} ${styles.right}`}>
                &#10095;
              </button>
            </>
          )}
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.location}>{location}</p>
          <p className={styles.price}>{price}</p>
          <div className={styles.details}>
            {bedrooms > 0 && <span>{bedrooms} Quarto(s)</span>}
            {bathrooms > 0 && <span>{bathrooms} Banheiro(s)</span>}
            {area && <span>{area}</span>}
          </div>
        </div>
      </div>

      {/* --- MODAL DE IMAGEM EXPANDIDA --- */}
      {isModalOpen && (
        <div className={styles.modalBackdrop} onClick={closeModal}>
          <button onClick={closeModal} className={styles.closeButton}>&times;</button>
          
          {totalImages > 1 && (
            <button onClick={prevImage} className={`${styles.modalArrow} ${styles.left}`}>
              &#10094;
            </button>
          )}

          <img
            src={imageUrl}
            alt={title}
            className={styles.modalImage}
            onClick={(e) => e.stopPropagation()} // Impede de fechar ao clicar na imagem
          />

          {totalImages > 1 && (
            <button onClick={nextImage} className={`${styles.modalArrow} ${styles.right}`}>
              &#10095;
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default PropertyCard;
