// src/hooks/useNotifications.ts
import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL      = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const realtimeClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface AppNotification {
  id: string;
  type: 'boarding' | 'new_booking';
  title: string;
  message: string;
  time: Date;
  read: boolean;
}

export function useStudentNotifications(authId: string | undefined) {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unreadCount,   setUnreadCount]   = useState(0);

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const dismiss = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  useEffect(() => {
    if (!authId) return;

    const channel = realtimeClient
      .channel(`student-notifs-${authId}`)
      .on(
        'postgres_changes',
        {
          event:  'UPDATE',
          schema: 'public',
          table:  'bookings',
          filter: `user_id=eq.${authId}`,
        },
        (payload) => {
          console.log("Realtime Student Payload Received:", payload); // Diagnostic Log
          const updated = payload.new as any;
          if (updated && updated.status === 'scanned') {
            const notif: AppNotification = {
              id:      `scanned-${updated.id}-${Date.now()}`,
              type:    'boarding',
              title:   'Ready for Departure!',
              message: `Your ticket for Seat ${updated.seat_number} has been verified. Please board the shuttle now.`,
              time:    new Date(),
              read:    false,
            };
            setNotifications(prev => [notif, ...prev].slice(0, 20));
          }
        }
      )
      .subscribe((status) => {
        console.log(`Supabase Connection Status (Student): ${status}`); // Verify if channel connects safely
      });

    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }

    return () => { realtimeClient.removeChannel(channel); };
  }, [authId]);

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  return { notifications, unreadCount, markAllRead, dismiss };
}

export function useDriverNotifications() {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unreadCount,   setUnreadCount]   = useState(0);

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const dismiss = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  useEffect(() => {
    // NOTE: If status defaults to 'pending' on insert, change event to '*' or 'UPDATE'
    const channel = realtimeClient
      .channel('driver-notifications')
      .on(
        'postgres_changes',
        {
          event:  'INSERT', // Watch out if row shifts from pending -> confirmed
          schema: 'public',
          table:  'bookings',
        },
        (payload) => {
          console.log("Realtime Driver Payload Received:", payload); // Diagnostic Log
          const booking = payload.new as any;
          if (booking && booking.status === 'confirmed') {
            const notif: AppNotification = {
              id:      `booking-${booking.id}-${Date.now()}`,
              type:    'new_booking',
              title:   'New Passenger Booking',
              message: `A student just booked Seat ${booking.seat_number}${booking.departure ? ` — ${booking.departure} → ${booking.destination}` : ''}.`,
              time:    new Date(),
              read:    false,
            };
            setNotifications(prev => [notif, ...prev].slice(0, 20));
          }
        }
      )
      .subscribe((status) => {
        console.log(`Supabase Connection Status (Driver): ${status}`);
      });

    return () => { realtimeClient.removeChannel(channel); };
  }, []);

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  return { notifications, unreadCount, markAllRead, dismiss };
}