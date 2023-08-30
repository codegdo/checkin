-- Create the 'main_dbo.industry' table
CREATE TABLE main_dbo.industry (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER
);

-- Insert data into the 'industry' table
INSERT INTO main_dbo.industry (name, description)
VALUES
  ('Agriculture and Farming', 'Cultivation of crops and raising of animals for food, fiber, medicinal plants, and other products.'),
  ('Automotive', 'Manufacturing, selling, and maintenance of automobiles and other motor vehicles.'),
  ('Banking and Financial Services', 'Providing financial products and services, including banking, investing, and insurance.'),
  ('Beauty and Personal Care', 'Products and services related to personal grooming, appearance enhancement, and relaxation.'),
  ('Construction and Real Estate', 'Building, developing, and selling properties and real estate.'),
  ('Education', 'Providing instruction, training, and knowledge-sharing services.'),
  ('Energy and Utilities', 'Generation, distribution, and management of energy resources.'),
  ('Entertainment and Media', 'Creation and distribution of content for entertainment and information.'),
  ('Food and Beverage', 'Production, preparation, and distribution of food and beverages.'),
  ('Healthcare and Pharmaceuticals', 'Providing medical services, healthcare products, and pharmaceuticals.'),
  ('Hospitality and Tourism', 'Providing accommodation, food, and recreational services for travelers.'),
  ('Information Technology', 'Design, development, and implementation of computer-based systems and software.'),
  ('Manufacturing', 'Production of goods through processing, transforming, or assembling materials.'),
  ('Retail', 'Sale of goods directly to consumers.'),
  ('Telecommunications', 'Transmission of information over long distances using electronic means.'),
  ('Transportation and Logistics', 'Movement of goods and people from one place to another.'),
  ('Travel and Leisure', 'Activities and services related to vacation and relaxation.'),
  ('Fashion and Apparel', 'Design, manufacturing, and retail of clothing and accessories.'),
  ('Sports and Fitness', 'Promotion of physical activity and sports-related products and services.'),
  ('Environmental and Sustainability', 'Efforts to promote environmental protection and sustainable practices.'),
  ('Insurance', 'Protection against financial loss through risk management and coverage.'),
  ('Legal Services', 'Legal advice, representation, and consulting services.'),
  ('Marketing and Advertising', 'Promotion of products, services, or brands to target audiences.'),
  ('Nonprofit and Philanthropy', 'Organizations dedicated to social causes and public welfare.'),
  ('Public Relations', 'Management of communication between an organization and the public.'),
  ('Consulting and Professional Services', 'Provision of expert advice and specialized services.'),
  ('Government and Public Administration', 'Management and governance of public institutions and services.'),
  ('Technology', 'Advancement and application of scientific knowledge and innovations.'),
  ('Architecture and Design', 'Design and planning of buildings, spaces, and structures.'),
  ('E-commerce', 'Buying and selling of products and services online.'),
  ('Real Estate', 'Property development, sales, and management.'),
  ('Pharmaceuticals', 'Research, development, and production of pharmaceutical drugs.'),
  ('Biotechnology', 'Application of biological knowledge to develop products and processes.'),
  ('Telecommunications', 'Communication and transmission of information through electronic means.'),
  ('Aerospace', 'Design, manufacturing, and operation of aircraft and spacecraft.'),
  ('Consumer Electronics', 'Manufacturing and distribution of electronic devices for consumers.'),
  ('Health and Wellness', 'Promotion of physical, mental, and emotional well-being.')
  -- Add more entries as needed
  ;