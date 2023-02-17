--TERRITORY
CREATE TABLE main_pub.territory (
  id int PRIMARY KEY,
  country varchar(50) NOT NULL,
  code varchar(3) NOT NULL,
  state varchar(50),
  state_code varchar(2),
  region varchar(30),

  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  created_by varchar(45) DEFAULT CURRENT_USER,
);

CREATE TABLE main_pub.territory (
  id integer not null,
  country varchar(90),
  country_code varchar(3),
  state varchar(90),
  state_code varchar(2),
  region varchar(45),

  created_at timestamp default current_timestamp,
  created_by varchar(45) default current_user,
  --
  primary key(id)
);

-- US
INSERT
INTO main_pub.territory (id, country, country_code, state, state_code, region)
VALUES
(1, 'United States', 'USA', 'Alaska', 'AK', 'Americas'),
(2, 'United States', 'USA', 'Alabama', 'AL', 'Americas'),
(3, 'United States', 'USA', 'Arkansas', 'AR', 'Americas'),
(4, 'United States', 'USA', 'American Samoa', 'AS', 'Americas'),
(5, 'United States', 'USA', 'Arizona', 'AZ', 'Americas'),
(6, 'United States', 'USA', 'California', 'CA', 'Americas'),
(7, 'United States', 'USA', 'Colorado', 'CO', 'Americas'),
(8, 'United States', 'USA', 'Connecticut', 'CT', 'Americas'),
(9, 'United States', 'USA', 'District of Columbia', 'DC', 'Americas'),
(10, 'United States', 'USA', 'Delaware', 'DE', 'Americas'),
(11, 'United States', 'USA', 'Florida', 'FL', 'Americas'),
(12, 'United States', 'USA', 'Georgia', 'GA', 'Americas'),
(13, 'United States', 'USA', 'Guam', 'GU', 'Americas'),
(14, 'United States', 'USA', 'Hawaii', 'HI', 'Americas'),
(15, 'United States', 'USA', 'Iowa', 'IA', 'Americas'),
(16, 'United States', 'USA', 'Idaho', 'ID', 'Americas'),
(17, 'United States', 'USA', 'Illinois', 'IL', 'Americas'),
(18, 'United States', 'USA', 'Indiana', 'IN', 'Americas'),
(19, 'United States', 'USA', 'Kansas', 'KS', 'Americas'),
(20, 'United States', 'USA', 'Kentucky', 'KY', 'Americas'),
(21, 'United States', 'USA', 'Louisiana', 'LA', 'Americas'),
(22, 'United States', 'USA', 'Massachusetts', 'MA', 'Americas'),
(23, 'United States', 'USA', 'Maryland', 'MD', 'Americas'),
(24, 'United States', 'USA', 'Maine', 'ME', 'Americas'),
(25, 'United States', 'USA', 'Michigan', 'MI', 'Americas'),
(26, 'United States', 'USA', 'Minnesota', 'MN', 'Americas'),
(27, 'United States', 'USA', 'Missouri', 'MO', 'Americas'),
(28, 'United States', 'USA', 'Northern Mariana Islands', 'MP', 'Americas'),
(29, 'United States', 'USA', 'Mississippi', 'MS', 'Americas'),
(30, 'United States', 'USA', 'Montana', 'MT', 'Americas'),
(31, 'United States', 'USA', 'North Carolina', 'NC', 'Americas'),
(32, 'United States', 'USA', 'North Dakota', 'ND', 'Americas'),
(33, 'United States', 'USA', 'Nebraska', 'NE', 'Americas'),
(34, 'United States', 'USA', 'New Hampshire', 'NH', 'Americas'),
(35, 'United States', 'USA', 'New Jersey', 'NJ', 'Americas'),
(36, 'United States', 'USA', 'New Mexico', 'NM', 'Americas'),
(37, 'United States', 'USA', 'Nevada', 'NV', 'Americas'),
(38, 'United States', 'USA', 'New York', 'NY', 'Americas'),
(39, 'United States', 'USA', 'Ohio', 'OH', 'Americas'),
(40, 'United States', 'USA', 'Oklahoma', 'OK', 'Americas'),
(41, 'United States', 'USA', 'Oregon', 'OR', 'Americas'),
(42, 'United States', 'USA', 'Pennsylvania', 'PA', 'Americas'),
(43, 'United States', 'USA', 'Puerto Rico', 'PR', 'Americas'),
(44, 'United States', 'USA', 'Rhode Island', 'RI', 'Americas'),
(45, 'United States', 'USA', 'South Carolina', 'SC', 'Americas'),
(46, 'United States', 'USA', 'South Dakota', 'SD', 'Americas'),
(47, 'United States', 'USA', 'Tennessee', 'TN', 'Americas'),
(48, 'United States', 'USA', 'Texas', 'TX', 'Americas'),
(49, 'United States', 'USA', 'United States Minor Outlying Islands', 'UM', 'Americas'),
(50, 'United States', 'USA', 'Utah', 'UT', 'Americas'),
(51, 'United States', 'USA', 'Virginia', 'VA', 'Americas'),
(52, 'United States', 'USA', 'Virgin Islands, United States', 'VI', 'Americas'),
(53, 'United States', 'USA', 'Vermont', 'VT', 'Americas'),
(54, 'United States', 'USA', 'Washington', 'WA', 'Americas'),
(55, 'United States', 'USA', 'Wisconsin', 'WI', 'Americas'),
(56, 'United States', 'USA', 'West Virginia', 'WV', 'Americas'),
(57, 'United States', 'USA', 'Wyoming', 'WY', 'Americas'),
--
(6000, '--', '--', '--', '--', 'Americas'),
(6001, 'United States', 'USA', '--', '--', 'Americas');


