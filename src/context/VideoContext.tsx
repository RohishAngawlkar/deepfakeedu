// context/VideoContext.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface VideoContextProps {
    videoUrls: string[];
    setVideoUrls: (urls: string[]) => void;
}

const VideoContext = createContext<VideoContextProps | undefined>(undefined);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
    const [videoUrls, setVideoUrls] = useState<string[]>([]);

    return (
        <VideoContext.Provider value={{ videoUrls, setVideoUrls }}>
            {children}
        </VideoContext.Provider>
    );
};

export const useVideoContext = () => {
    const context = useContext(VideoContext);
    if (!context) {
        throw new Error('useVideoContext must be used within a VideoProvider');
    }
    return context;
};
