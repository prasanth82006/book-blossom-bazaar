
import React, { createContext, useContext, useState, useEffect } from 'react';

interface WishlistContextType {
  wishlist: string[];
  addToWishlist: (bookId: string) => void;
  removeFromWishlist: (bookId: string) => void;
  isInWishlist: (bookId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('bookBazaarWishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  const addToWishlist = (bookId: string) => {
    const newWishlist = [...wishlist, bookId];
    setWishlist(newWishlist);
    localStorage.setItem('bookBazaarWishlist', JSON.stringify(newWishlist));
  };

  const removeFromWishlist = (bookId: string) => {
    const newWishlist = wishlist.filter(id => id !== bookId);
    setWishlist(newWishlist);
    localStorage.setItem('bookBazaarWishlist', JSON.stringify(newWishlist));
  };

  const isInWishlist = (bookId: string) => {
    return wishlist.includes(bookId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
