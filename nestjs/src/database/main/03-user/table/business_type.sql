-- CREATE TABLE BUSINESS TYPE
CREATE TABLE IF NOT EXISTS dbo.business_type (
  id SERIAL NOT NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  --
  PRIMARY KEY(id)
);

INSERT
INTO dbo.business_type(id, name, category)
VALUES
('1', 'Nail Salon', 'Service'),
('2', 'Restaurant', 'Service'),
--
('1000', '--', 'Service');



--https://www.dummies.com/article/business-careers-money/business/accounting/general-accounting/classify-companies-by-their-output-168119