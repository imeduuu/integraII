/**
 * Página de Preguntas Frecuentes (FAQs)
 */
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { faqs } from '../services/mockFaqs';
import styles from '../styles/faqs.module.css';

const FaqsPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <h1 className={styles.title}>Preguntas Frecuentes</h1>
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <div
                className={styles.question}
                onClick={() => handleToggle(index)}
              >
                {faq.question}
                <span>{openIndex === index ? '-' : '+'}</span>
              </div>
              {openIndex === index && (
                <div className={styles.answer}>{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FaqsPage;