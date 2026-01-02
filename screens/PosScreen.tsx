import React, { useState } from 'react';
import { CartItem, Product } from '../types';

interface PosScreenProps {
  onNavigate: (screen: any) => void;
  onUpdateCart: (cart: CartItem[]) => void;
  cart: CartItem[];
}

const PRODUCTS: Product[] = [
  { id: '1', name: 'Fresh Mango', category: 'Snacks', price: 500, image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=300&q=80' },
  { id: '2', name: 'Rolex (2 Eggs)', category: 'Canteen', price: 2500, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=300&q=80' },
  { id: '3', name: 'Picfare Exercise Book', category: 'Stationary', price: 3500, image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=300&q=80' },
  { id: '4', name: 'Bic Pen (Blue)', category: 'Stationary', price: 1000, image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&w=300&q=80' },
  { id: '5', name: 'Rwenzori Water', category: 'Canteen', price: 1500, image: 'https://images.unsplash.com/photo-1602143407151-11115cdbf6e0?auto=format&fit=crop&w=300&q=80' },
  { id: '6', name: 'Rice & Beans (Special)', category: 'Canteen', price: 6000, image: 'https://images.unsplash.com/photo-1594488518001-16c51b639a62?auto=format&fit=crop&w=300&q=80' },
  { id: '7', name: 'Passion Fruit Juice', category: 'Beverages', price: 2000, image: 'https://images.unsplash.com/photo-1614735063708-35d76b223027?auto=format&fit=crop&w=300&q=80' },
  { id: '8', name: 'Beef Samosa (Pair)', category: 'Snacks', price: 1500, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=300&q=80' }
];

export const PosScreen: React.FC<PosScreenProps> = ({ onNavigate, onUpdateCart, cart }) => {
  const [activeTab, setActiveTab] = useState('All Items');
  const [mode, setMode] = useState<'SEARCH' | 'MANUAL'>('SEARCH');
  
  // Manual Amount State
  const [manualDescription, setManualDescription] = useState('');
  const [manualAmount, setManualAmount] = useState('');

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      onUpdateCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      onUpdateCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleAddManualItem = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(manualAmount.replace(/[^0-9]/g, ''));
    if (!amount || amount <= 0) return;

    const manualItem: Product = {
      id: `manual-${Date.now()}`,
      name: manualDescription || 'General Charge',
      category: 'Manual',
      price: amount,
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=100&q=80'
    };

    onUpdateCart([...cart, { ...manualItem, quantity: 1 }]);
    setManualDescription('');
    setManualAmount('');
    setMode('SEARCH'); // Switch back to search after adding
  };

  const removeFromCart = (id: string) => {
    const existing = cart.find(item => item.id === id);
    if (existing && existing.quantity > 1) {
      onUpdateCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item));
    } else {
      onUpdateCart(cart.filter(item => item.id !== id));
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background-light dark:bg-background-dark text-text-main dark:text-white">
      {/* Header */}
      <header className="flex-none flex items-center justify-between whitespace-nowrap border-b border-solid border-accent-light dark:border-accent-dark bg-surface-light dark:bg-surface-dark px-6 py-3 z-10">
        <div className="flex items-center gap-4 text-text-main dark:text-white">
          <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-black">
            <span className="material-symbols-outlined">point_of_sale</span>
          </div>
          <div>
            <h2 className="text-text-main dark:text-white text-lg font-bold leading-tight">Student Pesa</h2>
            <p className="text-xs text-text-secondary font-medium">Agent Portal</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-3 py-1 bg-accent-light dark:bg-accent-dark rounded-full">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-sm font-medium text-text-secondary">Online</span>
          </div>
          <div className="flex items-center gap-4">
             <button onClick={() => onNavigate('TOTALS')} className="text-sm font-bold text-text-secondary hover:underline">Daily Totals</button>
            <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-accent-light dark:border-accent-dark" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80")' }}></div>
            <button onClick={() => onNavigate('LOGIN')} className="flex items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-accent-light dark:bg-accent-dark hover:bg-gray-200 dark:hover:bg-gray-700 text-text-main dark:text-white text-sm font-bold transition-colors">
              <span className="truncate">Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left: Products or Manual Form */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-5xl mx-auto w-full flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h1 className="text-text-main dark:text-white tracking-tight text-3xl font-bold leading-tight">
                  {mode === 'SEARCH' ? 'Agent POS' : 'Manual Entry'}
                </h1>
                <p className="text-text-secondary text-sm font-normal">
                  {mode === 'SEARCH' ? 'Ready to process transactions' : 'Enter custom charge details'}
                </p>
              </div>
              <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-1 flex shadow-sm border border-accent-light dark:border-accent-dark">
                <button 
                  onClick={() => setMode('SEARCH')}
                  className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${mode === 'SEARCH' ? 'bg-primary text-black shadow-sm' : 'text-text-secondary hover:text-text-main dark:hover:text-white'}`}
                >
                  Product Search
                </button>
                <button 
                  onClick={() => setMode('MANUAL')}
                  className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${mode === 'MANUAL' ? 'bg-primary text-black shadow-sm' : 'text-text-secondary hover:text-text-main dark:hover:text-white'}`}
                >
                  Manual Amount
                </button>
              </div>
            </div>

            {mode === 'SEARCH' ? (
              <>
                <div className="w-full">
                  <label className="flex flex-col w-full">
                    <div className="flex w-full items-stretch rounded-xl h-14 bg-surface-light dark:bg-surface-dark shadow-sm border border-accent-light dark:border-accent-dark focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all overflow-hidden">
                      <div className="text-text-secondary flex items-center justify-center pl-4">
                        <span className="material-symbols-outlined">search</span>
                      </div>
                      <input className="flex w-full min-0 flex-1 resize-none bg-transparent border-none text-text-main dark:text-white placeholder:text-text-secondary px-4 text-lg font-medium focus:outline-0 focus:ring-0 h-full" placeholder="Search snacks, books, or stationary..." />
                    </div>
                  </label>
                </div>

                <div className="flex gap-3 flex-wrap">
                  {['All Items', 'Canteen', 'Bookstore', 'Uniforms', 'Stationary'].map(tab => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex h-9 items-center justify-center gap-x-2 rounded-lg px-5 transition-colors ${activeTab === tab ? 'bg-text-main text-white' : 'bg-accent-light dark:bg-accent-dark hover:bg-primary/20 text-text-main dark:text-white'}`}
                    >
                      <span className="text-sm font-medium">{tab}</span>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
                  {PRODUCTS.filter(p => activeTab === 'All Items' || p.category === activeTab || (activeTab === 'Bookstore' && p.category === 'Stationary')).map(product => (
                    <div key={product.id} onClick={() => addToCart(product)} className="group bg-surface-light dark:bg-surface-dark rounded-xl p-3 shadow-sm border border-accent-light dark:border-accent-dark hover:border-primary hover:shadow-md cursor-pointer transition-all flex flex-col gap-3">
                      <div className="aspect-[4/3] w-full rounded-lg bg-accent-light dark:bg-accent-dark bg-center bg-cover overflow-hidden relative" style={{ backgroundImage: `url('${product.image || 'https://picsum.photos/400/300'}')` }}>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                      </div>
                      <div>
                        <p className="text-text-main dark:text-white font-bold text-base leading-tight">{product.name}</p>
                        <p className="text-text-secondary text-xs mt-1">{product.category}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-lg font-bold text-text-main dark:text-white">UGX {product.price.toLocaleString()}</span>
                          <div className="size-8 rounded-full bg-accent-light dark:bg-accent-dark text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                            <span className="material-symbols-outlined text-xl">add</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] animate-fade-in">
                <form onSubmit={handleAddManualItem} className="w-full max-w-lg bg-surface-light dark:bg-surface-dark p-8 rounded-2xl border border-accent-light dark:border-accent-dark shadow-xl flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-text-secondary">Description</label>
                    <input 
                      type="text"
                      value={manualDescription}
                      onChange={(e) => setManualDescription(e.target.value)}
                      placeholder="e.g. Library Fine, Trip Deposit..."
                      className="w-full h-14 rounded-xl border border-accent-light dark:border-accent-dark bg-background-light dark:bg-background-dark px-4 text-lg font-medium focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-text-secondary">Amount (UGX)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary font-bold">
                        UGX
                      </div>
                      <input 
                        type="text"
                        value={manualAmount}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, '');
                          setManualAmount(val ? parseInt(val).toLocaleString() : '');
                        }}
                        placeholder="0"
                        className="w-full h-20 pl-16 rounded-xl border border-accent-light dark:border-accent-dark bg-background-light dark:bg-background-dark px-4 text-4xl font-black text-primary tracking-tight focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={!manualAmount || parseInt(manualAmount.replace(/[^0-9]/g, '')) <= 0}
                    className="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-5 rounded-xl shadow-lg shadow-primary/20 transform active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-xl mt-4"
                  >
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                    Add to Sale
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Right: Cart */}
        <aside className="w-[400px] bg-surface-light dark:bg-surface-dark border-l border-accent-light dark:border-accent-dark flex flex-col z-20 shadow-xl flex-none">
          <div className="p-6 border-b border-accent-light dark:border-accent-dark flex justify-between items-center bg-surface-light dark:bg-surface-dark">
            <div>
              <h3 className="text-lg font-bold text-text-main dark:text-white">Current Sale</h3>
              <p className="text-xs text-text-secondary">Order #8493</p>
            </div>
            <button onClick={() => onUpdateCart([])} className="text-text-secondary hover:text-red-500 transition-colors">
              <span className="material-symbols-outlined text-xl">delete_sweep</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-background-light dark:hover:bg-background-dark group">
                <div className="size-12 rounded bg-accent-light dark:bg-accent-dark bg-cover bg-center flex-none" style={{ backgroundImage: `url('${item.image || 'https://picsum.photos/100/100'}')` }}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-text-main dark:text-white truncate">{item.name}</p>
                  <p className="text-xs text-text-secondary">UGX {item.price.toLocaleString()} each</p>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-black rounded-lg border border-accent-light dark:border-accent-dark px-1 py-1">
                  <button onClick={() => removeFromCart(item.id)} className="size-6 flex items-center justify-center rounded hover:bg-accent-light dark:hover:bg-accent-dark text-text-secondary hover:text-text-main">
                    <span className="material-symbols-outlined text-sm">remove</span>
                  </button>
                  <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                  <button onClick={() => addToCart(item)} className="size-6 flex items-center justify-center rounded hover:bg-accent-light dark:hover:bg-accent-dark text-text-secondary hover:text-text-main">
                    <span className="material-symbols-outlined text-sm">add</span>
                  </button>
                </div>
                <p className="text-sm font-bold text-text-main dark:text-white w-20 text-right">UGX {(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
            {cart.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-text-secondary opacity-50">
                 <span className="material-symbols-outlined text-4xl mb-2">shopping_basket</span>
                 <p>Cart is empty</p>
              </div>
            )}
          </div>

          <div className="bg-background-light dark:bg-background-dark p-6 border-t border-accent-light dark:border-accent-dark flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm text-text-secondary">
                <span>Subtotal</span>
                <span>UGX {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-text-secondary">
                <span>Tax (0%)</span>
                <span>UGX 0</span>
              </div>
              <div className="flex justify-between items-end mt-2">
                <span className="text-base font-bold text-text-main dark:text-white">Total Amount</span>
                <span className="text-3xl font-extrabold text-text-main dark:text-white tracking-tight">UGX {total.toLocaleString()}</span>
              </div>
            </div>
            
            <button 
              disabled={cart.length === 0}
              onClick={() => onNavigate('IDENTIFY')}
              className="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-4 px-6 rounded-xl shadow-lg shadow-primary/20 transform active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-lg"
            >
              <span className="material-symbols-outlined">payments</span>
              <span>Charge UGX {total.toLocaleString()}</span>
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
};