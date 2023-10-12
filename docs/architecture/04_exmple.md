# System Database Schema Overview

The database schema for the Check-In Service System consists of interconnected tables to store various data related to customers, staff, services, bookings, payments, and system configurations.

## User Table

- **user_id (Primary Key):** Unique identifier for each user (customer or staff).
- **username:** Username or email address for user authentication.
- **password:** Hashed password for user authentication.
- **user_type:** Indicates whether the user is a customer or staff.

## Customer Table

- **customer_id (Primary Key):** Unique identifier for each customer.
- **user_id (Foreign Key):** Reference to the corresponding user.
- **full_name:** Full name of the customer.
- **contact_info:** Contact information for the customer.

## Staff Table

- **staff_id (Primary Key):** Unique identifier for each staff member.
- **user_id (Foreign Key):** Reference to the corresponding user.
- **full_name:** Full name of the staff member.
- **contact_info:** Contact information for the staff member.
- **availability:** Indicates staff member availability for bookings.

## Service Table

- **service_id (Primary Key):** Unique identifier for each service.
- **service_name:** Name of the service.
- **description:** Description of the service.
- **price:** Price of the service.

## Booking Table

- **booking_id (Primary Key):** Unique identifier for each booking.
- **customer_id (Foreign Key):** Reference to the booking's customer.
- **service_id (Foreign Key):** Reference to the booked service.
- **staff_id (Foreign Key):** Reference to the assigned staff member.
- **booking_time:** Date and time of the booking.
- **status:** Indicates the booking status (e.g., confirmed, canceled, in progress).

## BookingHistory Table

- **booking_history_id (Primary Key):** Unique identifier for each booking history entry.
- **booking_id (Foreign Key):** Reference to the associated booking.
- **timestamp:** Timestamp of the history entry, capturing changes to the booking.
- **description:** Describes changes or events (e.g., staff assignment, status update).

## Payment Table

- **payment_id (Primary Key):** Unique identifier for each payment transaction.
- **booking_id (Foreign Key):** Reference to the corresponding booking.
- **payment_amount:** Amount paid for the booking.
- **payment_time:** Date and time of the payment transaction.

## Configurations Table

- **config_key (Primary Key):** Unique identifier for each configuration entry.
- **config_value:** Stores system configuration settings, default values, and global settings.
