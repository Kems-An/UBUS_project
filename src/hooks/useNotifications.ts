// src/hooks/useNotifications.ts
// ── Real-time notifications using Supabase Realtime ──
// Student gets notified when their ticket is scanned.
// Driver gets notified when a new booking is made.

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL     = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Separate client for realtime to avoid conflict with auth client
const realtimeClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface AppNotification {
  id: string;
  type: 'boarding' | 'new_booking';
  title: string;
  message: string;
  time: Date;
  read: boolean;
}

// ── STUDENT: listen for their own booking being scanned ──
export function useStudentNotifications(authId: string | undefined) {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unreadCount,   setUnreadCount]   = useState(0);

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  }, []);

  const dismiss = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  useEffect(() => {
    if (!authId) return;

    // Listen for UPDATE events on bookings where user_id = this student
    // and status changes to 'scanned'
    const channel = realtimeClient
      .channel(`student-notifications-${authId}`)
      .on(
        'postgres_changes',
        {
          event:  'UPDATE',
          schema: 'public',
          table:  'bookings',
          filter: `user_id=eq.${authId}`,
        },
        (payload) => {
          const updated = payload.new as any;
          if (updated.status === 'scanned') {
            const notif: AppNotification = {
              id:      `scanned-${updated.id}-${Date.now()}`,
              type:    'boarding',
              title:   '🚌 Ready for Departure!',
              message: `Your ticket for Seat ${updated.seat_number} has been verified. Please board the shuttle now.`,
              time:    new Date(),
              read:    false,
            };
            setNotifications(prev => [notif, ...prev].slice(0, 20));
            setUnreadCount(prev => prev + 1);

            // Browser push notification (if permission granted)
            if (Notification.permission === 'granted') {
              new Notification('UBUS — Ready to Board! 🚌', {
                body: notif.message,
                icon: '/favicon.svg',
              });
            }
          }
        }
      )
      .subscribe();

    // Request browser notification permission
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    return () => { realtimeClient.removeChannel(channel); };
  }, [authId]);

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  return { notifications, unreadCount, markAllRead, dismiss };
}

// ── DRIVER: listen for any new confirmed booking ──
export function useDriverNotifications() {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unreadCount,   setUnreadCount]   = useState(0);

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  }, []);

  const dismiss = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  useEffect(() => {
    // Listen for INSERT events on bookings (new student books a seat)
    const channel = realtimeClient
      .channel('driver-notifications')
      .on(
        'postgres_changes',
        {
          event:  'INSERT',
          schema: 'public',
          table:  'bookings',
        },
        (payload) => {
          const booking = payload.new as any;
          if (booking.status === 'confirmed') {
            const notif: AppNotification = {
              id:      `booking-${booking.id}-${Date.now()}`,
              type:    'new_booking',
              title:   '🎟️ New Passenger Booking',
              message: `A student just booked Seat ${booking.seat_number}${booking.departure ? ` — ${booking.departure} → ${booking.destination}` : ''}.`,
              time:    new Date(),
              read:    false,
            };
            setNotifications(prev => [notif, ...prev].slice(0, 20));
            setUnreadCount(prev => prev + 1);

            if (Notification.permission === 'granted') {
              new Notification('UBUS — New Booking 🎟️', {
                body: notif.message,
                icon: '/favicon.svg',
              });
            }
          }
        }
      )
      .subscribe();

    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    return () => { realtimeClient.removeChannel(channel); };
  }, []);

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  return { notifications, unreadCount, markAllRead, dismiss };
}
