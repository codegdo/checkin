### Setting Up Roles in PostgreSQL

#### Step 1: Login with `db_superuser` and Create `db_admin_role`

1. Log in to your PostgreSQL database with a user having superuser privileges, such as `db_superuser`.
2. Create a new role called `db_admin_role` using SQL:

   ```sql
   CREATE ROLE db_admin_role;
   ```

#### Step 2: Grant `CREATE ROLE` Privilege

3. While still logged in as `db_superuser`, grant the `CREATE ROLE` privilege to `db_admin_role`. This will allow the role to create other roles:

   ```sql
   ALTER USER db_admin_role CREATEROLE;
   ```

#### Step 3: Grant Permissions for Schemas, Tables, and Functions

4. Grant the necessary permissions to `db_admin_role` for creating schemas, tables, and functions. For example, to grant permissions in the `public` schema:

- Grant `CREATE` privilege on the schema:

  ```sql
  GRANT CREATE ON SCHEMA public TO db_admin_role;
  ```

- Grant `USAGE` privilege on the schema (required for creating functions):
  ```sql
  GRANT USAGE ON SCHEMA public TO db_admin_role;
  ```

Additionally, you can grant specific privileges on individual tables and functions as needed.

#### Step 4: Assign `db_admin` to `db_admin_role` Group

5. Assign the user `db_admin` to the `db_admin_role` group to give them the privileges associated with this role. Use the SQL `ALTER ROLE` command:

   ```sql
   ALTER ROLE db_admin SET ROLE TO db_admin_role;
   GRANT db_admin_role TO db_admin;
   ```

#### Step 5: Use `db_admin` with Granted Privileges

6. Now, the user `db_admin` can perform administrative tasks with the permissions granted to the `db_admin_role`. Ensure that you connect to the database using the `db_admin` user for administrative tasks.

#### Step 6: Restrict and Limit Admin Access (Optional)

7. To limit the admin access of the `db_admin` user, consider revoking the admin status or restricting it further based on your security requirements.

#### Step 7: Use `db_admin` for All Administrator Tasks

8. Use the `db_admin` user for all your administrative tasks, such as creating tables, and functions, while adhering to the security restrictions and best practices set up for the `db_admin_role`.

Now you have set up the `db_admin_role` with the necessary privileges, and the `db_admin` user can perform administrative tasks in your PostgreSQL database.
