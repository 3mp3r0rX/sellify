
## Admin Dashboard Setup (Golang Backend)

This guide outlines the steps to set up the Admin Dashboard for your project using Golang for the backend, along with MySQL/PostgreSQL and JWT for authentication and role management.

Prerequisites
Golang (v1.18+)
MySQL/PostgreSQL
GORM or any ORM
JWT for Authentication
Fiber/Gin or any web framework
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-repo/sellify-backend-go.git
Navigate to the project directory:

bash
Copy code
cd sellify-backend-go
Install Go modules:

bash
Copy code
go mod tidy
Database Setup
Set up the database connection:

Configure a connection to MySQL/PostgreSQL in the config/database.go file.
Define the User model:

Add a User model that includes a role field (e.g., USER, ADMIN).
Run migrations:

Use GORM or raw SQL to run database migrations and create necessary tables.
Create Admin User Role
Create a registration endpoint for admins:

Add a restricted route to register admin users. This route should only be accessible to existing admins or used during setup.
Seed an initial admin user:

You can manually insert an admin user into the database or use a migration script to add the first admin account.
