# 🚀 Installation & Setup Instructions

**Prerequisites**

- PostgreSQL must be installed and running.
- Node.js (v18 or higher recommended) must be installed.

**Setup environment variables**

You need to provide database credentials and API keys via a .env file, refer to the environment variables section to see the format for .env file

**Install Dependencies**

```
yarn install                   # Navigate to the project directory and
```

**Start the application**

```
yarn start                     # Run this command to start the application
```

**Test the API using Swagger**

- Once the server is running, open your browser and navigate to http://localhost:8000/api
- This will open the Swagger UI where you can interactively test all available API endpoints.

![image](https://github.com/user-attachments/assets/9f99b226-bf7c-412a-bfe8-f3683337d4d7)

# 📦 Environment Configuration with .env

![image](https://github.com/user-attachments/assets/9c496f7e-2d59-4cee-80cf-502ac4b95c18)
It contains the following environment variables.

```
DB_USERNAME=postgres
DB_PASSWORD=123
DB_NAME=chat-demo
DB_HOST=localhost
DB_PORT=5432

# API Keys
GEMINI_API_KEY=AIzaSy...
OPENAI_API_KEY=sk-proj-...

JWT_SECRET=secret
```

These environment variables are accessed by injecting the ConfigService where required through dependency injection.
![image](https://github.com/user-attachments/assets/2e9d42c9-f78d-4b4e-85f4-660296c131d7)

# 📁 Project Structure

```
src/
├── auth/           # Handles authentication (login, register)
├── chat/           # Handles chat-related logic (controller, service)
├── core/           # Configuations
│   ├── config/     # Configuration service
│   └── guards/     # Route guards (e.g., AuthGuard, SkipAuth)
├── llm/            # Large Language Model integration
│   ├── adapters/   # Gemini and OpenAI adapters
│   └── interfaces/ # Common interface for LLMs
├── user/           # User entity and service
├── vendor/         # Vendor entity, controller, and service
├── app.module.ts   # Root module for the NestJS app
├── main.ts         # Entry point to bootstrap the application
.env                # Environment variable file
```

# 🔑 Key Design Decisions

**1. Layered Architecture**

One of the primary design decisions was to implement a layered architecture to ensure a clean separation of concerns:

- **Controller Layer**: Handles incoming HTTP requests and delegates business logic.
- **Service Layer**: Contains the core business logic and interacts with the data layer.
- **Data Layer**: Responsible for interacting with the database through repositories.

This structure improves maintainability, testability, and scalability, allowing each layer to evolve independently.

![image](https://github.com/user-attachments/assets/6930a2a2-50fa-462d-b358-b76eccb61a1f)

**2. Adapter Pattern for LLMS**

To support multiple AI platforms (e.g., Gemini, OpenAI), the Adapter Pattern was introduced

- A common interface is defined for language models.
- Each adapter implements this interface (e.g., GeminiAdapter, OpenAIAdapter).
- New models can be added with minimal changes to the rest of the application.

This follows the Open/Closed Principle from SOLID:

**"Software entities should be open for extension but closed for modification."**

![image](https://github.com/user-attachments/assets/6bfdc978-573d-4378-a13e-f551de0f93a6)

**3. Dependency Injection (DI)**

NestJS’s built-in Dependency Injection system was heavily utilized for managing service and class instances.

- Each service (e.g., AuthService, VendorService, ChatService) is injected where needed.
- This ensures singletons by default, services are instantiated once and reused, saving memory and improving performance.
- DI promotes loose coupling, testability, and clean architecture.

![image](https://github.com/user-attachments/assets/10ad47c6-2d14-4fc2-98f1-cce785b05416)

# 📄 API Documentation with Swagger

This project integrates Swagger for automatic API documentation and testing. Swagger provides a user-friendly web interface where you can view all the available endpoints, inspect their request/response schemas, and interact with the backend without needing an external client like Postman.
