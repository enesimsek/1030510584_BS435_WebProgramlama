import { AI_IMAGES } from '../constants/aiImages';

export interface GameImage {
    id: string;
    url: string;
    isAI: boolean;
}

// Random AI görsel seç
const getRandomAIImage = () => {
    const randomIndex = Math.floor(Math.random() * AI_IMAGES.length);
    return `/src/assets/aı_images/${AI_IMAGES[randomIndex]}`;
};

// Random gerçek görsel seç (Picsum)
const getRealImage = () => {
    const randomId = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/400/300?random=${randomId}`;
};

// Belirtilen sayıda gerçek görsel çek
export const getRealImages = (count: number): GameImage[] => {
    const realImages: GameImage[] = [];

    for (let i = 0; i < count; i++) {
        realImages.push({
            id: `real-${i}`,
            url: getRealImage(),
            isAI: false
        });
    }

    return realImages;
};

// 1 AI görsel döndür
export const getAIImage = (): GameImage => {
    return {
        id: 'ai-1',
        url: getRandomAIImage(),
        isAI: true
    };
};

// Oyun için görselleri hazırla (gerçek + AI karışık)
export const getGameImages = (realCount: number, aiCount: number = 1): GameImage[] => {
    const images: GameImage[] = [];

    // Gerçek görseller ekle
    images.push(...getRealImages(realCount));

    // AI görseller ekle
    for (let i = 0; i < aiCount; i++) {
        images.push({
            id: `ai-${i + 1}`,
            url: getRandomAIImage(),
            isAI: true
        });
    }

    // Görselleri karıştır
    return images.sort(() => Math.random() - 0.5);
};
