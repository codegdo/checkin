CREATE TABLE main_dbo.view_action (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  action_group VARCHAR(20) NOT NULL CHECK (action_group IN ('list', 'read', 'write')),
  view_id INT,

  is_active BOOLEAN DEFAULT TRUE NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  created_by VARCHAR(50) DEFAULT CURRENT_USER NOT NULL,

  FOREIGN KEY (view_id) REFERENCES main_dbo.view(id) ON DELETE SET NULL
);

INSERT INTO main_dbo.view_action(name, action_group, view_id) VALUES
('users:getAllUser','list',50),
('users:getUser','read',50),
('users:createUser','write',50),
('users:updateUser','write',50),
('users:deleteUser','write',50);
