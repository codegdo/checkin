-- FEATURE
CREATE TABLE dbo.feature (
  id INTEGER NOT NULL,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(255),
  price NUMERIC(8,2),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id)
);

INSERT
INTO dbo.feature (id, name, price)
VALUES
(1,'Asset Audits',50),
(2,'Asset Tagging',50),
(3,'Checkin/Checkout',50),
(4,'Cloud-based',50),
(5,'Asset Recovery',50),
(6,'Role Based Access',50),
(7,'User Restrictions',50),
(8,'Asset Tracking',50),
(9,'Email Notifications',50),
(10,'SMS Notifications',50),
(11,'Reporting',50),
(12,'Security',50),
(13,'Support',50),
(14,'Training',50),
(15,'Upload Files',50),
(16,'Application Settings',50),
(17,'Integration with Existing Software',50),
(18,'Asset Management',50),
(19,'Inventory Management',50),
(20,'Real Time Access',50),
(21,'Save Time & Money',50),
(22,'Dashboard',50),
(23,'Ticket Management',50),
(24,'Automation',50),
(25,'Subscription-based Billing',50),
(26,'Single Sign-on',50),
(27,'Mobile Friendly',50),
(28,'Customization Available',50),
(29,'Import/Export',50),
(30,'Approval Hierachy',50),
(31,'Document Management',50),
(32,'Employee Onboarding and Adminitration',50),
(33,'Benefit Management',50),
(34,'Time and Attendance Management',50),
(35,'Employee Engagement',50),
(36,'Application Tracking and Recruiting',50),
(37,'Performance Management',50),
(38,'Compensation Management',50),
(39,'Payroll Management',50),
(40,'QR Codes',50),
(41,'Reviews',50);
