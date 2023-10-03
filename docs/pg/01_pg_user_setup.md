## PostgreSQL User Hierarchy Setup

Follow these detailed steps to set up a user hierarchy for your PostgreSQL database:

1. **Create a Superuser "db_admin":**

   - Create a user named "db_admin."
   - Assign the superuser role to "db_admin" with login privileges.
   - Assign the "create role" privilege to "db_admin."
   - Update the "db_admin" user with a secure password:

     ```sql
     ALTER USER db_admin PASSWORD 'noP@ssw0rd';
     ```

2. **Sign in with "db_admin":**

   - Use the "db_admin" role to create additional users.
   - Utilize the "db_admin" role to perform initialization tasks for the database.

3. **Create API Users:**

   - Create three users for your API application: "api_app," "api_worker," and "api_manager."
   - Ensure that these users have the ability to log in.
   - Update the users with a secure password:

     ```sql
     ALTER USER api_app PASSWORD 'password';
     ALTER USER api_worker PASSWORD 'password';
     ALTER USER api_manager PASSWORD 'password';
     ```

4. **Set User Hierarchy:**

   - Establish the following user hierarchy:

     - **"db_owner"**: The highest-level user with complete control over the PostgreSQL server and all databases. This user is responsible for managing user roles and assigning privileges.

     - **"db_admin"**: A superuser responsible for administrative tasks within the "db_app" database, such as schema management and maintenance.

     - **"api_app"**: An API application user with restricted privileges. This user can interact with the database solely through defined stored procedures and functions.

     - **"api_worker"**: An API worker user with permissions similar to "api_app." This user can also interact with the database via stored procedures and functions.

     - **"api_manager"**: An API manager user with higher-level access. This user can perform administrative tasks related to the API, such as managing API users and configurations.

5. **Grant Specific Permissions:**

   - Grant specific permissions to the API users, allowing them to call stored procedures and functions.

6. **Initialize the "db_app" Database:**
   - Utilize the "db_admin" user to initialize the "db_app" database with all tables and functions.

By following these detailed steps, you will establish a well-defined user hierarchy with roles and responsibilities tailored to your PostgreSQL database and API application.
