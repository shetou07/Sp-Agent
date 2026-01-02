import React, { useState, useEffect, useRef } from 'react';
import { CartItem, Student } from '../types';

interface IdentifyStudentScreenProps {
  total: number;
  cart: CartItem[];
  onCancel: () => void;
  onConfirm: (student: Student) => void;
}

const STUDENTS: Student[] = [
  { id: 'SP-8821', name: 'Alex Mukasa', class: '4B', balance: 50000, image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=150&q=80' },
  { id: 'SP-3341', name: 'Patience Akello', class: '3A', balance: 10000, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' },
];

export const IdentifyStudentScreen: React.FC<IdentifyStudentScreenProps> = ({ total, cart, onCancel, onConfirm }) => {
  const [identifiedStudent, setIdentifiedStudent] = useState<Student | null>(null);
  const [manualId, setManualId] = useState('');
  const hasIdentifiedRef = useRef(false);

  // Simulate NFC scan after 4 seconds for demo
  useEffect(() => {
    const timer = setTimeout(() => {
      // Check ref to ensure we don't overwrite a manual entry
      if (!hasIdentifiedRef.current) {
         setIdentifiedStudent(STUDENTS[0]);
         hasIdentifiedRef.current = true;
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const student = STUDENTS.find(s => s.id.toLowerCase() === manualId.toLowerCase()) || STUDENTS[0];
    setIdentifiedStudent(student);
    hasIdentifiedRef.current = true;
  };

  const clearSelection = () => {
    setIdentifiedStudent(null);
    hasIdentifiedRef.current = false;
    // Restarting the timer is tricky with useEffect [], so we just leave it cleared for manual entry
    // or the user can go back and forth to reset.
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-[#0d1b0d] dark:text-white font-display flex flex-col overflow-x-hidden relative">
      {/* Background UI (Blurred when modal is open) */}
      <div className={`flex flex-col h-full transition-all duration-300 ${identifiedStudent ? 'blur-sm opacity-50 pointer-events-none' : ''}`}>
        <header className="w-full bg-white dark:bg-[#1a2e1a] border-b border-[#e7f3e7] dark:border-[#2a402a] sticky top-0 z-10">
          <div className="px-4 md:px-10 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-8 flex items-center justify-center bg-primary/20 rounded-lg text-primary">
                <span className="material-symbols-outlined">school</span>
              </div>
              <h2 className="text-[#0d1b0d] dark:text-white text-lg font-bold">Identify Student</h2>
            </div>
            <button onClick={onCancel} className="text-sm font-bold text-gray-500 hover:text-red-500">Cancel Transaction</button>
          </div>
        </header>

        <main className="flex-1 w-full max-w-[1440px] mx-auto p-4 md:p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-4xl font-black tracking-tight">Scan Smart Card</h1>
                <p className="text-gray-600 dark:text-gray-300 text-base">Tap the card on the NFC reader to proceed with payment of <strong>UGX {total.toLocaleString()}</strong>.</p>
              </div>

              <div className="rounded-xl border border-[#cfe7cf] dark:border-[#2a402a] bg-white dark:bg-[#1a2e1a] p-6 shadow-sm">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative size-20 flex items-center justify-center rounded-full bg-primary/10 scanner-pulse shrink-0">
                    <span className="material-symbols-outlined text-4xl text-primary">contactless</span>
                  </div>
                  <div className="flex flex-col gap-1 text-center md:text-left flex-1">
                    <h2 className="text-xl font-bold">Scanner Ready</h2>
                    <p className="text-sm text-gray-500">Listening for NFC signal...</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1a2e1a] rounded-xl shadow-sm p-6 md:p-8 flex flex-col gap-6">
                 <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined">keyboard</span>
                    <h3 className="text-lg font-bold">Manual Entry</h3>
                 </div>
                 <form onSubmit={handleManualSubmit} className="flex flex-col gap-6">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-gray-400">badge</span>
                      </div>
                      <input 
                        value={manualId}
                        onChange={(e) => setManualId(e.target.value)}
                        className="block w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-black/20 border-gray-300 dark:border-white/10 rounded-lg text-2xl font-bold tracking-widest placeholder-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
                        placeholder="SP-0000" 
                      />
                    </div>
                    <button type="submit" className="flex items-center justify-center gap-2 h-14 bg-primary hover:bg-[#0fd60f] text-[#0d1b0d] rounded-lg text-lg font-bold transition-colors shadow-lg shadow-primary/20">
                      <span>Verify Identity</span>
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                 </form>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6">
               <div className="bg-white dark:bg-[#1a2e1a] rounded-xl border border-[#cfe7cf] dark:border-[#2a402a] flex flex-col h-full max-h-[600px]">
                  <div className="p-5 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
                    <h3 className="font-bold">Recent Scans</h3>
                  </div>
                  <div className="flex-1 p-2">
                    {/* Placeholder recent scans */}
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 opacity-60">
                       <div className="size-10 rounded-full bg-gray-200"></div>
                       <div className="flex-1"><div className="h-4 bg-gray-200 rounded w-24 mb-1"></div><div className="h-3 bg-gray-200 rounded w-16"></div></div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </main>
      </div>

      {/* Confirmation Modal */}
      {identifiedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d1b0d]/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="relative w-full max-w-[480px] flex flex-col bg-white dark:bg-[#1a2e1a] rounded-xl shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-bold tracking-tight text-[#0d1b0d] dark:text-white">Confirm Transaction</h3>
              <button onClick={clearSelection} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10">
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
            
            <div className="p-6 flex flex-col gap-6">
              {/* Student Profile Card */}
              <div className="bg-background-light dark:bg-background-dark rounded-lg p-4 flex gap-4 border-l-4 border-primary shadow-sm">
                <div className="relative h-14 w-14 shrink-0">
                  <div className="h-full w-full rounded-full bg-center bg-cover border-2 border-white dark:border-[#1a2e1a] shadow-sm" style={{ backgroundImage: `url('${identifiedStudent.image}')` }}></div>
                  <div className="absolute -bottom-1 -right-1 bg-primary text-black rounded-full p-[2px] border-2 border-white dark:border-[#1a2e1a]">
                    <span className="material-symbols-outlined text-[12px] block font-bold">check</span>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-[#0d1b0d] dark:text-white text-lg font-bold leading-tight">{identifiedStudent.name}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-0.5">Class {identifiedStudent.class} • ID: #{identifiedStudent.id}</p>
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-end px-1">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Order Items</p>
                  <p className="text-xs text-gray-400">{cart.length} Items</p>
                </div>
                <div className="bg-background-light dark:bg-background-dark rounded-lg border border-gray-100 dark:border-gray-800 divide-y divide-gray-200 dark:divide-gray-800 overflow-hidden max-h-[150px] overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-3">
                         <div className="h-10 w-10 rounded-lg bg-white dark:bg-[#253825] flex items-center justify-center text-xl shadow-sm border border-gray-100 dark:border-transparent bg-center bg-cover" style={{ backgroundImage: `url('${item.image}')` }}></div>
                         <div>
                           <p className="text-sm font-bold text-[#0d1b0d] dark:text-white">{item.name} {item.quantity > 1 ? `x${item.quantity}` : ''}</p>
                           <p className="text-xs text-gray-500 dark:text-gray-400">{item.category}</p>
                         </div>
                      </div>
                      <p className="text-sm font-bold text-[#0d1b0d] dark:text-white">UGX {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total & Status */}
              <div className="flex flex-col gap-1 text-center py-2 border-t border-gray-100 dark:border-gray-800 pt-6 mt-2">
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wide">Total Amount</p>
                <h1 className="text-5xl font-extrabold text-[#0d1b0d] dark:text-white tracking-tight flex items-center justify-center gap-1">
                  <span className="text-2xl text-gray-400 font-bold self-start mt-2">UGX</span>{total.toLocaleString()}
                </h1>
                
                {identifiedStudent.balance >= total ? (
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <div className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                      <span className="material-symbols-outlined text-primary text-sm filled font-bold">verified_user</span>
                      <span className="text-primary text-xs font-bold uppercase tracking-wider">Sufficient Funds</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">Balance Hidden</span>
                  </div>
                ) : (
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <div className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-red-100 border border-red-200">
                       <span className="material-symbols-outlined text-red-600 text-sm font-bold">error</span>
                       <span className="text-red-600 text-xs font-bold uppercase tracking-wider">Insufficient Funds</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">Bal: UGX {identifiedStudent.balance.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 pt-2 grid grid-cols-2 gap-4">
              <button onClick={clearSelection} className="flex items-center justify-center px-4 py-3.5 rounded-lg text-gray-600 dark:text-gray-300 font-bold text-sm bg-transparent hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
                Cancel (Esc)
              </button>
              <button 
                onClick={() => onConfirm(identifiedStudent)}
                className="flex items-center justify-center px-4 py-3.5 rounded-lg text-[#052e05] font-bold text-sm bg-primary hover:bg-[#0fd60f] shadow-[0_4px_14px_0_rgba(19,236,19,0.39)] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Confirm Payment (Enter)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};