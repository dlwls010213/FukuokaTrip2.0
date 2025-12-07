import React, { useState, useEffect } from 'react';
import { DEFAULT_PACKING_LIST } from '../constants';
import { PackingItem } from '../types';
import { CheckSquare, Square, Luggage, Plus, Trash2, X, Save } from 'lucide-react';

const Packing: React.FC = () => {
  const [items, setItems] = useState<PackingItem[]>(() => {
    const saved = localStorage.getItem('packing_list');
    return saved ? JSON.parse(saved) : DEFAULT_PACKING_LIST;
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('雜物');

  useEffect(() => {
    localStorage.setItem('packing_list', JSON.stringify(items));
  }, [items]);

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const deleteItem = (id: string) => {
    if (window.confirm('確定要刪除這個項目嗎？')) {
      setItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleAddItem = () => {
    if (!newItemName.trim()) return;
    
    const newItem: PackingItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      category: newItemCategory,
      checked: false
    };

    setItems(prev => [...prev, newItem]);
    setNewItemName('');
    setIsAdding(false);
  };

  // Extract unique categories
  const categories = Array.from(new Set(items.map(i => i.category))).sort();
  // Default categories for the dropdown
  const defaultCategories = ['證件', '錢包', '電子', '衣物', '演唱會', '雜物'];
  const allCategories = Array.from(new Set([...defaultCategories, ...categories]));

  const progress = items.length > 0 ? Math.round((items.filter(i => i.checked).length / items.length) * 100) : 0;

  return (
    <div className="pt-6 relative z-10 pb-20">
      
      {/* Header & Progress */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-white">
             <Luggage size={24} className="text-blue-300" />
             <h2 className="text-xl font-bold">行李清單</h2>
          </div>
          <span className="text-3xl font-black text-white drop-shadow-md">{progress}%</span>
        </div>
        
        <div className="w-full bg-black/20 rounded-full h-2.5 border border-white/10">
          <div 
            className="bg-gradient-to-r from-blue-400 to-blue-300 h-2.5 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Add Item Form */}
      {isAdding ? (
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-6 border border-white/20 shadow-lg animate-fade-in-up">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white font-bold">新增項目</h3>
            <button onClick={() => setIsAdding(false)} className="text-white/60 hover:text-white">
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-blue-200 mb-1">名稱</label>
              <input 
                type="text" 
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="例如：自拍棒"
                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white placeholder-white/30 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            
            <div>
              <label className="block text-xs text-blue-200 mb-1">分類</label>
              <select 
                value={newItemCategory}
                onChange={(e) => setNewItemCategory(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white outline-none appearance-none"
              >
                {allCategories.map(cat => (
                  <option key={cat} value={cat} className="text-slate-900">{cat}</option>
                ))}
              </select>
            </div>

            <button 
              onClick={handleAddItem}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 mt-2 transition-colors shadow-lg"
            >
              <Save size={18} />
              儲存項目
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsAdding(true)}
          className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 border-dashed text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 mb-6 transition-all group"
        >
          <div className="bg-blue-500 rounded-full p-1 group-hover:scale-110 transition-transform">
            <Plus size={20} />
          </div>
          新增行李項目
        </button>
      )}

      {/* List Groups */}
      <div className="space-y-6">
        {categories.map(category => (
          <div key={category} className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-white/20">
            <div className="bg-black/20 px-4 py-2 border-b border-white/10 flex justify-between items-center">
              <h3 className="font-bold text-blue-200 text-sm tracking-wider">{category}</h3>
              <span className="text-[10px] text-white/40 bg-white/10 px-2 py-0.5 rounded-full">
                {items.filter(i => i.category === category && i.checked).length} / {items.filter(i => i.category === category).length}
              </span>
            </div>
            <div className="divide-y divide-white/10">
              {items.filter(i => i.category === category).map(item => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-3 p-4 hover:bg-white/5 transition-colors group"
                >
                  <div 
                    onClick={() => toggleItem(item.id)}
                    className={`cursor-pointer text-blue-300 transition-transform duration-200 ${item.checked ? 'scale-110 opacity-60' : 'hover:scale-110'}`}
                  >
                    {item.checked ? <CheckSquare size={22} className="text-green-400" /> : <Square size={22} />}
                  </div>
                  
                  <span 
                    onClick={() => toggleItem(item.id)}
                    className={`flex-1 font-medium cursor-pointer transition-colors ${
                      item.checked ? 'text-white/30 line-through' : 'text-white'
                    }`}
                  >
                    {item.name}
                  </span>

                  <button 
                    onClick={() => deleteItem(item.id)}
                    className="p-2 text-white/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    aria-label="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center text-white/40 py-10">
            <p>清單是空的，開始新增一些項目吧！</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Packing;