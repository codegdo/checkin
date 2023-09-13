CREATE TABLE config_permission (
    id SERIAL PRIMARY KEY,
    config_id INT REFERENCES system_config(id),
    user_id INT REFERENCES users(id), -- or role_id if using roles
    can_read BOOLEAN DEFAULT false,
    can_write BOOLEAN DEFAULT false
);

INSERT INTO config_permission (config_id, user_id, can_read, can_write)
VALUES
    (1, 1, true, true), -- User with ID 1 can read and write config setting with ID 1
    (2, 2, true, false), -- User with ID 2 can read config setting with ID 2 but cannot write
    (3, 3, false, true); -- User with ID 3 cannot read but can write config setting with ID 3
