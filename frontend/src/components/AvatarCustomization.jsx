import { useState } from 'react';
import { Lock, Check } from 'lucide-react';
import profileImg from "../assets/profile.png";

export function AvatarCustomization() {
  const [selectedAvatar, setSelectedAvatar] = useState('avatar1');
  const [selectedFrame, setSelectedFrame] = useState('frame1');
  const [activeTab, setActiveTab] = useState('avatar');

  
  const avatars = [
    { id: 'avatar1', type: 'avatar', unlocked: true, imageUrl: profileImg, name: 'Default' },
    { id: 'avatar2', type: 'avatar', unlocked: true, imageUrl: profileImg, name: 'Adventurer' },
    { id: 'avatar3', type: 'avatar', unlocked: true, imageUrl: profileImg, name: 'Scholar' },

    
    { id: 'avatar4', type: 'avatar', unlocked: false, price: 100, imageUrl: profileImg, name: 'Explorer' },
    { id: 'avatar5', type: 'avatar', unlocked: false, price: 150, imageUrl: profileImg, name: 'Master' },
    { id: 'avatar6', type: 'avatar', unlocked: false, price: 200, imageUrl: profileImg, name: 'Legend' },
  ];

  const frames = [
    { id: 'frame1', type: 'frame', unlocked: true, imageUrl: '', name: 'No Frame' },
    { id: 'frame2', type: 'frame', unlocked: true, imageUrl: '', name: 'Bronze' },
    { id: 'frame3', type: 'frame', unlocked: false, price: 50, imageUrl: '', name: 'Silver' },
    { id: 'frame4', type: 'frame', unlocked: false, price: 100, imageUrl: '', name: 'Gold' },
    { id: 'frame5', type: 'frame', unlocked: false, price: 200, imageUrl: '', name: 'Diamond' },
    { id: 'frame6', type: 'frame', unlocked: false, price: 300, imageUrl: '', name: 'Legendary' },
  ];

  const currentAvatar = avatars.find(a => a.id === selectedAvatar);
  const currentFrame = frames.find(f => f.id === selectedFrame);

  const getFrameColor = (frameName) => {
    const colors = {
      'No Frame': 'transparent',
      'Bronze': '#cd7f32',
      'Silver': '#c0c0c0',
      'Gold': '#ffd700',
      'Diamond': '#b9f2ff',
      'Legendary': '#9d00ff'
    };
    return colors[frameName] || 'transparent';
  };

  return (
    <div className="bg-white rounded-[20px] p-6 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-black">
      <h2 className="font-kameron-semibold text-[30px] text-black mb-6">Customization</h2>
      
      {/* PREVIEW */}
      <div className="bg-[#f3ebe2] rounded-lg p-6 mb-6">
        <p className="font-kameron-regular text-[16px] text-black mb-4 text-center">Preview</p>
        <div className="flex justify-center">
          <div 
            className="w-32 h-32 rounded-full overflow-hidden relative"
            style={{
              border: currentFrame?.name !== 'No Frame' ? `4px solid ${getFrameColor(currentFrame?.name)}` : 'none',
              boxShadow: currentFrame?.name !== 'No Frame' ? '0 0 20px rgba(0,0,0,0.2)' : 'none'
            }}
          >
            {currentAvatar && (
              <img 
                src={currentAvatar.imageUrl} 
                alt="Avatar preview" 
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
        <p className="text-center mt-3 font-['Kameron:Regular'] text-[14px] text-black/60">
          {currentAvatar?.name} {currentFrame?.name !== 'No Frame' && `• ${currentFrame?.name} Frame`}
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('avatar')}
          className={`flex-1 py-2 rounded-lg transition-colors font-kameron-regular text-[16px] ${
            activeTab === 'avatar' ? 'bg-[#870022] text-white' : 'bg-gray-100 text-black hover:bg-gray-200'
          }`}
        >
          Avatars
        </button>

        <button
          onClick={() => setActiveTab('frame')}
          className={`flex-1 py-2 rounded-lg transition-colors font-kameron-regular text-[16px] ${
            activeTab === 'frame' ? 'bg-[#870022] text-white' : 'bg-gray-100 text-black hover:bg-gray-200'
          }`}
        >
          Frames
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-3 max-h-[400px] overflow-y-auto">
        {(activeTab === 'avatar' ? avatars : frames).map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.unlocked) {
                item.type === 'avatar' ? setSelectedAvatar(item.id) : setSelectedFrame(item.id);
              }
            }}
            className={`relative rounded-lg overflow-hidden border-2 transition-all ${
              (item.type === 'avatar' ? selectedAvatar : selectedFrame) === item.id
                ? 'border-[#870022] shadow-lg'
                : 'border-gray-200 hover:border-gray-300'
            } ${!item.unlocked ? 'opacity-60' : ''}`}
            disabled={!item.unlocked}
          >
            {item.type === 'avatar' ? (
              <div className="aspect-square">
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div 
                className="aspect-square flex items-center justify-center"
                style={{
                  background: item.name === 'No Frame'
                    ? 'repeating-linear-gradient(45deg,#f0f0f0,#f0f0f0 10px,#e0e0e0 10px,#e0e0e0 20px)'
                    : getFrameColor(item.name)
                }}
              >
                <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center">
                  <span className="text-[10px] text-center px-1">{item.name}</span>
                </div>
              </div>
            )}

            {/* SELECTED CHECK */}
            {(item.type === 'avatar' ? selectedAvatar : selectedFrame) === item.id && item.unlocked && (
              <div className="absolute top-1 right-1 bg-[#870022] rounded-full p-1">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}

            {/* LOCKED */}
            {!item.unlocked && (
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                <Lock className="w-6 h-6 text-white mb-1" />
                <div className="bg-[#FFCD29] px-2 py-1 rounded text-[10px] flex items-center gap-1">
                  <span>{item.price}</span>
                  <span>coins</span>
                </div>
              </div>
            )}

            {/* NAME LABEL */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] py-1 px-1 text-center">
              {item.name}
            </div>
          </button>
        ))}
      </div>

      {/* APPLY BUTTON */}
      <button className="w-full bg-[#870022] text-white py-3 rounded-lg hover:bg-[#6b001b] transition-colors mt-4">
        <span className="font-kameron-semibold text-[16px]">Apply Changes</span>
      </button>
    </div>
  );
}
