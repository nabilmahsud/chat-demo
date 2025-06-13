# 🚀 Demo Introduction
- This is a simple AI-powered Vendor Chatbot built with NestJS, designed to let users ask natural language questions about vendors stored in a PostgreSQL database. By integrating Gemini and OpenAI, the system extracts relevant vendor data based on the user's prompt and uses an LLM to generate intelligent responses. For example, users can ask, “What is the email of Papertrail vendor?” and the chatbot will provide the correct answer using the data stored in the database.
  
- Here is the data in the Vendor Database, you can ask questions related to these vendors 
![image](https://github.com/user-attachments/assets/39782892-ee41-45bb-b66b-d23c823667c6)
- Now you can ask questions through Chat endpoint such as
![image](https://github.com/user-attachments/assets/929551b6-94a5-4979-aa13-93996f204aa5)
- And you will get responses such as
![image](https://github.com/user-attachments/assets/2e71221c-feaf-4b12-8eac-f8be9b0ad070)




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

![image](https://github.com/user-attachments/assets/883e6689-1951-4412-9bd6-ef65767152ca)


# 📦 Environment Configuration with .env

![image](https://github.com/user-attachments/assets/3d9d3896-19af-4912-9a49-a09093215531)

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
![image](https://github.com/user-attachments/assets/f6f31644-d2f6-4418-8a44-b8d54ca55849)


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

![image](https://github.com/user-attachments/assets/ac4e12b5-4117-4978-90a6-55bc22f735c2)


**2. Adapter Pattern for LLMS**

To support multiple AI platforms (e.g., Gemini, OpenAI), the Adapter Pattern was introduced

- A common interface is defined for language models.
- Each adapter implements this interface (e.g., GeminiAdapter, OpenAIAdapter).
- New models can be added with minimal changes to the rest of the application.

This follows the Open/Closed Principle from SOLID:

**"Software entities should be open for extension but closed for modification."**

![image](https://github.com/user-attachments/assets/6b530377-9d4f-4135-8900-d2826992df48)


**3. Dependency Injection (DI)**

NestJS’s built-in Dependency Injection system was heavily utilized for managing service and class instances.

- Each service (e.g., AuthService, VendorService, ChatService) is injected where needed.
- This ensures singletons by default, services are instantiated once and reused, saving memory and improving performance.
- DI promotes loose coupling, testability, and clean architecture.

![image](https://github.com/user-attachments/assets/b9d6b528-ec33-46ce-bd28-3f513056918a)


# 📄 API Documentation with Swagger

This project integrates Swagger for automatic API documentation and testing. Swagger provides a user-friendly web interface where you can view all the available endpoints, inspect their request/response schemas, and interact with the backend without needing an external client like Postman.
