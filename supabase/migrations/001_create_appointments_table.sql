-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create appointments table
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_email TEXT NOT NULL CHECK (customer_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    customer_name TEXT,
    service TEXT,
    starts_at TIMESTAMPTZ NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on starts_at for faster lookups
CREATE INDEX idx_appointments_starts_at ON appointments (starts_at);

-- Enable Row Level Security
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous users to insert appointments (public booking form)
CREATE POLICY "Allow anonymous insert" ON appointments
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Create policy for service_role to select all appointments (backend/admin access)
CREATE POLICY "Allow service_role select" ON appointments
    FOR SELECT
    TO service_role
    USING (true);

-- Optional: Create policy for authenticated users to view their own appointments
-- Uncomment if you want users to be able to view their own bookings
-- CREATE POLICY "Allow users to view own appointments" ON appointments
--     FOR SELECT
--     TO authenticated
--     USING (auth.email() = customer_email);

-- Optional: Add comments for documentation
COMMENT ON TABLE appointments IS 'Stores appointment bookings for the scheduling system';
COMMENT ON COLUMN appointments.id IS 'Unique identifier for each appointment';
COMMENT ON COLUMN appointments.customer_email IS 'Customer email address with validation';
COMMENT ON COLUMN appointments.customer_name IS 'Optional customer name';
COMMENT ON COLUMN appointments.service IS 'Type of service (e.g., Consultation, Follow-up)';
COMMENT ON COLUMN appointments.starts_at IS 'Appointment start date and time';
COMMENT ON COLUMN appointments.notes IS 'Optional notes or comments';
COMMENT ON COLUMN appointments.created_at IS 'Timestamp when the appointment was created';
