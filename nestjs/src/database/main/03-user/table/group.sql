-- CREATE TABLE GROUP
CREATE TABLE IF NOT EXISTS sec.group (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(255),
  group_level INT DEFAULT 1,

  group_type_id INT,
  biz_id INT,

  is_owner BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(group_type_id) REFERENCES dbo.group_type(id) ON DELETE SET NULL
);

INSERT
INTO sec.group(name, description, is_owner, biz_id, group_type_id)
VALUES
('System Group', null, '0', null, '1'),
('Owner Group', null, '1', null, '2');