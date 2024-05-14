# Documentación de API

## Introducción

Esta API está diseñada siguiendo el patrón de arquitectura CQRS (Command Query Responsibility Segregation), y orientada hacer un microservicio, aplicando principios de código limpio SOLID y con pruebas unitarias integradas.

## Diagrama de Arquitectura

Para ver el diagrama de arquitectura de la API, haz clic en el siguiente enlace:

[Diagrama de Arquitectura](img/architecture_diagram.png)

## Configuración

### Requisitos

- Node.js versión 12.x o superior
- Base de datos PostgreSQL

### Instalación

1. Clonar el repositorio:
   ```bash
   git clone [URL del repositorio]

2. Instalar dependencias: 
   ```bash
   npm install

3. Configurar variables de entorno:
   ```bash
   Copiar el archivo `.env.template` a `.env` y llenar los detalles requeridos.

### Pruebas

#### Estrategia de pruebas
Las pruebas unitarias están implementadas utilizando la librería Jest. Esto asegura que cada componente de la API funcione correctamente de manera aislada.

#### Ejecutar pruebas
Cómo ejecutar las pruebas unitarias:
   ```bash
        npm run test
   ```

Cómo ejecutar el coverage de las pruebas
```bash
    npm run test:cov
```


### Principios SOLID

#### Responsabilidad Única

Se aplicó el principio de Responsabilidad Única para separar las responsabilidades dentro de la API, lo que ayuda a mantener el código más organizado y legible. Cada clase y método tiene una sola razón para cambiar, facilitando así la mantenibilidad y la escalabilidad del proyecto.

