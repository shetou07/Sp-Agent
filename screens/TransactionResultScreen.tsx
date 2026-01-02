import React from 'react';
import { Student } from '../types';

interface ResultScreenProps {
  status: 'SUCCESS' | 'DENIED';
  amount: number;
  student: Student;
  onNewTransaction: () => void;
  onRetry: () => void;
}

export const TransactionResultScreen: React.FC<ResultScreenProps> = ({ status, amount, student, onNewTransaction, onRetry }) => {
  const isSuccess = status === 'SUCCESS';

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-gray-100 min-h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-background-dark px-6 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="size-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
            <span className="material-symbols-outlined">point_of_sale</span>
          </div>
          <h2 className="text-lg font-bold">Student Pesa</h2>
        </div>
        <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block">
               <p className="text-sm font-bold">Sarah Nambozo</p>
               <p className="text-xs text-gray-500">ID: Agt-402</p>
             </div>
             <div className="bg-center bg-cover rounded-full size-10 border-2 border-primary" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80")' }}></div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md flex flex-col gap-6 animate-fade-in">
          
          {/* Status Icon */}
          <div className="text-center space-y-2">
            <div className={`inline-flex items-center justify-center size-24 rounded-full mb-4 ring-8 ${isSuccess ? 'bg-primary/20 text-primary ring-primary/5' : 'bg-red-100 text-red-600 ring-red-50 dark:bg-red-900/20 dark:text-red-400 dark:ring-red-900/10'}`}>
              <span className="material-symbols-outlined text-6xl">{isSuccess ? 'check_circle' : 'block'}</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">{isSuccess ? 'Payment Received!' : 'Transaction Denied'}</h1>
            <p className={`font-bold text-lg flex items-center justify-center gap-2 ${isSuccess ? 'text-gray-500 dark:text-gray-400' : 'text-red-600 dark:text-red-400'}`}>
              {isSuccess ? 'Transaction completed successfully.' : (
                <>
                  <span className="material-symbols-outlined text-xl">error</span>
                  Reason: Insufficient Balance
                </>
              )}
            </p>
          </div>

          {/* Receipt/Details Card */}
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden relative">
            {isSuccess && <div className="h-1.5 w-full bg-primary"></div>}
            
            <div className="p-6 sm:p-8">
              {isSuccess && (
                <div className="text-center mb-8 pb-8 border-b border-dashed border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Total Deducted</p>
                  <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">UGX {amount.toLocaleString()}</h2>
                </div>
              )}
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 pb-4 border-b border-dashed border-gray-200 dark:border-gray-700">
                   <div className="bg-center bg-cover rounded-full size-12 shadow-inner" style={{ backgroundImage: `url('${student.image}')` }}></div>
                   <div className="flex-1">
                      <p className="text-base font-bold text-gray-900 dark:text-white">{student.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Class {student.class} • ID: {student.id}</p>
                   </div>
                </div>

                {!isSuccess && (
                  <div className="space-y-2">
                     <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Attempted Amount</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">UGX {amount.toLocaleString()}</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Current Balance</span>
                        <span className="text-sm font-bold text-red-600">UGX {student.balance.toLocaleString()}</span>
                     </div>
                  </div>
                )}

                {isSuccess && (
                    <>
                    <div className="flex justify-between items-center gap-4">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date & Time</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white text-right">Oct 24, 2025 • 12:45 PM</p>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Ref. No</p>
                        <p className="text-sm font-mono font-medium text-gray-900 dark:text-white text-right tracking-tight">#{student.id}-TX</p>
                    </div>
                    </>
                )}
              </div>

              {isSuccess && (
                <div className="mt-8 p-4 bg-background-light dark:bg-background-dark rounded-xl flex justify-between items-center border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-lg">account_balance_wallet</span>
                    <p className="text-sm font-bold text-green-700 dark:text-green-400">Remaining Balance</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">UGX {(student.balance - amount).toLocaleString()}</p>
                </div>
              )}
            </div>
            
            {/* Cutouts for receipt look */}
            <div className="absolute top-[138px] -left-3 size-6 rounded-full bg-background-light dark:bg-background-dark"></div>
            <div className="absolute top-[138px] -right-3 size-6 rounded-full bg-background-light dark:bg-background-dark"></div>
          </div>

          {/* Action Buttons */}
          {isSuccess ? (
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <button onClick={onNewTransaction} className="group flex-1 h-12 bg-primary hover:bg-[#0fd60f] active:scale-[0.98] transition-all rounded-xl text-background-dark font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/25">
                    <span className="material-symbols-outlined group-hover:animate-pulse">add_circle</span>
                    New Transaction
                </button>
                <button className="flex-1 h-12 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-200 font-bold text-sm flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">print</span>
                    Print
                </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
                 <button className="w-full h-12 flex items-center justify-center gap-2 bg-primary hover:bg-[#0fd60f] text-[#0d1b0d] rounded-lg font-bold text-base shadow-sm">
                    <span className="material-symbols-outlined">add_card</span>
                    Load Funds
                </button>
                <div className="flex gap-3">
                    <button onClick={onRetry} className="flex-1 h-12 flex items-center justify-center gap-2 bg-white dark:bg-[#162616] hover:bg-gray-50 border border-[#e7f3e7] dark:border-[#2a402a] text-[#0d1b0d] dark:text-white rounded-lg font-bold text-sm">
                        <span className="material-symbols-outlined">refresh</span>
                        Retry
                    </button>
                    <button onClick={onNewTransaction} className="flex-1 h-12 flex items-center justify-center gap-2 bg-white dark:bg-[#162616] hover:bg-red-50 border border-[#e7f3e7] dark:border-[#2a402a] text-red-600 rounded-lg font-bold text-sm">
                        <span className="material-symbols-outlined">close</span>
                        Cancel
                    </button>
                </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};