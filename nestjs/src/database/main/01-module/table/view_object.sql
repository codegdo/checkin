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
--groups
('202', '4', null),
--policies
('203', '5', null),
--language
('204', '6', null),
--location
('205', '7', null),
--service
('206', '8', null),
--price
('207', '9', null),
--form
('208', '10', null),
--template
('209', '11', null),
--calendar
('210', '12', null),
--checkin
('211', '13', null),
--todo
('212', '14', null),
--checkout
('213', '15', null),

--profile
('300', '1', null),
('300', '2', null),
--organization
('301', '16', null),
--subscription
('302', '17', null),

--support
('400', '1', null),
--guide
('401', '1', null),

--appointment
('1100', '18', null),
--booking
('1200', '19', null),
--task
('1300', '20', null),
--order
('1400', '21', null);