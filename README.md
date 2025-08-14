# Quiz Builder 🚀

Quiz Builder is a full-stack web application for creating, viewing, and managing quizzes. The project is built with modern technologies using a monorepo architecture, allowing for easy management of both the frontend and backend in a single repository.

- **Backend**: Node.js, Express, TypeScript, Prisma, PostgreSQL
- **Frontend**: Next.js, React, TypeScript

## 🚀 Getting Started

To run this project locally, you will need **Node.js** (v18+ recommended), **npm** (v7+ for Workspaces support), and **Docker** (recommended for the database).

### 1. Clone the Repository

First, clone the repository to your local machine and navigate into the working directory `app`.

```bash
git clone https://github.com/Iarynovskyi/quiz.git
cd quiz/app
```

### 2. Install Dependencies

This project uses `npm workspaces`. All dependencies for the frontend and backend are installed with a single command from the root `app` folder.

```bash
npm install
```

### 3. Set Up the Environment

To run the application, you need to configure environment variables for the backend (database connection) and the frontend (API address).

#### Step 1: Configure the Backend (Database)

The easiest way to run PostgreSQL is with Docker.

1.  **Run the database container:**
    ```bash
    docker run --name quiz-db -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=quizdb -p 5432:5432 -d postgres
    ```
    *You can change `myuser`, `mypassword`, and `quizdb`, but remember to update them in the next step.*

2.  **Create the `.env` file for the backend**

3.  **Fill in the backend `.env` file:**
    Open `backend/.env` and enter your database connection string. If you used the command above, it will look like this:
    ```env
    # backend/.env
    DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/quizdb"
    ```

#### Step 2: Configure the Frontend (API Address)

1.  **Create the `.env` file for the frontend**

2.  **Fill in the frontend `.env` file:**
    Open `frontend/.env` and add the variable that points to your backend server's URL. By default, it runs on port `4444`.

    ```env
    # frontend/.env.local
    NEXT_PUBLIC_API_BASE_URL=http://localhost:4444/api
    ```
    > **Important:** The `NEXT_PUBLIC_` prefix is required to expose this variable to the browser.

#### Step 3: Apply Database Migrations

This command will create all the necessary tables in your database. Run it from the root `app` folder.

```bash
npx prisma migrate dev --schema=./backend/prisma/schema.prisma
```

### 4. Run the Project

Now that everything is configured, you can start both the frontend and backend with a single command from the root `app` folder.

```bash
npm run dev
```

After a successful launch:
- The **Frontend** will be available at: `http://localhost:3000`
- The **Backend** will be available at: `http://localhost:4444`

## 📝 How to Use the Application

### 1. Create a New Quiz

1. Open `http://localhost:3000/quizzes` in your browser.
2. Click the **"Create New Quiz"** button.
3. Fill in the quiz title.
4. Click **"+ Add Question"** to add a question.
5. For each question, enter the text, select a type (Text Input, True/False, Multiple Choice), and provide the correct answer.
6. When the quiz is ready, click **"Create Quiz"**.

### 2. View and Delete Quizzes

- On the `http://localhost:3000/quizzes` page, you will see a list of all created quizzes.
- To view the details of a quiz, simply click on it.
- To delete a quiz, click the trash can icon 🗑️ next to the corresponding quiz.

## ⚙️ Available Scripts

All scripts are run from the root `app` folder.

- `npm run dev`: Starts the frontend and backend in development mode.
- `npm run build`: Builds the production-ready versions of both applications.
- `npm run lint`: Checks the code for errors using ESLint.
- `npm run lint:fix`: Automatically fixes simple ESLint errors.
- `npm run format`: Formats all code using Prettier.

---

Thank you for checking out the project!