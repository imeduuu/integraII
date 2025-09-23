import React, { useState } from 'react';
import Input from '../components/ui/Input'; // Migración: Usar input UI estándar
import Button from '../components/ui/Button'; // Migración: Usar botón UI estándar
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/donations.module.css';

const Donations = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  type: '',
  quantity: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Donación registrada:', formData);
  alert('¡Gracias por tu donación! (Prueba sin guardar en la base de datos)');
    setFormData({ name: '', email: '', type: '', quantity: '', message: '' });
  };

  return (
    <>
      <Navbar />
      <main className={styles.wrapper}>
        <section className={styles.card}>
          <h2 className={styles.title}>Donaciones y Voluntariado</h2>
          <form onSubmit={handleSubmit} className={styles.formGrid}>
            <div className={styles.group}>
              <label className={styles.label}>Nombre</label>
              {/* Migración: Se reemplaza el input nativo por el componente Input UI estándar. */}
              <Input
                className={styles.input}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
              />
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Correo electrónico</label>
              <Input
                className={styles.input}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tucorreo@ejemplo.com"
              />
              <span className={styles.helper}>Opcional, por si necesitamos contactarte.</span>
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Tipo de donación</label>
              <select
                className={styles.select}
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona...</option>
                <option value="alimento">Alimento</option>
                <option value="medicinas">Medicinas</option>
                <option value="ropa">Ropa</option>
                <option value="otros">Otros</option>
              </select>
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Cantidad</label>
              <Input
                className={styles.input}
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                placeholder="Ej: 5 cajas, 10 sacos"
              />
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Mensaje (opcional)</label>
              <textarea
                className={styles.textarea}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Detalles de la donación"
              />
            </div>
            <div className={styles.actions}>
              {/* Migración: Se reemplaza el botón nativo por el componente Button UI estándar. */}
              <Button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>Registrar Donación</Button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Donations;
