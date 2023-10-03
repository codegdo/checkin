-- Step 1: Create superuser to initial setup administration task
CREATE ROLE db_superuser;

ALTER USER db_superuser
  SUPERUSER
  LOGIN
  CREATEDB
  CREATEROLE
  REPLICATION
  BYPASSRLS;

ALTER USER db_superuser PASSWORD '<your_custom_password>';

-- Step 2: LOGIN with db_superuser

-- Step 3: Create a database name as db_app
CREATE DATABASE db_app;

-- Step 4: Create admin role group
CREATE ROLE db_admin_role;

ALTER USER db_admin_role CREATEROLE;

GRANT CREATE, USAGE ON SCHEMA public TO db_admin_role;

-- Step 5: Create admin role and assign to admin role group
CREATE USER db_admin WITH LOGIN PASSWORD '<your_custom_password>';

ALTER ROLE db_admin SET ROLE TO db_admin_role;

-- Step 6: LOGIN with db_admin

-- Step 7:  Create api users
CREATE USER api_app WITH LOGIN PASSWORD '<your_custom_password>';
CREATE USER api_worker WITH LOGIN PASSWORD '<your_custom_password>';
CREATE USER api_manager WITH LOGIN PASSWORD '<your_custom_password>';