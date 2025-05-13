
# 🚗 Taller Service - Gestión de Vehículos en Taller

Aplicación web full-stack desarrollada con **Spring Boot** en el backend y **ReactJS (Vite)** en el frontend. Esta solución permite a una empresa de talleres registrar y gestionar vehículos que entran y salen del taller, incluyendo tipos específicos de combustibles y reconversiones.

## 🧰 Tecnologías utilizadas

### 🔙 Backend
- Java 21
- Spring Boot 3
- Spring Data JPA
- PostgreSQL
- Hibernate Validator
- Lombok
- SpringDoc OpenAPI (Swagger)
- Maven

### 🔜 Frontend
- ReactJS
- Vite
- Tailwind CSS
- Fetch API o Axios

## 📋 Funcionalidades principales

### Vehículos admitidos
- 🚗 **Gasolina**: Registra los tipos de combustible usados (B83, B90, B94, B100 o combinación de estos).
- 🚙 **Diésel**: Registra tipo de bomba de inyección (Lineal o Rotatoria).
- ⚡ **Eléctrico**: Registra tipo de batería (GEL o LITIO), voltaje y corriente.

### Operaciones disponibles
- ✅ Registro de entrada de vehículos (evita duplicados por matrícula y VIN).
- 🚪 Dar salida a vehículos del taller.
- 🔍 Consulta del inventario filtrando por tipo de combustible.
- 🧾 Generación de código de registro por tipo de vehículo:
    - Diésel: Matrícula + tipo de bomba.
    - Eléctrico: VIN + voltaje + corriente + tipo de batería.
    - Gasolina: Matrícula + tipos de combustible.
- 🔄 Reconversión de vehículos eléctricos a gasolina (única reconversión permitida). Registra nuevo tipo de combustible tras conversión.

### Nota: ###
Los nomecladores como tipo de bomba, batería y combustibles están quemados localmente por premura, lo correcto es que se cosumieran desde la BD.

## 🧪 Perfil `dev`

La aplicación cuenta con un perfil de desarrollo (`dev`) activado por defecto.

### 📘 Documentación interactiva
Puedes acceder a la documentación Swagger/OpenAPI en el entorno de desarrollo mediante:

http://localhost:8080/swagger-ui/index.html


## 🚀 Ejecución del proyecto

### 🔙 Backend

1. Clona el repositorio.
2. Crea una base de datos PostgreSQL llamada `taller_db`.
3. Verifica en `application.properties` que la configuración de base de datos sea:

```
spring.datasource.url=jdbc:postgresql://localhost:5432/taller_db
spring.datasource.username=postgres
spring.datasource.password=postgres123
spring.profiles.active=dev
```

4. Ejecuta la aplicación desde tu IDE o con Maven:

````bash
./mvnw spring-boot:run
````


### 🔜 Frontend

1. Ve a la carpeta del frontend `frontend_service`).
2. Instala las dependencias:

````bash
npm install
````

3. Inicia el servidor de desarrollo:

````bash
npm run dev
````


Accede a la aplicación en:  
http://localhost:5173
