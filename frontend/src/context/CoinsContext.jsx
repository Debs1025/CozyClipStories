import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchWallet } from '../services/api.js';

const CoinsContext = createContext(undefined);

export function CoinsProvider({ children }) {
  const [coins, setCoins] = useState(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('coins') : null;
    return stored ? Number(stored) : 0; // hydrate from wallet.json if not stored
  });

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('coins') : null;
    if (stored == null) {
      fetchWallet()
        .then((data) => {
          if (typeof data?.coins === 'number') setCoins(Number(data.coins));
        })
        .catch(() => {
          // fallback for demo
          setCoins(950);
        });
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem('coins', String(coins));
    } catch {}
  }, [coins]);

  const addCoins = (amount) => setCoins((c) => Math.max(0, c + Number(amount || 0)));
  const spendCoins = (amount) => setCoins((c) => Math.max(0, c - Number(amount || 0)));

  const value = useMemo(() => ({ coins, setCoins, addCoins, spendCoins }), [coins]);
  return <CoinsContext.Provider value={value}>{children}</CoinsContext.Provider>;
}

export function useCoins() {
  const ctx = useContext(CoinsContext);
  if (!ctx) throw new Error('useCoins must be used within a CoinsProvider');
  return ctx;
}