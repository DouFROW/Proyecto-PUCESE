CREATE DATABASE IF NOT EXISTS my_database;
USE my_database;

-- ================================
-- 🧍‍♂️ TABLA DE SOCIOS
-- ================================
CREATE TABLE IF NOT EXISTS socios (
  id_socio INT AUTO_INCREMENT PRIMARY KEY,
  codigo_socio VARCHAR(50) UNIQUE NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  cedula VARCHAR(20) UNIQUE NOT NULL,
  direccion TEXT,
  
  -- 🔹 Información de contacto
  email VARCHAR(100),
  telefono VARCHAR(20),
  
  -- 🔹 Información laboral
  departamento VARCHAR(100),
  rol VARCHAR(100),
  fecha_ingreso DATE,
  
  -- 🔹 Información bancaria
  nombre_banco VARCHAR(100),
  numero_cuenta VARCHAR(50),
  tipo_cuenta VARCHAR(50),

  -- 🔹 Datos económicos
  salario DECIMAL(10,2) DEFAULT 0.00,
  aportes DECIMAL(10,2) DEFAULT 0.00,
  prestamos DECIMAL(10,2) DEFAULT 0.00,

  -- 🔹 Estado y fecha de registro
  estado ENUM('Activo', 'Inactivo') DEFAULT 'Activo',
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- 💰 TABLA DE SOLICITUDES DE PRÉSTAMOS
-- ================================
CREATE TABLE IF NOT EXISTS solicitudes_prestamos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  codigo_solicitud VARCHAR(20) NOT NULL,
  socio_id INT NOT NULL,
  monto DECIMAL(10,2) NOT NULL,
  plazo INT NOT NULL,
  fecha_solicitud DATETIME NOT NULL,
  motivo VARCHAR(255),
  estado ENUM('Pendiente', 'En Revisión', 'Aprobado', 'Rechazado') DEFAULT 'Pendiente',
  FOREIGN KEY (socio_id) REFERENCES socios(id_socio) ON DELETE CASCADE ON UPDATE CASCADE
);
