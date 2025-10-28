/**
 * Formulario de solicitud de adopción de animales
 */
import React, { useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Loader from "./ui/Loader";
import { useNotification } from "../components/NotificationProvider";
import { isEmail, isRequired } from '../utils/validators';

interface Animal {
  nombre: string;
  estado: string;
  ubicacion: string;
  edad: string;
  imagen: string;
}

interface FormData {
  name: string; // Nombre del solicitante
  email: string; // Email de contacto
  reason: string; // Motivo de adopción
}

interface Props {
  animal: Animal; // Datos del animal a adoptar
  onSubmit: (data: FormData) => void; // Callback al enviar formulario
}

/**
 * Formulario para solicitar adopción de un animal específico
 * Recolecta datos del solicitante y motivo de adopción
 */
export default function AdoptionForm({ animal, onSubmit }: Props) {
  // Estado del formulario
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    reason: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useNotification();

  // Actualizar campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Enviar solicitud de adopción
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mostrar loader y deshabilitar formulario
    setIsSubmitting(true);
    // Validaciones básicas
    if (!isRequired(form.name) || !isRequired(form.reason)) {
      addToast('Por favor completa todos los campos requeridos', 'error');
      setIsSubmitting(false);
      return;
    }
    if (!isEmail(form.email)) {
      addToast('El correo electrónico no es válido', 'error');
      setIsSubmitting(false);
      return;
    }

    // Simular llamada asíncrona si onSubmit no es async
    Promise.resolve()
      .then(() => onSubmit(form))
      .then(() => {
        addToast('Solicitud enviada con éxito', 'success');
      })
      .catch(() => {
        addToast('Ocurrió un error al enviar la solicitud', 'error');
      })
      .finally(() => setIsSubmitting(false));
  };
const [acceptedPolicy, setAcceptedPolicy] = useState(false);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow rounded p-6 space-y-4"
    >
      <h2 className="text-xl font-bold mb-2">
        Solicitud de adopción para {animal.nombre}
      </h2>
      <p className="text-sm text-gray-600">
        {animal.nombre} ({animal.edad}) - {animal.ubicacion}
      </p>

      <div>
        <label htmlFor="name" className="block font-medium">Tu nombre</label>
        {/* Migración: Se reemplaza el input nativo por el componente Input UI estándar. */}
        <Input
          id="name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          aria-required="true"
          aria-label="Nombre del solicitante"
          aria-describedby="name-help"
          className="border p-2 rounded w-full focus:outline focus:outline-2 focus:outline-green-600"
        />
        <span id="name-help" className="text-xs text-gray-500">Escribe tu nombre completo.</span>
      </div>

      <div>
        <label htmlFor="email" className="block font-medium">Tu email</label>
        <Input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          aria-required="true"
          aria-label="Correo electrónico"
          aria-describedby="email-help"
          className="border p-2 rounded w-full focus:outline focus:outline-2 focus:outline-green-600"
        />
        <span id="email-help" className="text-xs text-gray-500">Debes ingresar un correo válido.</span>
      </div>

      <div>
        <label htmlFor="reason" className="block font-medium">Motivo de adopción</label>
        <textarea
          id="reason"
          name="reason"
          value={form.reason}
          onChange={handleChange}
          required
          aria-required="true"
          aria-label="Motivo de adopción"
          aria-describedby="reason-help"
          className="border p-2 rounded w-full focus:outline focus:outline-2 focus:outline-green-600"
        />
        <span id="reason-help" className="text-xs text-gray-500">Explica por qué quieres adoptar.</span>
      </div>
{}
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          id="acceptPolicy"
          checked={acceptedPolicy}
          onChange={(e) => setAcceptedPolicy(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="acceptPolicy" className="text-sm text-gray-700">
          Acepto la{" "}
          <a
            href="/politica-privacidad"
            className="text-green-700 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            política de privacidad
          </a>
        </label>
      </div>

      {/* Botón deshabilitado hasta aceptar la política */}
      <Button
        type="submit"
        variant="primary"
        className="bg-green-600 hover:bg-green-700 focus:outline-green-600 mt-4"
        aria-label="Enviar solicitud de adopción"
        disabled={isSubmitting || !acceptedPolicy}
      >
        {isSubmitting ? (
          <span className="inline-flex items-center gap-2">
            <Loader size={16} /> Enviando...
          </span>
        ) : (
          "Enviar solicitud"
        )}
      </Button>
    </form>
  );
}