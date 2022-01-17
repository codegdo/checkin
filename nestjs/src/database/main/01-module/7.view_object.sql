-- CREATE TABLE VIEW_OBJECT
CREATE TABLE IF NOT EXISTS dbo.view_object (
  view_id INT NOT NULL,
  object_id INT NOT NULL,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(view_id, object_id),
  FOREIGN KEY(view_id) REFERENCES dbo.view(id) ON DELETE SET NULL,
  FOREIGN KEY(object_id) REFERENCES dbo.object(id) ON DELETE SET NULL
);

CREATE INDEX idx_view_object ON dbo.view_object(view_id, object_id);

INSERT
INTO dbo.view_object(view_id, object_id, org_id)
VALUES
--users
('200', '1', null),
('200', '2', null),
--clients
('201', '3', null),
--roles
('202', '4', null),
--language
('203', '5', null),
--workspace
('204', '6', null),
--service
('205', '7', null),
--price
('206', '8', null),
--form
('207', '9', null),
--template
('208', '10', null),
--calendar
('209', '11', null),
--checkin
('210', '12', null),
--todo
('211', '13', null),
--checkout
('212', '14', null),

--profile
('300', '1', null),
('300', '2', null),
--organization
('301', '15', null),
--subscription
('302', '16', null),

--support
('400', '1', null),
--guide
('401', '1', null),

--appointment
('1100', '17', null),
--booking
('1200', '18', null),
--task
('1300', '19', null),
--order
('1400', '20', null);