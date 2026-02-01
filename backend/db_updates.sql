ALTER TABLE users ADD COLUMN reset_password_token VARCHAR(255) NULL;
ALTER TABLE users ADD COLUMN reset_password_expires DATETIME NULL;
