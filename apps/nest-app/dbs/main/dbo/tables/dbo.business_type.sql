-- Create the business_type table
CREATE TABLE main_dbo.business_type (
  id SERIAL PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  industry_id INT REFERENCES industry(id),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER
);

-- Insert business_type categories with descriptions
INSERT INTO main_dbo.business_type (category, description, industry_id)
VALUES
  ('Nail Salon', 'A business that provides nail care and beautification services.', 4),
  ('Restaurant', 'A business that provides food and beverage services to customers.', 9);










-- Insert business_type categories with descriptions
INSERT INTO main_dbo.business_type (category, description)
VALUES
  ('Retail', 'Sale of goods directly to consumers.'),
  ('Manufacturing', 'Production of goods through processing, forming, or assembling materials.'),
  ('Hospitality', 'Provision of services to guests or travelers.'),
  ('Healthcare', 'Provision of medical services and care.'),
  ('Finance', 'Provision of financial services and products.'),
  ('Technology', 'Development and distribution of technological solutions.'),
  ('Agriculture', 'Cultivation of crops and raising of livestock.'),
  ('Real Estate', 'Dealing with property buying, selling, and management.'),
  ('Education', 'Provision of knowledge and learning.'),
  ('Entertainment', 'Offering enjoyment, amusement, and leisure activities.'),
  ('Transportation', 'Movement of people and goods from one place to another.'),
  ('Food and Beverage', 'Preparation and sale of food and drinks.'),
  ('Construction', 'Building and infrastructure development.'),
  ('Automotive', 'Manufacturing, selling, and servicing vehicles.'),
  ('Energy', 'Generation and distribution of power and energy.'),
  ('Beauty and Personal Care', 'Offering beauty and wellness services.'),
  ('Consulting', 'Provision of professional advice and expertise.'),
  ('Nonprofit', 'Engaged in charitable or social causes.'),
  ('Government', 'Administration and management of public affairs.'),
  ('Professional Services', 'Offering specialized services to clients.')
  ;