 /**
 * Formulario de solicitud de adopción de animales
 */
 import React, { useState } from "react";
 import Button from "./ui/Button";
 import Input from "./ui/Input";
 
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
 
   // Actualizar campos del formulario
   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
     setForm({ ...form, [e.target.name]: e.target.value });
   };
 
   // Enviar solicitud de adopción
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     onSubmit(form); // Envía datos al componente padre
   };
 
   return (
     <form
       onSubmit={handleSubmit}
       role="form"
       aria-labelledby="adoption-title"
       className="max-w-md mx-auto bg-white shadow rounded p-6 space-y-4"
     >
       <h2 id="adoption-title" className="text-xl font-bold mb-2">
         Solicitud de adopción para {animal.nombre}
       </h2>
       <p className="text-sm text-gray-600">
         {animal.nombre} ({animal.edad}) - {animal.ubicacion}
       </p>
 
       <div>
         <label htmlFor="name" className="block font-medium">Tu nombre</label>
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
 