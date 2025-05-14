import { create } from 'zustand';

interface NotificationStore {
    notification: string;
    type: 'success' | 'error' | 'warning' | 'info';
    variant: 'filled' | 'outlined' | 'standard';
    position: { vertical: 'top' | 'bottom', horizontal: 'left' | 'right' | 'center' };
    setNotification: (notification: string, type: 'success' | 'error' | 'warning' | 'info', variant: 'filled' | 'outlined' | 'standard', position: { vertical: 'top' | 'bottom', horizontal: 'left' | 'right' | 'center' }) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
    notification: '',
    type: 'success',
    variant: 'filled',
    position: { vertical: 'top', horizontal: 'right' },
    setNotification: (notification, type, variant, position) => set({ notification, type, variant, position, open: true }),
    open: false,
    setOpen: (open) => set({ open }),
}));



