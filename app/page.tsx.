'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://YOUR_PROJECT_ID.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_PUBLISHABLE_KEY'
);

const buttonStyle = {
  padding: '12px 18px',
  border: 'none',
  borderRadius: '8px',
  background: '#1d4ed8',
  color: 'white',
  cursor: 'pointer',
  margin: '5px'
};

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '12px',
  margin: '10px 0',
  border: '1px solid #ccc',
  borderRadius: '7px',
  boxSizing: 'border-box' as const
};

export default function Home() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [section, setSection] = useState('Dashboard');
  const [schools, setSchools] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  async function loadData() {
    const { data } = await supabase.auth.getSession();
    setSession(data.session);

    if (data.session) {
      const schoolResult = await supabase
        .from('schools')
        .select('*')
        .order('created_at', { ascending: false });

      const orderResult = await supabase
        .from('purchase_orders')
        .select('*')
        .order('created_at', { ascending: false });

      setSchools(schoolResult.data || []);
      setOrders(orderResult.data || []);
    }
  }

  useEffect(() => {
    loadData();

    const { data } = supabase.auth.onAuthStateChange(() => {
      loadData();
    });

    return () => data.subscription.unsubscribe();
  }, []);

  async function login(e: any) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setMessage(error ? error.message : 'Login successful');
  }

  async function register() {
    const { error } = await supabase.auth.signUp({
      email,
      password
    });

    setMessage(
      error ? error.message : 'Account created. Check your email if confirmation is required.'
    );
  }

  async function addSchool(e: any) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const { error } = await supabase.from('schools').insert({
      name: form.get('name'),
      address: form.get('address'),
      phone: form.get('phone')
    });

    setMessage(error ? error.message : 'School added successfully');

    if (!error) {
      e.currentTarget.reset();
      loadData();
    }
  }

  async function addOrder(e: any) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const amount = Number(form.get('amount'));
    const discount = Number(form.get('discount'));

    const { error } = await supabase.from('purchase_orders').insert({
      school_name: form.get('school'),
      gross_amount: amount,
      discount_percent: discount,
      net_amount: amount * (1 - discount / 100),
      status: 'Pending'
    });

    setMessage(error ? error.message : 'Purchase order saved');

    if (!error) {
      e.currentTarget.reset();
      loadData();
    }
  }

  if (!session) {
    return (
      <main style={{
        maxWidth: 420,
        margin: '70px auto',
        padding: 25,
        background: 'white',
        borderRadius: 15,
        boxShadow: '0 5px 25px #0001'
      }}>
        <h1 style={{ color: '#17336b' }}>
          EDUGYAN PUBLICATIONS
        </h1>

        <p>Executive Management System</p>

        <form onSubmit={login}>
          <input
            style={inputStyle}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <input
            style={inputStyle}
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button style={buttonStyle} type="submit">
            Login
          </button>
        </form>

        <button style={buttonStyle} onClick={register}>
          Create Account
        </button>

        <p>{message}</p>
      </main>
    );
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: '#f1f5f9',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{
        background: '#172554',
        color: 'white',
        padding: 20,
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
      }}>
        <h2>EDUGYAN PUBLICATIONS</h2>

        <button
          style={buttonStyle}
          onClick={() => supabase.auth.signOut()}
        >
          Logout
        </button>
      </header>

      <nav style={{ padding: 12, background: 'white' }}>
        {[
          'Dashboard',
          'Schools',
          'New Purchase Order',
          'Order Register',
          'Payments',
          'Executives',
          'Reports'
        ].map(item => (
          <button
            key={item}
            style={{
              ...buttonStyle,
              background: section === item ? '#172554' : '#64748b'
            }}
            onClick={() => setSection(item)}
          >
            {item}
          </button>
        ))}
      </nav>

      <section style={{ padding: 22 }}>
        <h1>{section}</h1>

        {message && <p>{message}</p>}

        {section === 'Dashboard' && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 15
          }}>
            <div style={panelStyle}>
              <h3>Total Schools</h3>
              <h1>{schools.length}</h1>
            </div>

            <div style={panelStyle}>
              <h3>Total Orders</h3>
              <h1>{orders.length}</h1>
            </div>
          </div>
        )}

        {section === 'Schools' && (
          <>
            <h3>Add New School</h3>

            <form onSubmit={addSchool}>
              <input name="name" placeholder="School name" style={inputStyle} required />
              <input name="address" placeholder="School address" style={inputStyle} />
              <input name="phone" placeholder="Phone number" style={inputStyle} />
              <button style={buttonStyle}>Save School</button>
            </form>

            <h3>School Register</h3>

            {schools.map((school, i) => (
              <p key={school.id || i}>
                {school.name} — {school.address}
              </p>
            ))}
          </>
        )}

        {section === 'New Purchase Order' && (
          <>
            <h3>Create Purchase Order</h3>

            <form onSubmit={addOrder}>
              <input name="school" placeholder="School name" style={inputStyle} required />
              <input name="amount" type="number" placeholder="Gross amount" style={inputStyle} required />
              <input name="discount" type="number" placeholder="Discount percentage" defaultValue="40" style={inputStyle} />
              <button style={buttonStyle}>Save Order</button>
            </form>
          </>
        )}

        {section === 'Order Register' && (
          <>
            {orders.map((order, i) => (
              <div key={order.id || i} style={panelStyle}>
                <p>School: {order.school_name}</p>
                <p>Gross: ₹{order.gross_amount}</p>
                <p>Net: ₹{order.net_amount}</p>
                <p>Status: {order.status}</p>
              </div>
            ))}
          </>
        )}

        {section === 'Payments' && (
          <p>Payment management will be configured next.</p>
        )}

        {section === 'Executives' && (
          <p>Executive account management will be configured next.</p>
        )}

        {section === 'Reports' && (
          <p>Total schools: {schools.length} | Total orders: {orders.length}</p>
        )}
      </section>
    </main>
  );
}

const panelStyle = {
  background: 'white',
  padding: 22,
  borderRadius: 12,
  margin: 10,
  minWidth: 180
};
