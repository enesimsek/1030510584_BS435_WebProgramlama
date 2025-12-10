export type LeaderboardEntry = {
    rank: number;
    name: string;
    score: number;
    mod: number;
};

const STORAGE_KEY = 'leaderboard';

// localStorage'dan leaderboard'u al
export const getLeaderboard = (): LeaderboardEntry[] => {
    const existingData = localStorage.getItem(STORAGE_KEY);
    return existingData ? JSON.parse(existingData) : [];
};

// Skoru localStorage'a kaydet
export const saveScore = (userName: string, score: number, gameMode: number): void => {
    let leaderboard = getLeaderboard();

    // Bu mod için mevcut skorları filtrele
    const modeScores = leaderboard.filter((entry) => entry.mod === gameMode);

    // Eğer 5'ten az skor varsa veya yeni skor mevcut skorlardan yüksekse kaydet
    if (modeScores.length < 5 || score > Math.min(...modeScores.map((s) => s.score))) {
        // Yeni skoru ekle
        leaderboard.push({
            name: userName,
            score: score,
            mod: gameMode,
            rank: 0 // Rank sonra hesaplanacak
        });

        // Bu mod için skorları sırala ve en iyi 5'i al
        const sortedModeScores = leaderboard
            .filter((entry) => entry.mod === gameMode)
            .sort((a, b) => b.score - a.score)
            .slice(0, 5)
            .map((entry, index) => ({
                ...entry,
                rank: index + 1
            }));

        // Diğer modların skorlarını koru
        const otherModScores = leaderboard.filter((entry) => entry.mod !== gameMode);

        // Birleştir ve kaydet
        leaderboard = [...sortedModeScores, ...otherModScores];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(leaderboard));
    }
};

// Belirli bir mod için leaderboard'u al
export const getLeaderboardByMode = (gameMode: number): LeaderboardEntry[] => {
    const leaderboard = getLeaderboard();
    return leaderboard
        .filter((entry) => entry.mod === gameMode)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
};
