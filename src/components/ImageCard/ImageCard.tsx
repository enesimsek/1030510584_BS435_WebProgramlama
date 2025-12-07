import './ImageCard.css';

interface ImageCardProps {
    imageUrl: string;
    isAI: boolean;
    onSelect: (isCorrect: boolean) => void;
    showResult: boolean;
    isSelected: boolean;
}

export const ImageCard = ({ imageUrl, isAI, onSelect, showResult, isSelected }: ImageCardProps) => {
    const handleClick = () => {
        if (!showResult) {
            onSelect(isAI);
        }
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
        <div className={getCardClass()} onClick={handleClick}>
            <img src={imageUrl} alt="Görsel" />
        </div>
    );
};
