import React, { useState } from 'react';
import { AppState, CartItem, Screen, Student } from './types';
import { LoginScreen } from './screens/LoginScreen';
import { PosScreen } from './screens/PosScreen';
import { IdentifyStudentScreen } from './screens/IdentifyStudentScreen';
import { TransactionResultScreen } from './screens/TransactionResultScreen';
import { DailyTotalsScreen } from './screens/DailyTotalsScreen';

function App() {
  const [state, setState] = useState<AppState>({
    currentScreen: 'LOGIN',
    cart: [],
    currentStudent: null,
    lastTransaction: null
  });

  const navigate = (screen: Screen) => setState(prev => ({ ...prev, currentScreen: screen }));

  const updateCart = (cart: CartItem[]) => setState(prev => ({ ...prev, cart }));

  const calculateTotal = () => state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleTransactionAttempt = (student: Student) => {
    const total = calculateTotal();
    
    // Simulate transaction logic
    if (student.balance >= total) {
      // Success
      setState(prev => ({
        ...prev,
        currentScreen: 'SUCCESS',
        currentStudent: student,
        lastTransaction: {
          id: `TX-${Math.floor(Math.random() * 10000)}`,
          amount: total,
          timestamp: new Date().toISOString(),
          items: prev.cart.length
        },
        cart: [] // Clear cart on success
      }));
    } else {
      // Failed
      setState(prev => ({
        ...prev,
        currentScreen: 'DENIED',
        currentStudent: student
      }));
    }
  };

  const handleLogout = () => {
    setState({
      currentScreen: 'LOGIN',
      cart: [],
      currentStudent: null,
      lastTransaction: null
    });
  };

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'LOGIN':
        return <LoginScreen onLogin={() => navigate('POS')} />;
      
      case 'POS':
        return <PosScreen 
          onNavigate={(screen) => {
            if (screen === 'LOGIN') {
              handleLogout();
            } else {
              navigate(screen);
            }
          }} 
          cart={state.cart} 
          onUpdateCart={updateCart} 
        />;
      
      case 'IDENTIFY':
        return <IdentifyStudentScreen 
          total={calculateTotal()} 
          cart={state.cart}
          onCancel={() => navigate('POS')}
          onConfirm={handleTransactionAttempt}
        />;
      
      case 'SUCCESS':
        return <TransactionResultScreen 
          status="SUCCESS"
          amount={state.lastTransaction?.amount || 0}
          student={state.currentStudent!}
          onNewTransaction={() => {
            setState(prev => ({ ...prev, currentStudent: null, lastTransaction: null }));
            navigate('POS');
          }}
          onRetry={() => {}} // Not applicable for success
        />;

      case 'DENIED':
        return <TransactionResultScreen 
          status="DENIED"
          amount={calculateTotal()}
          student={state.currentStudent!}
          onNewTransaction={() => {
             setState(prev => ({ ...prev, currentStudent: null }));
             navigate('POS');
          }}
          onRetry={() => navigate('IDENTIFY')}
        />;

      case 'TOTALS':
        return <DailyTotalsScreen onBack={() => navigate('POS')} />;
        
      default:
        return <LoginScreen onLogin={() => navigate('POS')} />;
    }
  };

  return (
    <div className="antialiased text-gray-900">
      {renderScreen()}
    </div>
  );
}

export default App;