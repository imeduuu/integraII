import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AccessDenied = () => (
	<>
		<Navbar />
		<main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
			<div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">
				<h1 className="text-2xl font-bold text-red-600 mb-4">Acceso Denegado</h1>
				<p className="text-gray-700 mb-2">No tienes permisos para acceder a esta página.</p>
				<a href="/" className="text-blue-600 underline">Volver al inicio</a>
			</div>
		</main>
		<Footer />
	</>
);

export default AccessDenied;
