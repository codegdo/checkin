# PostgreSQL Server Setup Instructions

## Create a New Server

1. Start by creating a new PostgreSQL server instance and name it "checkin_localhost."

- By default, PostgreSQL comes with a superuser named `postgres`.
- When launching the pgAdmin client for the first time, make sure to set a master password.

## Connect Using DataGrid or PGAdmin

2. Open your preferred PostgreSQL management tool, such as DataGrid or PGAdmin.
3. Use the server name "checkin_localhost" to connect to your PostgreSQL server.

## Log in as the Default User

4. Use the default PostgreSQL as `postgres` username for login.
5. Enter your custom password ("<your_custom_password>") when prompted to log in.

## Create a Database Superuser

6. Create a new user with the role "db_superuser."
7. Grant the "superuser" role to the "db_superuser" user.
8. Ensure the "Can log in" option is enabled for this user.

```sql
CREATE ROLE db_superuser;

--ALTER ROLE db_superuser WITH SUPERUSER;

ALTER USER db_superuser
  SUPERUSER
  LOGIN
  CREATEDB
  CREATEROLE
  REPLICATION
  BYPASSRLS;
```

## Change Password for db_superuser

9. Run the following query to change the password for the "db_superuser" user:

```sql
ALTER USER db_superuser PASSWORD '<your_custom_password>';
```

## Create a New Database

10. Create a new database named "db_app" using "db_superuser"

```sql
CREATE DATABASE db_app WITH OWNER = db_superuser;
```

## Set Data Source Properties

12. In your PostgreSQL management tool, navigate to "Data Source Properties."
13. Log in using the "db_superuser" credentials.
14. Connect to the "db_app" database.

## Check Current User

15. Run the following query to check the current login user:

```sql
SELECT session_user, current_user;
```

Verify that the current user is "db_superuser."

## Delete Default "postgres" Database

16. Delete the default "postgres" database to ensure a clean setup.

## Modify "postgres" User (Optional)

17. If needed, you can modify the "postgres" user settings. By default, it is not recommended for application use.
18. Uncheck the "Can log in" option to prevent login for the "postgres" user.

## Verify Privileges

19. Confirm that the "db_superuser" user now has superuser privileges and all necessary privileges for managing the PostgreSQL server and "db_app" database.
20. Use db_superuser for security and administration tasks
