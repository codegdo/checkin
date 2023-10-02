### Purpose of `SESSION_USER` Default for created_by Column

#### Login with `db_admin` Role

1. When a user logs in with the `db_admin` role, they are granted certain privileges and roles, including the `db_admin_role`.

#### Ownership by `db_admin_role`

2. The `db_admin` role, which has been granted the `db_admin_role`, assumes ownership of specific tables and functions in the database.

#### `created_by` Column Default

3. In the tables mentioned above, there is a created_by column. Its default value is configured to be `SESSION_USER`.

#### `SESSION_USER` vs. `CURRENT_USER`

4. `SESSION_USER` represents the user who has logged in, in this case, the specific login user (e.g., `db_admin`). `CURRENT_USER` represents the current role, which is `db_admin_role`.

#### `SESSION_USER` vs. `CURRENT_USER`

5. `SESSION_USER` represents the user who has logged in, in this case, the specific login user (e.g., `db_admin`). `CURRENT_USER` represents the current role, which is `db_admin_role`.

#### Purpose of `SESSION_USER` Default

5. By setting the `created_by` column's default value to `SESSION_USER`, it records the specific login user (e.g., `db_admin`) as the creator. This allows for the precise attribution of actions to the individual user who initiated them, rather than to the broader role (`db_admin_role`) performing the action. This is particularly useful when multiple users may log in with the same role (`db_admin_role`) but need their actions to be tracked individually.
