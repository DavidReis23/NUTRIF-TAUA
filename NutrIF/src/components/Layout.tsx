
import React, { useState } from 'react';
import { Menu, Home, MessageCircle, UtensilsCrossed, Bell, User as UserIcon, X, ChevronRight, LogOut, Info, QrCode, AlertTriangle } from 'lucide-react';
import { CURRENT_USER } from '../shared/constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onNavigate: (path: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, onNavigate }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navItems = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'faqs', icon: MessageCircle, label: 'FAQs' },
    { id: 'menu', icon: UtensilsCrossed, label: 'Cardápio' },
    { id: 'notifications', icon: Bell, label: 'Avisos' },
    { id: 'profile', icon: UserIcon, label: 'Perfil' },
  ];

  const drawerLinks = [
    { id: 'profile', icon: UserIcon, label: 'Meu Perfil' },
    { id: 'qr-code', icon: QrCode, label: 'Meu QR Code' },
    { id: 'alerts', icon: AlertTriangle, label: 'Alertas e Faltas' },
    { id: 'notifications', icon: Bell, label: 'Notificações' },
    { id: 'my-meals', icon: UtensilsCrossed, label: 'Minhas Refeições' },
    { id: 'menu', icon: UtensilsCrossed, label: 'Cardápio Semanal' },
    { id: 'all-meals', icon: Info, label: 'Próximas Refeições' },
    { id: 'faqs', icon: MessageCircle, label: 'FAQs' },
  ];

  const handleDrawerNavigate = (id: string) => {
    if (id === 'qr-code') {
      onNavigate('profile');
    } else {
      onNavigate(id);
    }
    setIsDrawerOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto relative overflow-hidden shadow-2xl">
      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[105] transition-opacity"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`fixed inset-y-0 left-0 w-80 bg-white z-[106] transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 bg-green-600 text-white">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold">SISREF</h2>
              <p className="text-sm opacity-80">IFCE TAUÁ</p>
            </div>
            <button onClick={() => setIsDrawerOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <img src={CURRENT_USER.photoUrl} alt="User" className="w-16 h-16 rounded-full border-2 border-white/50" />
            <div>
              <p className="font-semibold text-lg">{CURRENT_USER.name}</p>
              <p className="text-xs opacity-80">Aluno(a)</p>
            </div>
          </div>

          <button 
            onClick={() => handleDrawerNavigate('qr-code')}
            className="w-full bg-white/20 hover:bg-white/30 transition-colors py-3 rounded-xl flex items-center justify-center gap-3 border border-white/20"
          >
            <QrCode className="w-5 h-5" />
            <span className="font-medium text-sm">Abrir QR Code</span>
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-250px)] hide-scrollbar">
          {drawerLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleDrawerNavigate(item.id)}
              className={`flex items-center w-full gap-4 p-3 rounded-xl transition-colors ${
                activeTab === item.id ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-green-600' : 'text-gray-400'}`} />
              <span className="font-bold text-sm">{item.label}</span>
            </button>
          ))}
          <hr className="my-4 border-gray-100" />
          <button className="flex items-center w-full gap-4 p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-bold text-sm">Sair da Conta</span>
          </button>
        </nav>
      </div>

      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-40 border-b border-gray-100">
        <button onClick={() => setIsDrawerOpen(true)} className="p-2 -ml-2">
          <Menu className="w-6 h-6 text-green-700" />
        </button>
        <h1 className="text-xl font-bold text-green-700 flex-1 text-center">SISREF-TAUÁ</h1>
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold border-2 border-green-200">
          {CURRENT_USER.name.charAt(0)}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto hide-scrollbar">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-[360px] bg-white/80 backdrop-blur-md border border-white shadow-xl rounded-full px-4 py-2 flex justify-between items-center z-50">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`p-3 rounded-full transition-all duration-300 ${
                isActive ? 'bg-green-600 text-white scale-110' : 'text-gray-400 hover:text-green-600'
              }`}
            >
              <item.icon className="w-6 h-6" />
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
