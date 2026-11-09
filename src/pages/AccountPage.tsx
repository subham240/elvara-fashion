import React, { useState } from 'react';
import { Package, MapPin, LogOut, CheckCircle, Truck, Shield } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatCurrency } from '../utils/formatCurrency';

export const AccountPage: React.FC = () => {
  const { user, loginUser, logoutUser } = useShop();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'login') {
      loginUser(email || 'aria.sharma@elvara.com', name || 'Aria Sharma');
    } else {
      loginUser(email || 'client@elvara.com', name || 'Valued Client');
    }
  };

  if (user) {
    return (
      <div className="min-h-screen bg-[#F9EDF0] py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Profile */}
          <div className="bg-[#F9EDF0] border border-[#E1A140] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-[#49111C] text-[#F9EDF0] rounded-full flex items-center justify-center font-serif text-2xl font-light">
                {user.name.charAt(0)}
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#E1A140] font-semibold block">
                  ÉLVARA Atelier Member
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl text-[#49111C] font-medium mt-0.5">
                  Welcome, {user.name}
                </h1>
                <p className="text-xs text-[#49111C]/75">{user.email}</p>
              </div>
            </div>

            <button
              onClick={logoutUser}
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#49111C] hover:text-red-700 transition-colors border border-[#E1A140] bg-[#F9EDF0] hover:bg-[#E1A140]/60 px-4 py-2"
            >
              <LogOut size={13} />
              <span>Sign Out</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Orders Section (Cols 8) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center space-x-2 pb-3 border-b border-[#E1A140]">
                <Package size={18} className="text-[#49111C]" />
                <h2 className="font-serif text-xl uppercase tracking-wider text-[#49111C]">
                  Order History & Dispatch Tracking
                </h2>
              </div>

              <div className="space-y-4">
                {user.orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-[#F9EDF0]/45 border border-[#E1A140] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
                  >
                    <div>
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-sm text-[#49111C]">{order.id}</span>
                        <span
                          className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-xs font-medium flex items-center space-x-1 ${
                            order.status === 'Delivered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {order.status === 'Delivered' ? <CheckCircle size={10} className="mr-1" /> : <Truck size={10} className="mr-1" />}
                          <span>{order.status}</span>
                        </span>
                      </div>
                      <p className="text-xs text-[#49111C]/75 mt-1">
                        Ordered on {order.date} • {order.itemsCount} {order.itemsCount === 1 ? 'item' : 'items'}
                      </p>
                    </div>

                    <div className="flex items-center space-x-6 text-right">
                      <span className="font-serif text-base font-semibold text-[#49111C]">
                        {formatCurrency(order.total)}
                      </span>
                      <button className="text-xs uppercase tracking-widest text-[#49111C] underline hover:text-[#E1A140]">
                        View Receipt
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Addresses (Cols 4) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center space-x-2 pb-3 border-b border-[#E1A140]">
                <MapPin size={18} className="text-[#49111C]" />
                <h2 className="font-serif text-xl uppercase tracking-wider text-[#49111C]">
                  Saved Addresses
                </h2>
              </div>

              <div className="space-y-4">
                {user.addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="bg-[#F9EDF0]/45 border border-[#E1A140] p-5 space-y-2 text-xs text-[#49111C]/75 relative shadow-xs"
                  >
                    {addr.isDefault && (
                      <span className="bg-[#49111C] text-[#F9EDF0] text-[9px] uppercase tracking-widest px-2 py-0.5 font-medium absolute top-4 right-4">
                        Default
                      </span>
                    )}
                    <h4 className="font-semibold text-sm text-[#49111C]">{user.name}</h4>
                    <p>{addr.street}</p>
                    <p>{addr.city}, {addr.state} — {addr.postalCode}</p>
                    <p className="text-[#49111C] pt-1">India</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9EDF0] py-16 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-[#F9EDF0]/60 border border-[#E1A140] shadow-xl p-8 sm:p-10">
        <div className="text-center mb-8">
          <span className="font-serif text-3xl tracking-[0.2em] text-[#49111C] uppercase block">
            ÉLVARA
          </span>
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#E1A140] block mt-1">
            Timeless by Design
          </span>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-[#E1A140] mb-6 text-xs uppercase tracking-widest">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 pb-3 text-center transition-colors ${
              activeTab === 'login'
                ? 'font-semibold text-[#49111C] border-b-2 border-[#49111C]'
                : 'text-[#49111C]/75 hover:text-[#49111C]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 pb-3 text-center transition-colors ${
              activeTab === 'register'
                ? 'font-semibold text-[#49111C] border-b-2 border-[#49111C]'
                : 'text-[#49111C]/75 hover:text-[#49111C]'
            }`}
          >
            Register Account
          </button>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {activeTab === 'register' && (
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#49111C]/75 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aria Sharma"
                className="w-full border border-[#E1A140] px-3.5 py-2.5 text-xs text-[#49111C] focus:outline-hidden focus:border-[#49111C]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#49111C]/75 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="client@elvara.com"
              className="w-full border border-[#E1A140] px-3.5 py-2.5 text-xs text-[#49111C] focus:outline-hidden focus:border-[#49111C]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs uppercase tracking-wider text-[#49111C]/75">
                Password
              </label>
              {activeTab === 'login' && (
                <a href="#forgot" className="text-[11px] text-[#E1A140] hover:underline">
                  Forgot?
                </a>
              )}
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full border border-[#E1A140] px-3.5 py-2.5 text-xs text-[#49111C] focus:outline-hidden focus:border-[#49111C]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-[#49111C] text-[#F9EDF0] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#49111C] transition-colors"
            >
              {activeTab === 'login' ? 'Access Account' : 'Create Member Account'}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-[#E1A140]/60 text-center text-[11px] text-[#E1A140] flex items-center justify-center space-x-1.5">
          <Shield size={13} />
          <span>Demo Authentication • Instant Access Available</span>
        </div>
      </div>
    </div>
  );
};
