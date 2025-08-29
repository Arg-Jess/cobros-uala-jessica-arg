## Instalación y ejecución

1. Instalar dependencias:
   yarn install

2. Ejecutar en modo desarrollo:
   yarn dev

3. Construir para producción:
   yarn build

4. Ejecutar pruebas:
   yarn test

## Arquitectura del proyecto

src/
├── assets/ # Imágenes, íconos, recursos estáticos
├── components/ # Componentes reutilizables (atoms, molecules, organisms)
├── context/ # Context API para estado global
├── pages/  
├── services/ # Conexión a APIs
├── utilities/ # Funciones auxiliares
├── App.tsx
├── main.tsx
├── index.css # Tailwind CSS

Context API: manejo de estado global para este proyecto pequeño, evitando librerías externas innecesarias.
Modular y escalable: separación clara de componentes, páginas, servicios y utilidades.

## Decisiones técnicas

Vite: arranque rápido y configuración mínima.

TypeScript: tipado estricto para mayor seguridad y menos errores.

Tailwind CSS: desarrollo rápido, consistente y fácil de adaptar a diseño responsive.

Jest + React Testing Library: para pruebas unitaria verificando que cada componente funcione correctamente de forma aislada.

Context API: solución ligera y suficiente para el tamaño del proyecto.

Arquitectura modular: facilita escalabilidad y mantenimiento.

## Posibles mejoras a futuro

1. Paginación o scroll infinito

Para mejorar el rendimiento al manejar grandes cantidades de transacciones.

2. Autenticación y roles de usuario

Agregar login y permisos para proteger los datos y ofrecer funcionalidades diferenciadas según el rol.
