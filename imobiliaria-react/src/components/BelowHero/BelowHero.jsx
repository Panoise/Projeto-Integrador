import React from "react";
import styles from "./BelowHero.module.css";
import img05 from "../../assets/images/img06.jpg";

// Dados para os blocos de "Nosso Diferencial"
const differentialItems = [
  {
    id: 1,
    title: "Visão Estratégica",
    description: "Compreendemos o mercado e oferecemos as melhores oportunidades."
  },
  {
    id: 2,
    title: "Atendimento Único",
    description: "Nossa equipe dedicada acompanha você em cada passo."
  },
  {
    id: 3,
    title: 'Análise de Mercado',
    description: "Dados precisos para decisões inteligentes e seguras."
  },
  {
    id: 4,
    title: "Segurança e Confiança",
    description: "Transparência total em todas as negociações."
  }
];

const BelowHero = () => { // Nome da função do componente
    return (
        <section className={styles.belowSection}> 
            <div className={styles.belowContent}>
                <h7 className={styles.sectionTitle}>
                    Minha Casa Imóveis
                </h7>
                <div className={styles.sectionDivider}></div> {/* Linha horizontal */}

                <div className={styles.itemsGrid}>
                    {differentialItems.map(item => (
                        <div key={item.id} className={styles.itemCard}>
                            <span className={styles.itemIcon}>{item.icon}</span>
                            <h4 className={styles.itemTitle}>{item.title}</h4>
                            <p className={styles.itemDescription}>{item.description}</p>
                        </div>
                    ))}
                </div>
                <div className={styles.fullWidthImageContainer}> {/*Imagem Anuncio*/}
                   <img src={img05} 
                        alt="Imagem de Diferencial da Imobiliária - financiamentos Caixa Economica Federal" 
                   className={styles.fullWidthImage}/>
                </div>
            </div>
        </section>
    );
};

export default BelowHero;