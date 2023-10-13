--> LOGIN with "postgres" as superuser

-- Step 1: Create a superuser for initial setup administration tasks
CREATE ROLE db_superuser;

ALTER USER db_superuser
  SUPERUSER
  LOGIN
  CREATEDB
  CREATEROLE
  REPLICATION
  BYPASSRLS;

-- Set a custom password for the "db_superuser" user
ALTER USER db_superuser PASSWORD 'noP@ssw0rd';

--> LOGIN with "db_superuser"
SELECT current_user;

-- Step 2: Create a database named "db_app"
CREATE DATABASE db_app;

--> Switch connection to db_app and close all sessions, then open a new one
SELECT current_database;

-- Disable the postgres user login for Security
-- The default "postgres" database in PostgreSQL is primarily for administrative use.
-- Deleting it in production is a security best practice, as it:
-- 1. Enhances Security: Reduces potential attack points.
-- 2. Streamlines Environment: Eliminates unnecessary clutter.
-- 3. Promotes Customization: Encourages tailored database and role names.
ALTER USER postgres NOLOGIN;

-- Step 3: Create an admin role group
CREATE ROLE db_admin_role;

-- Grant the "CREATEROLE" privilege to the "db_admin_role" group
ALTER USER db_admin_role CREATEROLE;

-- Grant "CREATE" and "USAGE" privileges on the "public" schema to the "db_admin_role"
GRANT CREATE, USAGE ON SCHEMA public TO db_admin_role;

-- Step 4: Create an admin role and assign it to the admin role group
CREATE USER db_admin WITH LOGIN PASSWORD 'noP@ssw0rd';

-- Assign the "db_admin_role" to the "db_admin" user
ALTER ROLE db_admin SET ROLE TO db_admin_role;

-- Grant db_admin_role privileges to db_admin
GRANT db_admin_role TO db_admin;

--> LOGIN with "db_admin"
SELECT current_user;

-- Step 5: Create API users
CREATE USER api_user WITH LOGIN PASSWORD 'password';
CREATE USER api_worker WITH LOGIN PASSWORD 'password';
CREATE USER api_manager WITH LOGIN PASSWORD 'password';

--> Now run the required setup functions
