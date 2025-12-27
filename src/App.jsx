import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, Scan, ShoppingBag, Users, PlusCircle, Languages, Briefcase, Settings, Target, TrendingUp, AlertTriangle, Lightbulb, Mic, MessageSquare } from 'lucide-react';
import { LanguageProvider, useLanguage } from './LanguageContext';
import './index.css';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';

const salesData = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

const revenueExpenseData = [
  { name: 'Mon', revenue: 4000, expense: 2400 },
  { name: 'Tue', revenue: 3000, expense: 1398 },
  { name: 'Wed', revenue: 2000, expense: 9800 },
  { name: 'Thu', revenue: 2780, expense: 3908 },
  { name: 'Fri', revenue: 1890, expense: 4800 },
  { name: 'Sat', revenue: 2390, expense: 3800 },
  { name: 'Sun', revenue: 3490, expense: 4300 },
];

const inventoryData = [
  { name: 'Electronics', value: 400 },
  { name: 'Groceries', value: 300 },
  { name: 'Home', value: 300 },
  { name: 'Others', value: 200 },
];

const COLORS = ['#6366f1', '#06b6d4', '#f43f5e', '#fbbf24'];

const Dashboard = () => {
  const { t } = useLanguage();
  return (
    <div className="animate-fade-in dashboard-grid" style={{ paddingBottom: '2rem' }}>
      {/* Hero Welcome */}
      <div className="card glass vibrant-gradient" style={{ color: 'white', border: 'none', gridColumn: '1 / -1' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{t('welcome')}</h2>
            <p>{t('growingBusiness')}</p>
          </div>
          <button className="btn" style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '50%', width: '3rem', height: '3rem', padding: 0 }}>
            <Mic size={24} color="white" />
          </button>
        </div>
      </div>

      {/* Primary Chart: Daily Sales */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <TrendingUp size={20} color="var(--primary)" />
          <h3>{t('dailySales')}</h3>
        </div>
        <div style={{ height: '200px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
              <Line type="monotone" dataKey="sales" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, fill: 'var(--primary)' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comparison: Revenue vs Expense */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Target size={20} color="var(--secondary)" />
          <h3>{t('revenue')} vs {t('expense')}</h3>
        </div>
        <div style={{ height: '200px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueExpenseData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="revenue" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" fill="var(--accent)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Inventory Visual */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <AlertTriangle size={20} color="#fbbf24" />
          <h3>{t('inventory')}</h3>
        </div>
        <div style={{ height: '200px', display: 'flex', justifyContent: 'center' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={inventoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {inventoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="card" style={{ gridColumn: '1 / -1', border: '1px solid var(--primary-glow)', background: 'rgba(99, 102, 241, 0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Lightbulb size={24} color="var(--primary)" />
          <h3 style={{ color: 'var(--primary)' }}>{t('insightHeader')}</h3>
        </div>
        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6', fontWeight: 500 }}>
          {t('aiSummary')}
        </p>

        <h4 style={{ marginBottom: '1rem' }}>{t('actionPoints')}</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <span style={{ background: 'var(--muted)', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0 }}>{i}</span>
              <p style={{ fontSize: '0.9rem' }}>{t(`action${i}`)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Scanner = () => {
  const { t } = useLanguage();
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState(null);

  const startScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setResults({
        type: 'Sale',
        amount: '₹ 1,200',
        items: ['Rice 5kg', 'Dal 1kg'],
        date: '27 Dec 2025'
      });
    }, 2000);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '1.5rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>{t('scanner')}</h2>

      {!results && !scanning && (
        <div className="card" style={{ borderStyle: 'dashed', textAlign: 'center', padding: '4rem 2rem', background: 'var(--muted)' }}>
          <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 1.5rem' }}>
            <Scan size={80} style={{ color: 'var(--primary)' }} />
            <div className="vibrant-gradient" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', animation: 'scanLine 2s infinite linear' }}></div>
          </div>
          <p style={{ marginBottom: '1.5rem', color: 'var(--muted-foreground)' }}>{t('scanInfo')}</p>
          <button className="btn btn-primary" onClick={startScan} style={{ width: '100%', maxWidth: '300px' }}>
            {t('scanner')}
          </button>
        </div>
      )}

      {scanning && (
        <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div className="loader" style={{ margin: '0 auto 1rem' }}></div>
          <p>{t('sorting')}</p>
        </div>
      )}

      {results && (
        <div className="animate-fade-in">
          <div className="card" style={{ border: '2px solid var(--primary)', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span className="vibrant-gradient" style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', color: 'white', fontSize: '0.75rem', fontWeight: 'bold' }}>
                {t(results.type.toLowerCase())}
              </span>
              <span style={{ color: 'var(--muted-foreground)', fontSize: '0.8rem' }}>{results.date}</span>
            </div>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{results.amount}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {results.items.map(item => (
                <span key={item} style={{ background: 'var(--muted)', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem' }}>{item}</span>
              ))}
            </div>
          </div>
          <button className="btn btn-ghost" onClick={() => setResults(null)} style={{ width: '100%' }}>Scan Another</button>
        </div>
      )}

      <style>{`
        @keyframes scanLine {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .loader {
          width: 48px;
          height: 48px;
          border: 5px solid var(--muted);
          border-bottom-color: var(--primary);
          border-radius: 50%;
          display: inline-block;
          animation: rotation 1s linear infinite;
        }
        @keyframes rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const Catalog = () => {
  const { t } = useLanguage();
  const products = [
    { id: 1, name: 'Premium Basmati Rice', price: '₹ 110/kg', stock: '45 kg', image: '🌾' },
    { id: 2, name: 'Toor Dal (Pigeon Peas)', price: '₹ 160/kg', stock: '20 kg', image: '🫘' },
    { id: 3, name: 'Sunflower Oil 1L', price: '₹ 145', stock: '12 units', image: '🌻' },
    { id: 4, name: 'Amul Butter 100g', price: '₹ 56', stock: '8 units', image: '🧈' },
  ];

  return (
    <div className="animate-fade-in" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>{t('catalog')}</h2>
        <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}><PlusCircle size={18} style={{ marginRight: '0.5rem' }} /> {t('addOrder')}</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {products.map(p => (
          <div key={p.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
            <div style={{ width: '60px', height: '60px', background: 'var(--muted)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
              {p.image}
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ marginBottom: '0.25rem' }}>{p.name}</h4>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--muted-foreground)' }}>
                <span>{t('price')}: <b style={{ color: 'var(--foreground)' }}>{p.price}</b></span>
                <span>{t('stock')}: <b style={{ color: 'var(--foreground)' }}>{p.stock}</b></span>
              </div>
            </div>
            <button className="btn btn-ghost" style={{ padding: '0.5rem' }}><PlusCircle size={20} color="var(--primary)" /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

const CRM = () => {
  const { t } = useLanguage();
  const customers = [
    { id: 1, name: 'Rajesh Kumar', phone: '98765 43210', lastOrder: '2 days ago', total: '₹ 4,500' },
    { id: 2, name: 'Anita Sharma', phone: '91234 56789', lastOrder: 'Today', total: '₹ 1,200' },
    { id: 3, name: 'Sunil Verma', phone: '99887 76655', lastOrder: '1 week ago', total: '₹ 8,900' },
  ];

  return (
    <div className="animate-fade-in" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>{t('crm')}</h2>
        <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>{t('addCustomer')}</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {customers.map(c => (
          <div key={c.id} className="card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem' }}>{c.name}</h4>
                <p style={{ color: 'var(--muted-foreground)', fontSize: '0.85rem' }}>{c.phone}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{c.total}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>{t('lastOrder')}: {c.lastOrder}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-ghost" style={{ flex: 1, fontSize: '0.8rem', padding: '0.5rem' }}>Call</button>
              <button className="btn btn-ghost" style={{ flex: 1, fontSize: '0.8rem', padding: '0.5rem' }}>History</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const initialProducts = [
  { id: 1, name: 'Premium Basmati Rice', price: 110, stock: 45, image: '🌾', category: 'Grains' },
  { id: 2, name: 'Toor Dal (Pigeon Peas)', price: 160, stock: 20, image: '🫘', category: 'Pulses' },
  { id: 3, name: 'Sunflower Oil 1L', price: 145, stock: 12, image: '🌻', category: 'Oil' },
  { id: 4, name: 'Amul Butter 100g', price: 56, stock: 8, image: '🧈', category: 'Dairy' },
];

const Store = ({ products, addToCart }) => {
  const { t } = useLanguage();
  return (
    <div className="animate-fade-in" style={{ padding: '1.5rem' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>{t('store')}</h2>
      <div className="dashboard-grid">
        {products.map(p => (
          <div key={p.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', background: 'var(--muted)', borderRadius: '16px', padding: '1rem' }}>{p.image}</div>
            <h4 style={{ margin: 0 }}>{p.name}</h4>
            <p style={{ color: 'var(--primary)', fontWeight: 'bold', margin: '0.5rem 0' }}>₹ {p.price}</p>
            <button className="btn btn-primary" onClick={() => addToCart(p)} style={{ width: '100%' }}>
              {t('addToCart')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Inventory = ({ products, updateStock }) => {
  const { t } = useLanguage();
  return (
    <div className="animate-fade-in" style={{ padding: '1.5rem' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>{t('inventory')}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {products.map(p => (
          <div key={p.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
            <div style={{ fontSize: '1.5rem' }}>{p.image}</div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0 }}>{p.name}</h4>
              <p style={{ fontSize: '0.85rem', color: p.stock < 10 ? 'var(--accent)' : 'var(--muted-foreground)' }}>
                {t('stock')}: <b>{p.stock}</b> {p.stock < 10 && `(${t('lowStockAlert')})`}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-ghost" onClick={() => updateStock(p.id, -1)} style={{ padding: '0.25rem 0.5rem' }}>-</button>
              <button className="btn btn-ghost" onClick={() => updateStock(p.id, 1)} style={{ padding: '0.25rem 0.5rem' }}>+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const InvoiceGenerator = ({ cart, clearCart }) => {
  const { t } = useLanguage();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [template, setTemplate] = useState("modern");
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const shareOnWhatsapp = () => {
    const itemsText = cart.map(i => `${i.name} x ${i.quantity} = ₹${i.price * i.quantity}`).join('%0A');
    const text = `*Tax Invoice*%0A*Customer:* ${customerName || 'Valued Customer'}%0A%0A*Items:*%0A${itemsText}%0A%0A*Total: ₹ ${total}*%0A%0A_Generated via Sudarshan AI_`;
    const url = `https://wa.me/${customerPhone.replace(/\D/g, '')}?text=${text}`;
    window.open(url, '_blank');
  };

  const printInvoice = () => {
    window.print();
  };

  if (cart.length === 0) {
    return (
      <div className="animate-fade-in" style={{ padding: '1.5rem', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>{t('invoice')}</h2>
        <div className="card" style={{ padding: '4rem 2rem', background: 'var(--muted)' }}>
          <ShoppingBag size={48} style={{ color: 'var(--muted-foreground)', marginBottom: '1rem' }} />
          <p>{t('scanInfo')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>{t('invoice')}</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className={`btn ${template === 'modern' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setTemplate('modern')} style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}>{t('modern')}</button>
          <button className={`btn ${template === 'classic' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setTemplate('classic')} style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}>{t('classic')}</button>
          <button className={`btn ${template === 'thermal' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setTemplate('thermal')} style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}>{t('thermal')}</button>
        </div>
      </div>

      <div className={`card invoice-container ${template}`} style={{ padding: template === 'thermal' ? '1rem' : '2rem', border: '1px solid var(--border)', background: 'white', maxWidth: template === 'thermal' ? '300px' : 'none', margin: template === 'thermal' ? '0 auto' : '0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', flexDirection: template === 'thermal' ? 'column' : 'row', textAlign: template === 'thermal' ? 'center' : 'left' }}>
          <div>
            <h3 style={{ color: template === 'classic' ? 'black' : 'var(--primary)', marginBottom: '0.5rem' }}>SUDARSHAN AI STORE</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)' }}>G-24, Tech Park, Bangalore</p>
          </div>
          <div style={{ textAlign: template === 'thermal' ? 'center' : 'right', marginTop: template === 'thermal' ? '1rem' : '0' }}>
            <h2 style={{ margin: 0, color: 'var(--muted-foreground)', fontSize: '1.2rem' }}>{t('invoiceHeader')}</h2>
            <p style={{ fontSize: '0.85rem' }}>#INV-{Math.floor(Math.random() * 9000) + 1000}</p>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: template === 'thermal' ? '1fr' : '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem', fontWeight: 'bold' }}>{t('billTo')}:</label>
              <input
                type="text"
                placeholder="Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem', fontWeight: 'bold' }}>{t('phone')}:</label>
              <input
                type="text"
                placeholder="WhatsApp Number"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border)' }}
              />
            </div>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem', fontSize: template === 'thermal' ? '0.8rem' : '1rem' }}>
          <thead>
            <tr style={{ borderBottom: template === 'classic' ? '2px solid black' : '2px solid var(--border)' }}>
              <th style={{ textAlign: 'left', padding: '0.5rem 0' }}>{t('item')}</th>
              <th style={{ textAlign: 'center', padding: '0.5rem 0' }}>{t('quantity')}</th>
              <th style={{ textAlign: 'right', padding: '0.5rem 0' }}>{t('total')}</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--border)', borderStyle: template === 'thermal' ? 'dashed' : 'solid' }}>
                <td style={{ padding: '0.75rem 0' }}>{item.name}</td>
                <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                <td style={{ textAlign: 'right' }}>₹ {item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ textAlign: 'right', borderTop: template === 'classic' ? '2px solid black' : '2px solid var(--primary)', paddingTop: '1rem' }}>
          <h3 style={{ margin: 0 }}>{t('total')}: <span style={{ color: template === 'classic' ? 'black' : 'var(--primary)' }}>₹ {total}</span></h3>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
        <button className="btn btn-primary" onClick={shareOnWhatsapp} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <Mic size={18} /> {t('shareWhatsapp')}
        </button>
        <button className="btn btn-ghost" onClick={printInvoice} style={{ border: '1px solid var(--border)' }}>
          {t('printThermal')}
        </button>
      </div>

      <button className="btn btn-primary" onClick={() => { alert("Invoice Saved!"); clearCart(); }} style={{ width: '100%', marginTop: '1rem', background: 'var(--accent)' }}>
        {t('generateInvoice')}
      </button>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          .invoice-container, .invoice-container * { visibility: visible; }
          .invoice-container { position: absolute; left: 0; top: 0; width: 100%; border: none !important; }
          .bottom-nav, header, .btn, input { display: none !important; }
        }
        .classic { font-family: 'Times New Roman', serif; color: black; }
        .thermal { font-family: 'Courier New', monospace; width: 80mm; background: #fff; }
      `}</style>
    </div>
  );
};

const Services = () => {
  const { t } = useLanguage();
  const schemes = [
    { title: "PMEGP", desc: "Prime Minister's Employment Generation Programme - Up to 35% subsidy.", link: "https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp" },
    { title: "Mudra Loan", desc: "Collateral free loans up to ₹10 Lakhs for small businesses.", link: "https://www.mudra.org.in/" },
    { title: "CGTMSE", desc: "Credit Guarantee Fund Trust for Micro and Small Enterprises.", link: "https://www.cgtmse.in/" },
  ];

  return (
    <div className="animate-fade-in" style={{ padding: '1.5rem' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>{t('empowerment')}</h2>

      <div className="card vibrant-gradient" style={{ color: 'white', marginBottom: '2rem', textAlign: 'center', border: 'none' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{t('udyamReg')}</h3>
        <p style={{ opacity: 0.9, marginBottom: '1rem' }}>{t('free')} - Official Government Portal</p>
        <a href="https://udyamregistration.gov.in/" target="_blank" rel="noreferrer" className="btn" style={{ background: 'white', color: 'var(--primary)', fontWeight: 'bold' }}>
          {t('learnMore')}
        </a>
      </div>

      <h3 style={{ marginBottom: '1rem' }}>{t('govtSchemes')}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {schemes.map((s, i) => (
          <div key={i} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <h4 style={{ color: 'var(--primary)', marginBottom: '0.25rem' }}>{s.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)' }}>{s.desc}</p>
            </div>
            <a href={s.link} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>{t('learnMore')}</a>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: '2rem', border: '1px solid var(--primary-glow)', background: 'rgba(99, 102, 241, 0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <Lightbulb size={24} color="var(--primary)" />
          <h3>{t('aiTasks')}</h3>
        </div>
        <ul style={{ fontSize: '0.9rem', color: 'var(--foreground)', paddingLeft: '1.2rem', lineHeight: '1.6' }}>
          <li><b>Sales Analysis:</b> Predicts next week's stock needs.</li>
          <li><b>Voice Commands:</b> "Tell me yesterday's profit" in Hindi/English.</li>
          <li><b>OCR Scan:</b> Extracts data from handwritten bills instantly.</li>
          <li><b>Customer Insights:</b> Identifies top 10% customers for loyalty offers.</li>
        </ul>
      </div>
    </div>
  );
};

const UserInfoModal = ({ onSave }) => {
  const { t } = useLanguage();
  const [data, setData] = useState({ bizName: '', ownerName: '', bizType: '', city: '' });

  const handleSave = () => {
    if (data.bizName && data.ownerName) {
      localStorage.setItem('sudarshan_biz_profile', JSON.stringify(data));
      onSave(data);
    } else {
      alert("Please fill name and business name.");
    }
  };

  return (
    <div className="glass" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '450px', background: 'white', padding: '2rem', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
        <h2 style={{ marginBottom: '0.5rem', color: 'var(--primary)' }}>{t('setupProfile')}</h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)', marginBottom: '1.5rem' }}>{t('setupDesc')}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 'bold' }}>{t('bizName')}</label>
            <input
              type="text"
              placeholder="e.g. Rahul Kirana Store"
              value={data.bizName}
              onChange={e => setData({ ...data, bizName: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 'bold' }}>{t('ownerName')}</label>
            <input
              type="text"
              placeholder="e.g. Rahul Kumar"
              value={data.ownerName}
              onChange={e => setData({ ...data, ownerName: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 'bold' }}>{t('bizType')}</label>
              <input
                type="text"
                placeholder="e.g. Groceries"
                value={data.bizType}
                onChange={e => setData({ ...data, bizType: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 'bold' }}>{t('city')}</label>
              <input
                type="text"
                placeholder="e.g. Delhi"
                value={data.city}
                onChange={e => setData({ ...data, city: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}
              />
            </div>
          </div>
        </div>

        <button className="btn btn-primary vibrant-gradient" onClick={handleSave} style={{ width: '100%', marginTop: '2rem', padding: '1rem', height: 'auto', fontSize: '1rem' }}>
          {t('saveProfile')}
        </button>
      </div>
    </div>
  );
};

const ChatAgent = ({ isOpen, onClose }) => {
  const { t, lang } = useLanguage();
  const [messages, setMessages] = useState([{ role: 'ai', text: t('aiGreeting') }]);
  const [input, setInput] = useState('');
  const profile = JSON.parse(localStorage.getItem('sudarshan_biz_profile') || "null");

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const newMsgs = [...messages, { role: 'user', text }];
    setMessages(newMsgs);
    setInput('');

    // Simulated AI response logic
    setTimeout(() => {
      let aiResponse = "";
      const lowerText = text.toLowerCase();
      if (lowerText.includes('sale') || lowerText.includes('बिक्री')) {
        aiResponse = lang === 'hi' ? "आपकी कल की बिक्री ₹4,500 थी। यह पिछले सप्ताह से 10% अधिक है।" : "Your sales yesterday were ₹4,500. This is 10% higher than last week.";
      } else if (lowerText.includes('stock') || lowerText.includes('माल')) {
        aiResponse = lang === 'hi' ? "दूध और ब्रेड का स्टॉक कम (10 से नीचे) है।" : "Milk and Bread are low in stock (below 10).";
      } else {
        const name = profile ? profile.ownerName : "";
        aiResponse = lang === 'hi' ? `जी ${name}, मैं आपके व्यापार को बढ़ाने में मदद कर सकता हूँ। आप मुझसे बिक्री या स्टॉक के बारे में पूछ सकते हैं।` : `Sure ${name}, I can help you grow your business. You can ask me about sales or stock.`;
      }
      setMessages([...newMsgs, { role: 'ai', text: aiResponse }]);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="glass" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2500, display: 'flex', flexDirection: 'column', background: 'var(--background)' }}>
      <header style={{ padding: '1rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white' }}>
        <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div className="vibrant-gradient" style={{ width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <Target size={18} />
          </div>
          {t('chatWithAi')}
        </h3>
        <button onClick={onClose} className="btn btn-ghost" style={{ padding: '0.5rem' }}>✕</button>
      </header>

      <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
            <div style={{ padding: '0.75rem 1rem', borderRadius: '15px', background: m.role === 'user' ? 'var(--primary)' : 'var(--muted)', color: m.role === 'user' ? 'white' : 'var(--foreground)', fontSize: '0.9rem', borderTopRightRadius: m.role === 'user' ? '0' : '15px', borderTopLeftRadius: m.role === 'ai' ? '0' : '15px' }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '1rem', borderTop: '1px solid var(--border)', background: 'white' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {[t('suggestSales'), t('suggestStock'), t('suggestAdd')].map(s => (
            <button key={s} onClick={() => sendMessage(s)} className="btn btn-ghost" style={{ fontSize: '0.75rem', whiteSpace: 'nowrap', border: '1px solid var(--border)', borderRadius: '20px' }}>{s}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            placeholder={t('typeMessage')}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && sendMessage(input)}
            style={{ flex: 1, padding: '0.75rem', borderRadius: '25px', border: '1px solid var(--border)' }}
          />
          <button onClick={() => sendMessage(input)} className="btn btn-primary vibrant-gradient" style={{ width: '40px', height: '40px', borderRadius: '50%', padding: 0 }}>
            <TrendingUp size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const VoiceAssistant = () => {
  const { t, lang } = useLanguage();
  const [active, setActive] = useState(false);
  const [response, setResponse] = useState("");
  const profile = JSON.parse(localStorage.getItem('sudarshan_biz_profile') || "null");

  const handleVoice = () => {
    setActive(true);
    setResponse("");
    setTimeout(() => {
      setActive(false);
      const namePrefix = profile ? (lang === 'hi' ? `नमस्ते ${profile.ownerName} जी! ` : `Hello ${profile.ownerName}! `) : (lang === 'hi' ? "नमस्ते! " : "Hello! ");
      setResponse(lang === 'hi'
        ? `${namePrefix}कल आपकी बिक्री बढ़िया रही। आपको आज अपने स्टाल पर नई वस्तुओं को जोड़ना चाहिए।`
        : `${namePrefix}Your sales were great yesterday. You should add new items to your stock today.`
      );
    }, 3000);
  };

  return (
    <>
      <button
        className="btn vibrant-gradient"
        onClick={handleVoice}
        style={{
          position: 'fixed',
          bottom: '5.5rem',
          right: '1.5rem',
          width: '3.5rem',
          height: '3.5rem',
          borderRadius: '50%',
          boxShadow: '0 4px 12px var(--primary-glow)',
          color: 'white',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Mic size={24} className={active ? 'pulse' : ''} />
      </button>

      {active && (
        <div className="glass" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'white' }}>
          <div className="pulse-big" style={{ background: 'var(--primary)', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Mic size={48} />
          </div>
          <p style={{ color: 'var(--foreground)', fontSize: '1.2rem', fontWeight: 'bold' }}>{lang === 'hi' ? 'सुन रहा हूँ...' : 'Listening...'}</p>
        </div>
      )}

      {response && (
        <div className="animate-fade-in card glass" style={{ position: 'fixed', bottom: '10rem', left: '1rem', right: '1rem', zIndex: 101, border: '1px solid var(--primary)' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div className="vibrant-gradient" style={{ width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Mic size={20} />
            </div>
            <div>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>{response}</p>
              <button className="btn btn-ghost" onClick={() => setResponse("")} style={{ padding: '0.25rem 0', fontSize: '0.8rem', color: 'var(--primary)' }}>Dismiss</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .pulse { animation: pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite; }
        @keyframes pulse-ring {
          0% { transform: scale(.95); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
          100% { transform: scale(.95); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
        }
        .pulse-big { animation: pulse-big 2s infinite; }
        @keyframes pulse-big {
          0% { transform: scale(1); box-shadow: 0 0 0 0 var(--primary-glow); }
          70% { transform: scale(1.1); box-shadow: 0 0 0 20px rgba(99, 102, 241, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
        }
      `}</style>
    </>
  );
};

const Nav = ({ products, addToCart, updateStock, cart, clearCart, cartCount }) => {
  const { t, lang, setLang } = useLanguage();
  const [showSettings, setShowSettings] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || "");

  const saveKey = () => {
    localStorage.setItem('gemini_api_key', apiKey);
    setShowSettings(false);
    alert("API Key Saved!");
  };

  return (
    <>
      <header style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
        <h1 style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>Sudarshan AI</h1>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button className="btn btn-ghost" onClick={() => setIsChatOpen(true)} style={{ padding: '0.5rem', color: 'var(--primary)' }}>
            <MessageSquare size={20} />
          </button>
          <button className="btn btn-ghost" onClick={() => setShowSettings(true)} style={{ padding: '0.5rem' }}>
            <Settings size={20} />
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            style={{ gap: '0.5rem' }}
          >
            <Languages size={20} />
            {lang === 'en' ? 'हिन्दी' : 'English'}
          </button>
        </div>
      </header>

      {showSettings && (
        <div className="glass" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: '400px', background: 'white' }}>
            <h3 style={{ marginBottom: '1rem' }}>{t('geminiSettings')}</h3>
            <p style={{ fontSize: '0.85rem', marginBottom: '1rem', color: 'var(--muted-foreground)' }}>{t('enterApiKey')}</p>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Google AI API Key"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '1rem' }}
            />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-primary" onClick={saveKey} style={{ flex: 1 }}>Save</button>
              <button className="btn btn-ghost" onClick={() => setShowSettings(false)} style={{ flex: 1 }}>Close</button>
            </div>
          </div>
        </div>
      )}

      <main style={{ paddingBottom: '7rem' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/store" element={<Store products={products} addToCart={addToCart} />} />
          <Route path="/inventory" element={<Inventory products={products} updateStock={updateStock} />} />
          <Route path="/invoice" element={<InvoiceGenerator cart={cart} clearCart={clearCart} />} />
          <Route path="/services" element={<Services />} />
          <Route path="/crm" element={<CRM />} />
        </Routes>
      </main>

      <VoiceAssistant />
      <ChatAgent isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      <nav className="bottom-nav" style={{ height: '5rem', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} />
          <span style={{ fontSize: '0.6rem' }}>{t('dashboard')}</span>
        </NavLink>
        <NavLink to="/scanner" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Scan size={20} />
          <span style={{ fontSize: '0.6rem' }}>{t('scanner')}</span>
        </NavLink>
        <NavLink to="/store" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <div style={{ position: 'relative' }}>
            <ShoppingBag size={20} />
            {cartCount > 0 && <span style={{ position: 'absolute', top: '-5px', right: '-10px', background: 'var(--accent)', color: 'white', fontSize: '10px', padding: '2px 5px', borderRadius: '50%' }}>{cartCount}</span>}
          </div>
          <span style={{ fontSize: '0.6rem' }}>{t('store')}</span>
        </NavLink>
        <NavLink to="/inventory" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <PlusCircle size={20} />
          <span style={{ fontSize: '0.6rem' }}>{t('inventory')}</span>
        </NavLink>
        <NavLink to="/invoice" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <div style={{ position: 'relative' }}>
            <ShoppingBag size={20} />
          </div>
          <span style={{ fontSize: '0.6rem' }}>{t('invoice')}</span>
        </NavLink>
        <NavLink to="/services" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Briefcase size={20} />
          <span style={{ fontSize: '0.6rem' }}>{t('empowerment')}</span>
        </NavLink>
        <NavLink to="/crm" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Users size={20} />
          <span style={{ fontSize: '0.65rem' }}>{t('crm')}</span>
        </NavLink>
      </nav >
    </>
  );
};

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [hasProfile, setHasProfile] = useState(!!localStorage.getItem('sudarshan_biz_profile'));

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateStock = (productId, amount) => {
    setProducts(prev => prev.map(p =>
      p.id === productId ? { ...p, stock: Math.max(0, p.stock + amount) } : p
    ));
  };

  const clearCart = () => setCart([]);

  return (
    <LanguageProvider>
      {!hasProfile && <UserInfoModal onSave={() => setHasProfile(true)} />}
      <Router>
        <Nav
          products={products}
          addToCart={addToCart}
          updateStock={updateStock}
          cart={cart}
          clearCart={clearCart}
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        />
      </Router>
    </LanguageProvider>
  );
}

export default App;
