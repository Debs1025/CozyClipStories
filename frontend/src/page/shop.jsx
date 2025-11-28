import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShoppingCart, Zap, Star, Sparkles, Trophy, Target, Book, Brain, Clock, Shield, Flame, Gift } from 'lucide-react';
import MoneyIcon from '../assets/navbar/moneyIcon.png';
import { useCoins } from '../context/CoinsContext.jsx';
import ConfirmDialog from '../component/common/ConfirmDialog.jsx';
import { fetchConfig } from '../services/api.js';

function GamifiedShop() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => (
    searchParams.get('tab') === 'coins' ? 'coins' : 'abilities'
  ));
  const { coins: userCoins, spendCoins, addCoins } = useCoins();
  const [purchasedAbilities, setPurchasedAbilities] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmData, setConfirmData] = useState(null);
  const [coinPackages, setCoinPackages] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const iconMap = useMemo(() => ({
    Gift, Star, Sparkles, Trophy, Flame, Zap, Brain, Clock, Shield, Book, Target
  }), []);

  const getRarityColor = (rarity) => {
    const colors = {
      common: 'from-gray-400 to-gray-500',
      uncommon: 'from-green-400 to-green-600',
      rare: 'from-blue-400 to-blue-600',
      epic: 'from-purple-400 to-purple-600',
      legendary: 'from-yellow-400 to-orange-500'
    };
    return colors[rarity] || colors.common;
  };

  const handleBuyAbility = (ability) => {
    setConfirmData({ type: 'ability', item: ability });
    setConfirmOpen(true);
  };

  const openConfirmCoins = (pkg) => {
    setConfirmData({ type: 'coins', item: pkg });
    setConfirmOpen(true);
  };

  useEffect(() => {
    const nextTab = searchParams.get('tab') === 'coins' ? 'coins' : 'abilities';
    setActiveTab(nextTab);
  }, [searchParams]);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setLoading(true);
        const [pkgData, abilityData] = await Promise.all([
          fetchConfig('coinPackages'),
          fetchConfig('abilities')
        ]);

        const pkgsWithIcons = pkgData.map((p) => {
          const Icon = iconMap[p.icon] || Gift;
          return { ...p, icon: <Icon className="w-5 h-5" /> };
        });
        const abilitiesWithIcons = abilityData.map((a) => {
          const Icon = iconMap[a.icon] || Zap;
          return { ...a, icon: <Icon className="w-5 h-5" /> };
        });

        if (isMounted) {
          setCoinPackages(pkgsWithIcons);
          setAbilities(abilitiesWithIcons);
          setError(null);
        }
      } catch (e) {
        if (isMounted) setError(e.message || 'Failed to load shop data');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, [iconMap]);

  const handleConfirmPurchase = () => {
    if (!confirmData) return;
    if (confirmData.type === 'ability') {
      const ability = confirmData.item;
      if (userCoins >= ability.cost && !purchasedAbilities.includes(ability.id)) {
        spendCoins(ability.cost);
        setPurchasedAbilities([...purchasedAbilities, ability.id]);
      }
    } else if (confirmData.type === 'coins') {
      const pkg = confirmData.item;
      addCoins(pkg.coins);
    }
    setConfirmOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Coin Balance */}
        <div className="bg-gradient-to-r from-[#a30a2f] to-[#8c0626] rounded-2xl shadow-xl p-4 sm:p-6 mb-8 transform hover:scale-105 transition-transform">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="bg-white rounded-full p-2 sm:p-3 shadow-lg">
                <img src={MoneyIcon} alt="Coins" className="h-7 w-7 sm:h-8 sm:w-8 object-contain" />
              </div>
              <div>
                <p className="text-sm text-white/90 font-medium">Your Balance</p>
                <p className="text-3xl font-bold text-white">{userCoins.toLocaleString()} Coins</p>
              </div>
            </div>
            <div className="hidden sm:block text-right">
              <p className="text-xs text-white/80">Earn more coins by:</p>
              <p className="text-sm text-white font-medium">📚 Reading • 🎯 Quests • 🧠 Quizzes</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-6 flex-wrap justify-center">
          <button
            onClick={() => setActiveTab('abilities')}
            className={`px-6 py-2 rounded-xl font-bold text-base transition-all transform hover:scale-105 ${
              activeTab === 'abilities'
                ? 'bg-gradient-to-r from-[#a30a2f] to-[#8c0626] text-white shadow-lg'
                : 'bg-white text-[#a30a2f] hover:bg-[#a30a2f]/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Buy Abilities
            </div>
          </button>
          <button
            onClick={() => setActiveTab('coins')}
            className={`px-6 py-2 rounded-xl font-bold text-base transition-all transform hover:scale-105 ${
              activeTab === 'coins'
                ? 'bg-gradient-to-r from-[#a30a2f] to-[#8c0626] text-white shadow-lg'
                : 'bg-white text-[#a30a2f] hover:bg-[#a30a2f]/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Buy Coins
            </div>
          </button>
        </div>

        {/* Content Area */}
        {loading && (
          <div className="text-center text-gray-600">Loading shop data...</div>
        )}
        {error && (
          <div className="text-center text-red-600">{error}</div>
        )}
        {!loading && !error && activeTab === 'abilities' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {abilities.map((ability) => (
              <div
                key={ability.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all hover:shadow-2xl"
              >
                <div className={`bg-gradient-to-br ${getRarityColor(ability.rarity)} p-3 text-center`}>
                  <div className="bg-white rounded-full p-2 inline-block mb-2 shadow-lg">
                    <div className="text-red-600">{ability.icon}</div>
                  </div>
                  <h3 className="text-white font-bold text-base">{ability.name}</h3>
                  <p className="text-white text-xs uppercase tracking-wide mt-1 opacity-90">{ability.rarity}</p>
                </div>
                <div className="p-3">
                  <p className="text-gray-600 text-xs mb-3 min-h-[36px]">{ability.description}</p>
                  <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <img src={MoneyIcon} alt="Coins" className="w-4 h-4 object-contain" />
                    <span className="text-base font-bold text-gray-800">{ability.cost}</span>
                  </div>
                </div>
                  <button
                    onClick={() => handleBuyAbility(ability)}
                    disabled={userCoins < ability.cost || purchasedAbilities.includes(ability.id)}
                    className={`w-full py-2 rounded-xl font-bold text-sm transition-all ${
                      purchasedAbilities.includes(ability.id)
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : userCoins >= ability.cost
                        ? 'bg-gradient-to-r from-[#a30a2f] to-[#8c0626] text-white hover:from-[#8c0626] hover:to-[#7a0521] shadow-md hover:shadow-lg'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {purchasedAbilities.includes(ability.id) ? '✓ Owned' : userCoins >= ability.cost ? 'Buy Now' : 'Not Enough Coins'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && activeTab === 'coins' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {coinPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all hover:shadow-2xl ${
                  pkg.popular ? 'ring-4 ring-[#a30a2f] relative' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-[#a30a2f] to-[#8c0626] text-white px-4 py-1 rounded-bl-xl text-xs font-bold">
                    POPULAR
                  </div>
                )}
                <div className="bg-gradient-to-br from-amber-400 to-yellow-500 p-3 sm:p-4 text-center">
                  <div className="bg-white rounded-full p-2 inline-block mb-2 shadow-lg">
                    <div className="text-yellow-600">{pkg.icon}</div>
                  </div>
                  <h3 className="text-white font-bold text-xl">{pkg.coins}</h3>
                  <p className="text-amber-900 text-sm font-medium">Coins</p>
                  {pkg.discount && (
                    <span className="inline-block mt-2 bg-[#a30a2f] text-white text-xs px-3 py-1 rounded-full font-bold">
                      {pkg.discount}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="text-center mb-4">
                    <p className="text-xl font-bold text-gray-800">₱{pkg.price}</p>
                    <p className="text-xs text-gray-500 mt-1">Philippine Peso</p>
                  </div>
                  <button
                    className="w-full py-2 bg-gradient-to-r from-[#a30a2f] to-[#8c0626] text-white rounded-xl font-bold text-sm hover:from-[#8c0626] hover:to-[#7a0521] transition-all shadow-md hover:shadow-lg"
                    onClick={() => openConfirmCoins(pkg)}
                  >
                    Purchase
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Confirm Purchase"
        onConfirm={handleConfirmPurchase}
        onCancel={() => setConfirmOpen(false)}
        confirmLabel="Confirm Purchase"
      >
        {confirmData?.type === 'ability' && (
          <div>
            Buy <span className="font-semibold">{confirmData.item.name}</span> for{' '}
            <span className="font-semibold">{confirmData.item.cost}</span> coins?
          </div>
        )}
        {confirmData?.type === 'coins' && (
          <div>
            Buy <span className="font-semibold">{confirmData.item.coins}</span> coins for{' '}
            <span className="font-semibold">₱{confirmData.item.price}</span>?
          </div>
        )}
      </ConfirmDialog>
    </div>
  );
}

export default GamifiedShop;