# COMP4651 Project Backend
COMP4651 Project Backend
This project is developed using Node.js (Express.js) and PostgreSQL.

## To run the project using Docker:
1. Clone this project.

2. Run
   - **docker-compose up --build** in this backend project's root.
     
   - If you run the command for the first time, it may fail to connect to the PostgreSQL. In such cases, please exit the container and re-run the command **docker-compose up --build**.

3. To test if the project is running properly, please access "localhost:8080" through your web browser.

**If the server is running properly, you can access localhost:8080 to see the following:**

![image](https://github.com/Ferayddi/ProjectComp4651/assets/144663658/19848aa2-682c-40a3-8b07-c6b98d9d3193)

## To run the project locally:
1. clone this project.

2. Install PostgreSQL database: https://www.postgresql.org/download/
   - To use the default environment variables, please create a role named "comp4651project" with the password "comp4651project" and a database name "comp4651project".
   - Or you can modify the environment variables and create the database accordingly.

3. Install node.js 20.12.2. (Recommend using nvm for Node.js version control)

4. Run
   - **npm ci** to install all the dependencies
   - **npm run dev** to start the project

**If the server is running properly, you can access localhost:8080 to see the following:**

![image](https://github.com/Ferayddi/ProjectComp4651/assets/144663658/7a861ddc-3d58-4f76-ad62-6f8cc7274db4)


