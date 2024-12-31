import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteContests');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favoriteContests', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (contestId) => {
    setFavorites(prev => {
      if (prev.includes(contestId)) {
        return prev.filter(id => id !== contestId);
      }
      return [...prev, contestId];
    });
  };

  const isFavorite = (contestId) => favorites.includes(contestId);

  return { favorites, toggleFavorite, isFavorite };
}; 