import React from 'react';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="relative flex h-screen min-h-[800px] w-full flex-col overflow-hidden">
      {/* Top Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e7f3e7] dark:border-[#2a3c2a] px-6 lg:px-10 py-4 bg-white dark:bg-[#152915]">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-[24px]">payments</span>
          </div>
          <h2 className="text-[#0d1b0d] dark:text-white text-xl font-extrabold leading-tight">Student Pesa</h2>
        </div>
        <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary/10 hover:bg-primary/20 text-[#0d1b0d] dark:text-white text-sm font-bold transition-colors">
          <span className="truncate">Need Help?</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-[1200px] h-full max-h-[800px] bg-white dark:bg-[#152915] rounded-xl overflow-hidden shadow-xl border border-[#e7f3e7] dark:border-[#2a3c2a] flex flex-col lg:flex-row">
          
          {/* Left: Form */}
          <div className="flex-1 flex flex-col justify-center px-8 py-12 lg:px-16 xl:px-24 relative z-10">
            <div className="w-full max-w-[480px] mx-auto animate-fade-in">
              <div className="mb-8">
                <h1 className="text-3xl lg:text-4xl font-black leading-tight tracking-tight text-[#0d1b0d] dark:text-white mb-3">
                  Agent Portal
                </h1>
                <p className="text-[#4c9a4c] dark:text-[#8cb88c] text-base font-medium">
                  Welcome back. Please login to access the POS terminal.
                </p>
              </div>

              <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
                <label className="flex flex-col gap-2">
                  <span className="text-[#0d1b0d] dark:text-white text-sm font-bold">Agent ID or Email</span>
                  <div className="relative flex w-full items-center rounded-lg border border-[#cfe7cf] dark:border-[#2a3c2a] bg-[#f8fcf8] dark:bg-[#0d1b0d] h-14 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                    <div className="pl-4 text-[#4c9a4c]">
                      <span className="material-symbols-outlined">badge</span>
                    </div>
                    <input className="flex-1 w-full bg-transparent border-none text-[#0d1b0d] dark:text-white placeholder:text-[#4c9a4c] dark:placeholder:text-[#2f602f] focus:ring-0 px-3 h-full text-base font-medium" placeholder="Enter your Agent ID" type="text" defaultValue="AGT-8821" />
                  </div>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-[#0d1b0d] dark:text-white text-sm font-bold">Password</span>
                  <div className="relative flex w-full items-center rounded-lg border border-[#cfe7cf] dark:border-[#2a3c2a] bg-[#f8fcf8] dark:bg-[#0d1b0d] h-14 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                    <div className="pl-4 text-[#4c9a4c]">
                      <span className="material-symbols-outlined">lock</span>
                    </div>
                    <input className="flex-1 w-full bg-transparent border-none text-[#0d1b0d] dark:text-white placeholder:text-[#4c9a4c] dark:placeholder:text-[#2f602f] focus:ring-0 px-3 h-full text-base font-medium" placeholder="Enter your password" type="password" defaultValue="password123" />
                  </div>
                </label>

                <div className="flex justify-end">
                  <a href="#" className="text-[#4c9a4c] dark:text-primary hover:text-primary text-sm font-semibold hover:underline">
                    Forgot Password?
                  </a>
                </div>

                <button type="submit" className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary hover:bg-[#0fd60f] text-[#0d1b0d] text-base font-bold leading-normal transition-colors shadow-lg shadow-primary/20 mt-2">
                  <span className="mr-2">Access POS Terminal</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-[#e7f3e7] dark:border-[#2a3c2a] flex items-center justify-center gap-2 text-[#4c9a4c] dark:text-[#8cb88c]">
                <span className="material-symbols-outlined text-sm">encrypted</span>
                <span className="text-xs font-medium">Secure SSL Encrypted Connection</span>
              </div>
            </div>
          </div>

          {/* Right: Hero */}
          <div className="hidden lg:flex lg:flex-1 relative bg-cover bg-center overflow-hidden" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=1800&q=80")' }}>
            {/* Reduced opacity overlay so image is clear */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#13ec13]/40 to-[#102210]/60 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-black/5"></div>
            <div className="relative z-10 flex flex-col justify-end p-12 w-full h-full text-white">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-2xl">
                <h3 className="text-2xl font-bold mb-3">Mobile POS Transactions</h3>
                <p className="text-white/95 leading-relaxed font-medium shadow-black drop-shadow-sm">
                  Equip your agents with powerful handheld scanners. 
                  Process student payments anywhere on campus with tap-to-pay speed.
                </p>
                <div className="flex items-center gap-3 mt-6">
                  <div className="flex -space-x-3">
                    {[
                      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=64&h=64",
                      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=64&h=64",
                      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=64&h=64"
                    ].map((url, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 bg-cover" style={{ backgroundImage: `url("${url}")` }}></div>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-white/95 drop-shadow-md">Seamless & Fast</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="flex flex-col gap-4 px-6 py-6 text-center border-t border-[#e7f3e7] dark:border-[#2a3c2a] bg-white dark:bg-[#152915] mt-auto">
        <div className="flex flex-wrap items-center justify-center gap-6 text-[#4c9a4c] dark:text-[#8cb88c]">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Terms of Service</a>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            <span className="text-sm font-medium text-[#0d1b0d] dark:text-white">System Status: Online</span>
          </div>
        </div>
        <p className="text-[#4c9a4c] dark:text-[#5c7a5c] text-sm">© 2025 Student Pesa. Secure Agent Gateway.</p>
      </footer>
    </div>
  );
};