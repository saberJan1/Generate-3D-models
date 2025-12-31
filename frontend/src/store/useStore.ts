import { create } from 'zustand';

interface AppState {
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
    user: null | { id: string; name: string };
    setUser: (user: null | { id: string; name: string }) => void;
}

export const useStore = create<AppState>((set) => ({
    isLoading: false,
    setLoading: (loading) => set({ isLoading: loading }),
    user: null,
    setUser: (user) => set({ user }),
}));
