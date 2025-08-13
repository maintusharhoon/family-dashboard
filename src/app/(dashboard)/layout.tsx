// This is the code for your main Dashboard Layout
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

// This is the Sign Out button and its logic
const SignOut = () => {
  const signOut = async () => {
    'use server';
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect('/login');
  };

  return (
    <form action={signOut}>
      <button style={{ background: '#333', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Sign Out
      </button>
    </form>
  );
};

// This is the main layout component
export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #eee' }}>
        <h1 style={{ margin: 0 }}>Family Dashboard</h1>
        <SignOut />
      </header>
      <main style={{ padding: '1rem' }}>
        {children}
      </main>
    </div>
  );
}
