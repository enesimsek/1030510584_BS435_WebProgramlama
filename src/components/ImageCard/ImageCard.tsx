import './ImageCard.css';
import { Sounds } from '../Sound Player/sound_player';

interface ImageCardProps {
    imageUrl: string;
    isAI: boolean;
    onSelect: (isCorrect: boolean) => void;
    showResult: boolean;
    isSelected: boolean;
    isLoading?: boolean;
    onImageLoad?: () => void;
}

export const ImageCard = ({ imageUrl, isAI, onSelect, showResult, isSelected, isLoading = false, onImageLoad }: ImageCardProps) => {
    const handleClick = () => {
        if (!showResult && !isLoading) {
            // Seçim doğru mu yanlış mı kontrol et ve sesi çal
            if (isAI) {
                Sounds.correct();
            } else {
                Sounds.wrong();
            }
            onSelect(isAI);
        }
    };

    const handleMouseEnter = () => {
        Sounds.hover();
    };

    const getCardClass = () => {
        if (!showResult) return 'image-card';

        if (isAI) {
            // AI görsel - yeşil parlasın
            return 'image-card correct-ai';
        } else if (isSelected) {
            // Yanlış seçim - kırmızı parlasın
            return 'image-card wrong-selection';
        }

        return 'image-card';
    };

    return (
        <div className={getCardClass()} onClick={handleClick} onMouseEnter={handleMouseEnter}>
            <img
                src={imageUrl}
                alt="Görsel"
                onLoad={onImageLoad}
                style={{ display: isLoading ? 'none' : 'block' }}
            />
            {isLoading && <div className="image-card-skeleton" />}
        </div>
    );
};
