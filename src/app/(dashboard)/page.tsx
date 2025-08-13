// This is the code for the Main Dashboard Page
import { createClient } from '@/utils/supabase/server';

export default async function DashboardPage() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>
        Welcome, {user?.email}!
      </h2>

      <div>
        {/* The KPI cards and charts will be added here later */}
        <p>Your dashboard components will be displayed here.</p>
      </div>
    </div>
  );
}
