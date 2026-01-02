import React from 'react';
import { Transaction } from '../types';

interface DailyTotalsScreenProps {
  onBack: () => void;
}

const TRANSACTIONS: Transaction[] = [
  { id: '1', time: '10:42 AM', student: { name: 'Jane Nakato', class: 'Class 4B', image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=150&q=80' }, cardLast4: '4021', type: 'Purchase', status: 'Success', amount: 25000 },
  { id: '2', time: '10:38 AM', student: { name: 'David Kizza', class: 'Class 5A', image: '' }, cardLast4: '8829', type: 'Purchase', status: 'Success', amount: 12000 },
  { id: '3', time: '10:15 AM', student: { name: 'Samuel Ochieng', class: 'Class 3C', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80' }, cardLast4: '1002', type: 'Withdrawal', status: 'Failed', amount: 50000 },
  { id: '4', time: '09:55 AM', student: { name: 'Mercy Auma', class: 'Class 6B', image: 'https://images.unsplash.com/photo-1554151228-14d9def656ec?auto=format&fit=crop&w=150&q=80' }, cardLast4: '5632', type: 'Purchase', status: 'Success', amount: 8500 },
];

export const DailyTotalsScreen: React.FC<DailyTotalsScreenProps> = ({ onBack }) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#152a15] flex flex-col justify-between h-full">
        <div className="p-6 flex flex-col gap-8 h-full">
          <div className="flex items-center gap-3">
             <div className="bg-center bg-cover rounded-full size-10 shadow-sm shrink-0" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=100&q=80")' }}></div>
             <div>
                <h1 className="text-base font-bold leading-tight">Student Pesa</h1>
                <p className="text-primary text-xs font-medium uppercase tracking-wide">Agent Portal</p>
             </div>
          </div>
          
          <nav className="flex flex-col gap-2 flex-1">
             <button onClick={onBack} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
                <span className="material-symbols-outlined">arrow_back</span>
                <p className="text-sm font-medium">Back to POS</p>
             </button>
             <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-primary">
                <span className="material-symbols-outlined">dashboard</span>
                <p className="text-sm font-bold">Dashboard</p>
             </a>
             <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
                <span className="material-symbols-outlined">history</span>
                <p className="text-sm font-medium">History</p>
             </a>
          </nav>

          <div className="mt-auto border-t border-slate-100 dark:border-slate-800 pt-6">
             <div className="flex items-center gap-3">
                <div className="bg-center bg-cover rounded-full size-10 border-2 border-primary" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80")' }}></div>
                <div className="flex flex-col overflow-hidden">
                   <p className="text-sm font-bold truncate">Isaac Okello</p>
                   <p className="text-slate-500 text-xs truncate">Main Hall Canteen</p>
                </div>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative overflow-y-auto">
        <header className="sticky top-0 z-20 bg-white/80 dark:bg-[#102210]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500">
               <span className="material-symbols-outlined text-lg">home</span>
               <span className="text-sm">/</span>
               <span className="text-sm font-medium text-slate-900 dark:text-white">Daily Totals</span>
            </div>
            <div className="flex items-center gap-4">
               <button className="flex items-center justify-center rounded-full size-10 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
                  <span className="material-symbols-outlined">notifications</span>
               </button>
            </div>
        </header>

        <div className="flex-1 p-6 lg:p-10 max-w-[1400px] mx-auto w-full flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
               <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Daily Summary</h1>
                  <p className="text-slate-500 mt-1 text-sm font-medium flex items-center gap-2">
                     <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                     Oct 24, 2025
                  </p>
               </div>
               <div className="flex gap-3">
                  <button className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-700 dark:text-white px-4 py-2.5 rounded-lg font-bold text-sm shadow-sm">
                     <span className="material-symbols-outlined text-[20px]">print</span>
                     Print
                  </button>
                  <button className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 px-4 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-slate-500/20">
                     <span className="material-symbols-outlined text-[20px]">download</span>
                     Export Report
                  </button>
               </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-[#1a331a] rounded-2xl p-6 border border-green-100 dark:border-green-900 shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-10"><span className="material-symbols-outlined text-9xl text-primary">payments</span></div>
                   <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                      <div className="flex items-center gap-2">
                         <span className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg text-green-700 dark:text-primary"><span className="material-symbols-outlined">payments</span></span>
                         <p className="text-slate-600 dark:text-slate-300 font-bold text-sm uppercase tracking-wide">Total Processed</p>
                      </div>
                      <div>
                         <h3 className="text-4xl font-black tracking-tight">UGX 4,520,000</h3>
                         <p className="text-green-600 dark:text-primary text-sm font-bold mt-1">+12.5% <span className="text-slate-400 font-normal">vs yesterday</span></p>
                      </div>
                   </div>
                </div>

                <div className="bg-white dark:bg-[#152a15] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                   <div className="flex flex-col h-full justify-between gap-4">
                      <div className="flex items-center gap-2">
                         <span className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300"><span className="material-symbols-outlined">receipt_long</span></span>
                         <p className="text-slate-600 dark:text-slate-400 font-bold text-sm uppercase tracking-wide">Transactions</p>
                      </div>
                      <div>
                         <h3 className="text-3xl font-black tracking-tight">124</h3>
                         <p className="text-slate-500 text-sm mt-1">Successful swipes today</p>
                      </div>
                   </div>
                </div>

                <div className="bg-white dark:bg-[#152a15] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                   <div className="flex flex-col h-full justify-between gap-4">
                      <div className="flex items-center gap-2">
                         <span className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300"><span className="material-symbols-outlined">analytics</span></span>
                         <p className="text-slate-600 dark:text-slate-400 font-bold text-sm uppercase tracking-wide">Avg. Value</p>
                      </div>
                      <div>
                         <h3 className="text-3xl font-black tracking-tight">UGX 36,500</h3>
                         <p className="text-slate-500 text-sm mt-1">Per transaction</p>
                      </div>
                   </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-[#152a15] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[400px]">
               <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/20">
                  <h2 className="text-lg font-bold">Today's Ledger</h2>
                  <div className="relative">
                     <input className="pl-10 pr-3 py-2 border-none rounded-xl bg-white dark:bg-slate-800 text-sm font-medium shadow-sm w-64" placeholder="Search..." />
                     <span className="material-symbols-outlined absolute left-3 top-2 text-slate-400 text-sm">search</span>
                  </div>
               </div>
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="border-b border-slate-100 dark:border-slate-800">
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Card No.</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                     {TRANSACTIONS.map((tx) => (
                        <tr key={tx.id} className="hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-colors cursor-pointer">
                           <td className="px-6 py-4 text-sm font-medium">{tx.time}</td>
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                 {tx.student.image ? (
                                     <div className="size-8 rounded-full bg-cover bg-center" style={{ backgroundImage: `url('${tx.student.image}')` }}></div>
                                 ) : (
                                     <div className="size-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">DK</div>
                                 )}
                                 <div className="flex flex-col">
                                    <span className="text-sm font-bold">{tx.student.name}</span>
                                    <span className="text-xs text-slate-500">{tx.student.class}</span>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-4 text-sm text-slate-500 font-mono">**** {tx.cardLast4}</td>
                           <td className="px-6 py-4"><span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${tx.type === 'Withdrawal' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>{tx.type}</span></td>
                           <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${tx.status === 'Success' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-50 text-red-700 border-red-100'}`}>
                                 <span className={`size-1.5 rounded-full ${tx.status === 'Success' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                 {tx.status}
                              </span>
                           </td>
                           <td className={`px-6 py-4 text-sm font-bold text-right ${tx.status === 'Failed' ? 'text-slate-400 line-through' : ''}`}>UGX {tx.amount.toLocaleString()}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
        </div>
      </main>
    </div>
  );
};