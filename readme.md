# Test project
Mahdi Nouri

## install

### **1. install dependencies**

for install this project run command above.
more details of packages on [package.json](./package.json).

```bash
# for npm package manager
npm install
# or for yarn package manager
yarn install
```

### **2. Configuration Variables**

#### **2.1 Logging Directory**
   - **Variable**: `LOG_DIR`
   - **Description**: Specifies the path to the directory where log files are stored. In this case, it points to a relative path where logs are written to a `data.db` file.
   - **Example**:
     ```bash
     LOG_DIR="file:../logs/data.db"
     ```
   - **Usage**: This is useful for defining where application logs are stored, ensuring logging happens in the correct location without hardcoding paths in your code.

#### **2.2 Database Connection URL**
   - **Variable**: `DATABASE_URL`
   - **Description**: Contains the MongoDB connection string used to connect to a MongoDB Atlas cluster. This string includes the username, password, and the cluster details.
   - **Structure**:
     ```
     mongodb+srv://<username>:<password>@<app-name>.lsf3e.mongodb.net/<cluster-name>?retryWrites=true&w=majority&appName=<app-name>
     ```
   - **Parameters**:
     - `<username>`: The MongoDB username for authentication.
     - `<password>`: The password for the database user.
     - `<app-name>`: The name of your MongoDB application.
     - `<cluster-name>`: The name of your MongoDB cluster.
   - **Example**:
     ```bash
     DATABASE_URL="mongodb+srv://admin:password123@app.lsf3e.mongodb.net/cluster01?retryWrites=true&w=majority&appName=myApp"
     ```

   - **Usage**: This variable allows the application to connect to a MongoDB database without embedding credentials directly in the code. Make sure to replace placeholders with actual values.



### **3. Available Commands**

#### **3.1 Development Server**
Starts the development server using `nodemon`, which automatically  restarts whenever file changes are detected.
- Usage:
```bash
npm run dev
```

#### **3.2 Linting**
Lints all TypeScript files (`.ts`) in the project using ESLint to catch syntax and style issues.
- Usage:
```bash
npm run lint
```

#### **3.3 Database Migration**
Executes database migrations and generates Prisma Client code for the defined schemas. This :

- creates and updates the Prisma Client code based on the provided Prisma schema files. This allows your application to interact with the database using Prisma’s type-safe queries.
- Applying Schema Changes: Pushes the defined schema changes to the MongoDB database, ensuring that the database structure is in sync with the schema definitions.
- Usage:
```bash
npm run migrate
```


## Scenario
Develop a modular and clean RESTful API for a task management application using Express.js with TypeScript. The database will be Cloud MongoDB.

Requirements:
1. CRUD Operations:
    - DONE GET /tasks: List all tasks.
    - DONE POST /tasks: Create a new task.
    - DONE GET /tasks/:id: View a specific task.
    - DONE PUT /tasks/:id: Update a specific task.
    - DONE DELETE /tasks/:id: Delete a specific task. Task Model:
2. Tasks should have the following fields:
    - DONE id: A unique task ID generated by MongoDB.
    - DONE title: The title of the task (string, required).
    - DONE description: A description of the task (string, optional).
    - DONE completed: The completion status of the task (boolean, default: false).

Database:

    - DONE MongoDB Atlas (cloud MongoDB) will be used.
    - DONE The MongoDB connection URL should be stored in an .env file.
    - DONE Mongoose should be used to handle the database connection.

TypeScript:

    - DONE The entire project should be written using TypeScript.
    - DONE Define proper types for models, controllers, and services.

Project Structure:

    - DONE controllers/tasksController.ts: Manages API requests and responses.
    - DONE services/tasksService.ts: Contains the business logic for task operations.
    - DONE models/taskModel.ts: Defines the Mongoose schema and TypeScript types fo tasks.

Validations:

    - DONE The title field must be required and at least 3 characters long when creating a Ensure that responses are always in JSON format.

Environment Variables:

    - DONE MongoDB connection URL and other configurations should be placed in the env

Additional Criteria:

    - DONE Use Express.js with TypeScript for the entire project.
    - DONE Implement proper error handling with appropriate HTTP status codes for invalid requests.
    - DONE Use ESLint with TypeScript to ensure code quality.
    - CANCELED Optional: Add Swagger documentation to the API.
    - DONE Ensure clean and maintainable code following SOLID principles.

Submission:

    - The project should be uploaded to GitHub.
    - Done A README file should include setup and run instructions.
    - Include documentation on how to configure the MongoDB connection.
    
This case will allow the evaluation of the candidate's skills in Express.js, TypeScript, and MongoDB integration, while focusing on code organization and API structure.