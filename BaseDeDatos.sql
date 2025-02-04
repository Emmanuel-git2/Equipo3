--Creando la base de datos de BrickMania.
USE master;
GO
IF NOT EXISTS (
    SELECT name FROM sys.databases WHERE name = N'BrickMania'
)
CREATE DATABASE BrickMania;
GO
USE BrickMania;
GO

-- ===============================
-- TABLA DE CLIENTES
-- ===============================
CREATE TABLE `Clientes` (
    `Cliente_Id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `Nombre` VARCHAR(50) NOT NULL,
    `Edad` INT UNSIGNED CHECK (Edad >= 0),
    `email` VARCHAR(80) NOT NULL UNIQUE,
    `Direccion` VARCHAR(200) NOT NULL
);

-- ==========================================
-- TABLA DE CATEGORÍAS
-- ==========================================
CREATE TABLE `Categorias` (
    `Id_categoria` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `Nombre_categoria` VARCHAR(50) NOT NULL UNIQUE
);

-- ============================================
-- TABLA DE PRODUCTOS
-- ============================================
CREATE TABLE `Productos` (
    `Id_producto` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `Nombre_Product` VARCHAR(70) NOT NULL,
   `Descripcion` VARCHAR(500),
    `Precio_product` DECIMAL(10,2) NOT NULL CHECK (Precio_product >= 0),
    `Id_categoria_fk` INT UNSIGNED NOT NULL,
    FOREIGN KEY (Id_categoria_fk) REFERENCES Categorias(Id_categoria) ON DELETE CASCADE
);

-- ============================================
-- TABLA DE MÉTODOS DE PAGO
-- ============================================
CREATE TABLE `Metodos_Pago` (
    `Id_metodo` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `Metodo` VARCHAR(50) NOT NULL UNIQUE
);

-- =============================================
-- TABLA DE ESTADOS DE PEDIDO
-- ==============================================
CREATE TABLE `Estados_Pedido` (
    `Id_estado` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `Estado` VARCHAR(50) NOT NULL UNIQUE
);

-- ===============================================
-- TABLA DE PEDIDOS
-- ==============================================
CREATE TABLE `Pedidos` (
    `Id_pedido` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `Cliente_Id_fk` INT UNSIGNED NOT NULL,
    `Id_producto_fk` INT UNSIGNED NOT NULL,
    `Cantidad_Productos` INT UNSIGNED NOT NULL CHECK (Cantidad_Productos > 0),
    `Total_Pago` DECIMAL(10,2) NOT NULL CHECK (Total_Pago >= 0),
    `Fecha_compra` DATE NOT NULL DEFAULT (CURRENT_DATE),
    `Id_metodo_fk` INT UNSIGNED NOT NULL,
    `Id_estado_fk` INT UNSIGNED NOT NULL,
    FOREIGN KEY (`Cliente_Id_fk`) REFERENCES `Clientes`(`Cliente_Id`) ON DELETE CASCADE,
    FOREIGN KEY (`Id_producto_fk`) REFERENCES `Productos`(`Id_producto`) ON DELETE CASCADE,
    FOREIGN KEY (`Id_metodo_fk`) REFERENCES `Metodos_Pago`(`Id_metodo`),
    FOREIGN KEY (`Id_estado_fk`) REFERENCES `Estados_Pedido`(`Id_estado`)
);

-- Índice para mejorar consultas por fecha
CREATE INDEX idx_fecha_compra ON `Pedidos`(`Fecha_compra`);

-- =============================================
-- TABLA DE CARRITO DE COMPRAS
-- ==============================================
CREATE TABLE `Carrito` (
    `Id_carrito` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `Cliente_Id_fk` INT UNSIGNED NOT NULL,
    `Id_producto_fk` INT UNSIGNED NOT NULL,
    `Cantidad` INT UNSIGNED NOT NULL CHECK (Cantidad > 0),
    FOREIGN KEY (`Cliente_Id_fk`) REFERENCES `Clientes`(`Cliente_Id`) ON DELETE CASCADE,
    FOREIGN KEY (`Id_producto_fk`) REFERENCES `Productos`(`Id_producto`) ON DELETE CASCADE
);

-- =================================================
-- TABLA DE ROLES DE USUARIOS
-- ================================================
CREATE TABLE `Roles` (
    `Id_rol` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `Nombre_rol` VARCHAR(50) NOT NULL UNIQUE
);

-- ===============================================
-- TABLA DE USUARIOS
-- ===============================================
CREATE TABLE Usuarios (
    `Id_usuario` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `Nombre` VARCHAR(50) NOT NULL,
    `email` VARCHAR(80) NOT NULL UNIQUE,
    `Contraseña` VARCHAR(255) NOT NULL, -- Se almacena encriptada :D
    `Id_rol_fk` INT UNSIGNED NOT NULL,
    FOREIGN KEY (`Id_rol_fk`) REFERENCES `Roles`(`Id_rol`)
);


INSERT INTO `clientes` (`Nombre`, `Edad`, `email`, `Direccion`) VALUES ();

INSERT INTO `Productos` (`Nombre_Product`, `Descripccion`, `Precio_product`) VALUES ();

INSERT INTO `Pedidos` (`Cantidad_Productos`, `Total_Pago`,`Fecha_compra`) VALUES ();

