import { create } from 'zustand';

type TvideoValidationStore = {
    isVideoDeepfake: boolean;
    setIsVideoDeepfake: (value: boolean) => void;
};

export const videoValidationStore = create<TvideoValidationStore>((set) => ({
    isVideoDeepfake: false,
    setIsVideoDeepfake: (value: boolean) => set({ isVideoDeepfake: value }),
}));