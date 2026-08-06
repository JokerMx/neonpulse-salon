-- backend/database/schema.sql
CREATE DATABASE IF NOT EXISTS neonpulse_salon
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE neonpulse_salon;

-- Tabla: servicios
CREATE TABLE servicios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    duracion INT NOT NULL COMMENT 'Duración en minutos',
    categoria ENUM('CORTE','TINTE','TRATAMIENTO','PEINADO','MAQUILLAJE','BARBA','DEPILACION') NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla: profesionales
CREATE TABLE profesionales (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    especialidad ENUM('ESTILISTA','COLORISTA','MAQUILLADORA','BARBERO','DEPILADORA') NOT NULL,
    horario JSON COMMENT 'Días y horas de trabajo',
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla: clientes
CREATE TABLE clientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(100) UNIQUE,
    tipo ENUM('NUEVO','REGULAR','VIP') DEFAULT 'NUEVO',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla: reservas
CREATE TABLE reservas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT NOT NULL,
    servicio_id INT NOT NULL,
    profesional_id INT NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    estado ENUM('PENDIENTE','CONFIRMADA','EN_PROGRESO','COMPLETADA','CANCELADA') DEFAULT 'PENDIENTE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE RESTRICT,
    FOREIGN KEY (servicio_id) REFERENCES servicios(id) ON DELETE RESTRICT,
    FOREIGN KEY (profesional_id) REFERENCES profesionales(id) ON DELETE RESTRICT,
    UNIQUE KEY unique_reserva (profesional_id, fecha, hora)
);

-- Datos de prueba
INSERT INTO servicios (nombre, descripcion, precio, duracion, categoria) VALUES
('Corte de Cabello', 'Corte clásico y moderno', 25000, 45, 'CORTE'),
('Tinte Completo', 'Coloración completa', 80000, 120, 'TINTE'),
('Manicure', 'Cuidado y pintado de uñas', 35000, 60, 'TRATAMIENTO'),
('Maquillaje Social', 'Maquillaje para eventos', 50000, 90, 'MAQUILLAJE');

INSERT INTO profesionales (nombre, especialidad, horario) VALUES
('María González', 'ESTILISTA', '{"lunes": "09:00-18:00", "martes": "09:00-18:00"}'),
('Carlos Rodríguez', 'BARBERO', '{"miercoles": "10:00-20:00", "jueves": "10:00-20:00"}'),
('Ana Martínez', 'COLORISTA', '{"viernes": "09:00-17:00", "sabado": "09:00-14:00"}');