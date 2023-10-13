CREATE TABLE config_permission (
  id SERIAL PRIMARY KEY,
  config_id INT REFERENCES system_config(id),
  user_id INT REFERENCES users(id), -- or role_id if using roles
  can_read BOOLEAN DEFAULT false,
  can_write BOOLEAN DEFAULT false
);

INSERT INTO config_permission (config_id, user_id, can_read, can_write)
VALUES
  (1, 1, true, true),
  (2, 2, true, false),
  (3, 3, false, true);
