import { createClient } from '@supabase/supabase-js'

// Replace with your Supabase project details
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lvldvrdotoeilwuqecdf.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2bGR2cmRvdG9laWx3dXFlY2RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwNzg5NjgsImV4cCI6MjA3MTY1NDk2OH0.dtLM5IKbKQb6Cwlcs3Er3MC59aV_dlUFaN315Pnr_GA'

// Debug logging
console.log('🔧 Supabase Config:', {
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey,
  isDemoMode: supabaseUrl === 'demo-mode'
})

// Create Supabase client (will be null in demo mode)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our appointment data
export interface Appointment {
  id?: string
  customer_email: string
  customer_name?: string
  service?: string
  starts_at: string
  notes?: string
  created_at?: string
}

// Function to book an appointment
export async function bookAppointment(appointmentData: Omit<Appointment, 'id' | 'created_at'>) {
  console.log('🚀 Attempting to book appointment:', appointmentData)
  
  console.log('🔗 Using real Supabase connection')
  
  // Real Supabase integration
  const { data, error } = await supabase
    .from('appointments')
    .insert({
      customer_email: appointmentData.customer_email,
      customer_name: appointmentData.customer_name,
      service: appointmentData.service,
      starts_at: appointmentData.starts_at,
      notes: appointmentData.notes
    })
    .select()
  
  if (error) {
    console.error('❌ Error booking appointment:', error)
    console.error('❌ Full error details:', JSON.stringify(error, null, 2))
    
    // If it's an RLS error, show a user-friendly message
    if (error.message?.includes('row-level security') || error.code === '42501') {
      throw new Error('Booking system temporarily unavailable. Please call us at (214) 550-5005 to book your appointment.')
    }
    
    throw error
  }
  
  console.log('✅ Appointment booked successfully:', data)
  return data
}

// Function to get existing appointments for a specific date
export async function getExistingAppointments(targetDate: string) {
  if (!supabase) {
    console.log('📅 Demo Mode - No existing appointments to check')
    return []
  }

  // Create date range for the entire day (start and end of day)
  const startOfDay = `${targetDate}T00:00:00`
  const endOfDay = `${targetDate}T23:59:59`

  console.log('🔍 Searching for appointments on date:', targetDate)
  console.log('📅 Date range:', startOfDay, 'to', endOfDay)

  const { data, error } = await supabase
    .from('appointments')
    .select('starts_at')
    .gte('starts_at', startOfDay)
    .lt('starts_at', endOfDay)

  if (error) {
    console.error('Error fetching existing appointments:', error)
    return []
  }

  console.log('📅 Found existing appointments:', data)
  return data || []
}

// Function to check available time slots (would require service role in production)
export async function getAvailableSlots(targetDate: string) {
  // This would typically be called from your backend with service role
  // For demo purposes, we'll simulate availability
  const slots = generateTimeSlots(targetDate)
  
  // In production, you'd call: supabase.rpc('get_available_slots', { target_date: targetDate })
  return slots
}

// Helper function to generate time slots (client-side simulation)
function generateTimeSlots(dateStr: string) {
  const date = new Date(dateStr)
  const slots = []
  
  // Morning slots: 9:10 AM - 1:10 PM
  for (let hour = 9; hour <= 13; hour++) {
    for (let minute = 10; minute <= 50; minute += 20) {
      if (hour === 13 && minute > 10) break // Stop at 1:10 PM
      
      const slotTime = new Date(date)
      slotTime.setHours(hour, minute, 0, 0)
      
      slots.push({
        slot_time: slotTime.toISOString(),
        is_available: true // In production, this would be checked against existing appointments
      })
    }
  }
  
  // Afternoon slots: 2:30 PM - 5:30 PM (Saturday until 4:30 PM)
  const isSaturday = date.getDay() === 6
  const endHour = isSaturday ? 16 : 17
  const endMinute = isSaturday ? 30 : 30
  
  for (let hour = 14; hour <= endHour; hour++) {
    for (let minute = 30; minute <= 50; minute += 20) {
      if (hour === endHour && minute > endMinute) break
      
      const slotTime = new Date(date)
      slotTime.setHours(hour, minute, 0, 0)
      
      slots.push({
        slot_time: slotTime.toISOString(),
        is_available: true
      })
    }
  }
  
  return slots
}
