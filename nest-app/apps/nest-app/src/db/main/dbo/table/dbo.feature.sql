-- FEATURE
CREATE TABLE main_dbo.feature (
  id int PRIMARY KEY,
  name varchar(50) NOT NULL,
  description varchar(255),
  price numeric(8,2) DEFAULT 0,

  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  created_by varchar(50) DEFAULT CURRENT_USER
);

CREATE TABLE main_dbo.feature (
  id integer not null,
  name varchar(45) not null,
  description varchar(255),
  price numeric(8,2),

  created_at timestamp default current_timestamp,
  created_by varchar(45) default current_user,
  --
  primary key (id)
);

INSERT INTO main_dbo.feature (id, name, price) VALUES
(1,'Role Based Access',50),
(2,'User Restrictions',50),
(3,'Email Notifications',50);
