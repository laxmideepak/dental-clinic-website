# Appointment Booking System - Supabase Schema

This directory contains the database schema and migrations for a simple appointment booking system using Supabase (PostgreSQL).

## Files

- `migrations/001_create_appointments_table.sql` - Core table, indexes, and RLS policies
- `migrations/002_appointments_functions.sql` - Utility functions and triggers
- `README.md` - This documentation file

## Setup Instructions

### 1. Initialize Supabase Project

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Initialize project (if not already done)
supabase init

# Link to your Supabase project
supabase link --project-ref YOUR_PROJECT_REF
```

### 2. Run Migrations

```bash
# Apply all migrations
supabase db push

# Or run individual migrations
supabase db reset
```

### 3. Verify Setup

```sql
-- Check table exists
\d appointments

-- Check RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'appointments';

-- Check policies
SELECT * FROM pg_policies WHERE tablename = 'appointments';
```

## Database Schema

### Table: `appointments`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier |
| `customer_email` | TEXT | NOT NULL, CHECK email format | Customer email with validation |
| `customer_name` | TEXT | - | Optional customer name |
| `service` | TEXT | - | Service type (e.g., "General Optometry") |
| `starts_at` | TIMESTAMPTZ | NOT NULL | Appointment date/time |
| `notes` | TEXT | - | Optional notes |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Record creation time |

### Indexes

- `idx_appointments_starts_at` - Index on `starts_at` for fast date/time lookups

### Row Level Security (RLS)

**Enabled**: ✅

**Policies**:
- `Allow anonymous insert` - Permits `anon` role to insert new appointments
- `Allow service_role select` - Permits `service_role` to read all appointments

## Usage Examples

### Frontend (Anonymous Insert)

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_ANON_KEY'
)

// Book an appointment (public form)
async function bookAppointment(appointmentData) {
  const { data, error } = await supabase
    .from('appointments')
    .insert({
      customer_email: appointmentData.email,
      customer_name: appointmentData.name,
      service: appointmentData.service,
      starts_at: appointmentData.startTime,
      notes: appointmentData.notes
    })
  
  if (error) {
    console.error('Error booking appointment:', error)
    return null
  }
  
  return data
}

// Example usage
bookAppointment({
  email: 'john@example.com',
  name: 'John Doe',
  service: 'General Optometry',
  startTime: '2024-01-15T10:00:00Z',
  notes: 'First time patient'
})
```

### Backend/Admin (Service Role)

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_SERVICE_ROLE_KEY'
)

// Get all appointments for a date range
async function getAppointments(startDate, endDate) {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .gte('starts_at', startDate)
    .lte('starts_at', endDate)
    .order('starts_at')
  
  return { data, error }
}

// Get available time slots
async function getAvailableSlots(date) {
  const { data, error } = await supabase
    .rpc('get_available_slots', { target_date: date })
  
  return { data, error }
}
```

### SQL Queries

```sql
-- Get today's appointments
SELECT * FROM appointments 
WHERE starts_at::date = CURRENT_DATE 
ORDER BY starts_at;

-- Get available slots for a specific date
SELECT * FROM get_available_slots('2024-01-15');

-- Get appointments by date range (admin only)
SELECT * FROM get_appointments_by_date_range(
  '2024-01-01T00:00:00Z',
  '2024-01-31T23:59:59Z'
);
```

## Features

### ✅ Core Requirements Met
- UUID primary key with auto-generation
- Email validation with regex check
- Optional fields (customer_name, service, notes)
- Required timestamptz fields
- Proper indexing
- RLS with anonymous insert and service_role select policies

### 🚀 Additional Features
- **Appointment validation** - Prevents double booking and invalid times
- **Business hours validation** - Enforces 9 AM - 5 PM, Monday - Saturday
- **Available slots function** - Generates and checks slot availability
- **Admin utilities** - Date range queries for management
- **Comprehensive documentation** - Comments and examples

## Security Notes

1. **Anonymous Insert Only** - Public users can only create appointments, not read them
2. **Service Role Access** - Only backend/admin can query appointment data
3. **Input Validation** - Email format and business rules enforced
4. **Future Appointments Only** - Prevents booking in the past

## Customization

To modify business hours or slot duration, update the default parameters in the `get_available_slots` function:

```sql
-- Example: Change to 30-minute slots, 8 AM - 6 PM
SELECT * FROM get_available_slots(
  '2024-01-15',  -- target_date
  30,            -- slot_duration_minutes
  8,             -- start_hour
  18,            -- end_hour
  12,            -- lunch_start_hour
  13             -- lunch_end_hour
);
```
