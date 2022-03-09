-- CREATE TABLE POLICY
CREATE TABLE IF NOT EXISTS sec.policy (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(255),
  
  statement JSONB NOT NULL DEFAULT '{"effect":"allow","action":"*","resource":"*"}'::jsonb,
  
  version_id INT,
  group_type_id INT,
  org_id INT,

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(group_type_id) REFERENCES dbo.group_type(id) ON DELETE SET NULL,
  FOREIGN KEY(version_id) REFERENCES dbo.policy_version(id) ON DELETE SET NULL
);

INSERT
INTO sec.policy(name, version_id, group_type_id)
VALUES
('System Access', '1', '1'),
('Admin Access', '1', '2');