-- 195 countries
-- add extra 10 row state
-- increment 100 to region

-- Afghanistan
INSERT
INTO dbo.territory (id, country, country_code, state, state_code, region)
VALUES
('1', 'Afghanistan', 'AFG', 'Balkh', 'BAL', 'Asia'),
('2', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('3', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('4', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('5', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('6', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('7', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('8', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('9', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('10', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('11', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('12', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('13', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('14', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('15', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('16', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('17', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('18', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('19', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('20', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('21', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('22', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('23', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('24', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('25', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('26', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('27', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('28', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('29', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('30', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('31', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('32', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('33', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia'),
('34', 'Afghanistan', 'AFG', 'Bāmīān', 'BAM', 'Asia');

-- Angola
INSERT
INTO dbo.territory (id, country, country_code, state, state_code, region)
VALUES
('45', 'Angola', 'AGO', 'Bengo', 'BGO', 'Africa'),
('46', 'Angola', 'AGO', 'Bengo', 'BGO', 'Africa'),
('47', 'Angola', 'AGO', 'Bengo', 'BGO', 'Africa'),
('48', 'Angola', 'AGO', 'Bengo', 'BGO', 'Africa'),
('49', 'Angola', 'AGO', 'Bengo', 'BGO', 'Africa'),
('50', 'Angola', 'AGO', 'Bengo', 'BGO', 'Africa'),
('51', 'Angola', 'AGO', 'Bengo', 'BGO', 'Africa'),
('52', 'Angola', 'AGO', 'Bengo', 'BGO', 'Africa'),
('53', 'Angola', 'AGO', 'Bengo', 'BGO', 'Africa'),
('54', 'Angola', 'AGO', 'Bengo', 'BGO', 'Africa'),
('55', 'Angola', 'AGO', 'Bengo', 'BGO', 'Africa'),
('56', 'Angola', 'AGO', 'Bengo', 'BGO', 'Africa'),
('57', 'Angola', 'AGO', 'Bengo', 'BGO', 'Africa'),
('58', 'Angola', 'AGO', 'Bengo', 'BGO', 'Africa'),
('59', 'Angola', 'AGO', 'Bengo', 'BGO', 'Africa'),
('60', 'Angola', 'AGO', 'Bengo', 'BGO', 'Africa'),
('61', 'Angola', 'AGO', 'Bengo', 'BGO', 'Africa'),
('62', 'Angola', 'AGO', 'Bengo', 'BGO', 'Africa'),
('63', 'Angola', 'AGO', 'Bengo', 'BGO', 'Africa');