import React, { useState } from "react";
import Button from "./ui/Button"; // Migración: Usar botón UI estándar
import Input from "./ui/Input"; // Migración: Usar input UI estándar

interface Animal {
  nombre: string;
  estado: string;
  ubicacion: string;
  edad: string;
  imagen: string;
}

interface FormData {
  name: string;
  email: string;
  reason: string;
}

interface Props {
  animal: Animal;
  onSubmit: (data: FormData) => void;
}

export default function AdoptionForm({ animal, onSubmit }: Props) {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    reason: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form); // enviamos datos al padre (Adopcion.tsx)
  };

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

      {/* Migración: Se reemplaza el botón nativo por el componente Button UI estándar. Se mantiene la lógica y accesibilidad. */}
      <Button
        type="submit"
        variant="primary"
        className="bg-green-600 hover:bg-green-700 focus:outline-green-600"
        aria-label="Enviar solicitud de adopción"
      >
        Enviar solicitud
      </Button>
    </form>
  );
}
