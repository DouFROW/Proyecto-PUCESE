CREATE DATABASE IF NOT EXISTS my_database;
USE my_database;

CREATE TABLE IF NOT EXISTS socios (
  id_socio INT AUTO_INCREMENT PRIMARY KEY,
  codigo_socio VARCHAR(50) UNIQUE NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  cedula VARCHAR(20) UNIQUE NOT NULL,
  direccion TEXT,
  departamento VARCHAR(100),
  fecha_ingreso DATE,
  nombre_banco VARCHAR(100),
  numero_cuenta VARCHAR(50),
  salario DECIMAL(10,2),
  email VARCHAR(100),
  telefono VARCHAR(20),
  estado ENUM('Activo', 'Inactivo') DEFAULT 'Activo',
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);