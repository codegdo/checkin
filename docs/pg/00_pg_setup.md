# PostgreSQL Server Setup Instructions

## Create a New Server

1. Begin by creating a new PostgreSQL server instance and give it the name "checkin_localhost."

## Connect Using DataGrid or PGAdmin

2. Open your preferred PostgreSQL management tool, such as DataGrid or PGAdmin.
3. Use the server name "checkin_localhost" to connect to your PostgreSQL server.

## Log in as the Default User

4. Use the default PostgreSQL username for login.
5. Enter your custom password ("<your_custom_password>") when prompted to log in.

## Create a Database Owner

6. Create a new user with the role "db_owner."
7. Grant the "superuser" role to the "db_owner" user.
8. Ensure the "Can log in" option is enabled for this user.

````sql
CREATE ROLE db_owner;
ALTER ROLE db_owner WITH SUPERUSER;
ALTER ROLE db_owner WITH LOGIN;


## Change Password for db_owner

9. Run the following query to change the password for the "db_owner" user:

```sql
ALTER USER db_owner PASSWORD 'noP@ssw0rd';


## Create a New Database

10. Create a new database named "db_app."
11. Assign the "db_owner" user as the owner of the "db_app" database.

```sql
CREATE DATABASE db_app WITH OWNER = db_owner;


## Set Data Source Properties

12. In your PostgreSQL management tool, navigate to "Data Source Properties."
13. Log in using the "db_owner" credentials.
14. Connect to the "db_app" database.

## Check Current User

15. Run the following query to check the current login user:

```sql
SELECT current_user;

Verify that the current user is "db_owner."

## Delete Default "postgres" Database

16. Delete the default "postgres" database to ensure a clean setup.

## Modify "postgres" User (Optional)

17. If needed, you can modify the "postgres" user settings. By default, it is not recommended for application use.
18. Uncheck the "Can log in" option to prevent login for the "postgres" user.

## Verify Privileges

18. Confirm that the "db_owner" user now has superuser privileges and all necessary privileges for managing the PostgreSQL server and "db_app" database.
````
