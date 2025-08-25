-- Additional utility functions for the appointments system

-- Function to get available time slots for a specific date
CREATE OR REPLACE FUNCTION get_available_slots(
    target_date DATE,
    slot_duration_minutes INTEGER DEFAULT 20,
    start_hour INTEGER DEFAULT 9,
    end_hour INTEGER DEFAULT 17,
    lunch_start_hour INTEGER DEFAULT 13,
    lunch_end_hour INTEGER DEFAULT 14
)
RETURNS TABLE(slot_time TIMESTAMPTZ, is_available BOOLEAN)
LANGUAGE plpgsql
AS $$
DECLARE
    current_slot TIMESTAMPTZ;
    slot_end TIMESTAMPTZ;
BEGIN
    -- Generate time slots for the given date
    current_slot := target_date + (start_hour || ' hours')::INTERVAL;
    
    WHILE EXTRACT(HOUR FROM current_slot) < end_hour LOOP
        -- Skip lunch break
        IF EXTRACT(HOUR FROM current_slot) >= lunch_start_hour 
           AND EXTRACT(HOUR FROM current_slot) < lunch_end_hour THEN
            current_slot := current_slot + (slot_duration_minutes || ' minutes')::INTERVAL;
            CONTINUE;
        END IF;
        
        slot_end := current_slot + (slot_duration_minutes || ' minutes')::INTERVAL;
        
        -- Check if slot is available (no overlapping appointments)
        RETURN QUERY
        SELECT 
            current_slot as slot_time,
            NOT EXISTS(
                SELECT 1 FROM appointments 
                WHERE starts_at >= current_slot 
                AND starts_at < slot_end
            ) as is_available;
        
        current_slot := current_slot + (slot_duration_minutes || ' minutes')::INTERVAL;
    END LOOP;
END;
$$;

-- Function to validate appointment booking (prevent double booking)
CREATE OR REPLACE FUNCTION validate_appointment_booking()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    -- Check for overlapping appointments (assuming 20-minute slots)
    IF EXISTS(
        SELECT 1 FROM appointments 
        WHERE starts_at >= NEW.starts_at 
        AND starts_at < NEW.starts_at + INTERVAL '20 minutes'
        AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::UUID)
    ) THEN
        RAISE EXCEPTION 'Time slot is already booked';
    END IF;
    
    -- Validate appointment is in the future
    IF NEW.starts_at <= NOW() THEN
        RAISE EXCEPTION 'Appointment must be scheduled for a future date/time';
    END IF;
    
    -- Validate business hours (9 AM to 5 PM, Monday to Saturday)
    IF EXTRACT(HOUR FROM NEW.starts_at) < 9 
       OR EXTRACT(HOUR FROM NEW.starts_at) >= 17 
       OR EXTRACT(DOW FROM NEW.starts_at) = 0 THEN -- Sunday = 0
        RAISE EXCEPTION 'Appointments can only be scheduled during business hours (9 AM - 5 PM, Monday - Saturday)';
    END IF;
    
    RETURN NEW;
END;
$$;

-- Create trigger for appointment validation
CREATE TRIGGER validate_appointment_trigger
    BEFORE INSERT OR UPDATE ON appointments
    FOR EACH ROW
    EXECUTE FUNCTION validate_appointment_booking();

-- Function to get appointments for a specific date range (admin use)
CREATE OR REPLACE FUNCTION get_appointments_by_date_range(
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ
)
RETURNS TABLE(
    id UUID,
    customer_email TEXT,
    customer_name TEXT,
    service TEXT,
    starts_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ
)
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
    -- Only allow service_role to execute this function
    IF current_setting('role') != 'service_role' THEN
        RAISE EXCEPTION 'Access denied';
    END IF;
    
    RETURN QUERY
    SELECT 
        a.id,
        a.customer_email,
        a.customer_name,
        a.service,
        a.starts_at,
        a.notes,
        a.created_at
    FROM appointments a
    WHERE a.starts_at >= start_date 
    AND a.starts_at <= end_date
    ORDER BY a.starts_at;
END;
$$;

-- Add comments for the new functions
COMMENT ON FUNCTION get_available_slots IS 'Returns available time slots for a given date';
COMMENT ON FUNCTION validate_appointment_booking IS 'Validates appointment bookings to prevent conflicts';
COMMENT ON FUNCTION get_appointments_by_date_range IS 'Admin function to retrieve appointments within a date range';
