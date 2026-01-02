// Initialize Supabase
const SUPABASE_URL = 'https://mxofcfmkdovgyschmgop.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14b2ZjZm1rZG92Z3lzY2htZ29wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxMjQ5NzMsImV4cCI6MjA4MjcwMDk3M30.LtsXpumBjrL-SsBZz5nKHk9Cw_4EL3EAmwujQhIyM4E';

const supabase = Supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Utility function to get the logged-in user
async function getUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) console.error(error);
  return user;
}

// Utility function to logout
async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) alert('Logout failed: ' + error.message);
  else window.location.href = 'login.html';
}

// Fetch user-specific wallets
async function getWallets() {
  const user = await getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('wallets')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    console.error('Error fetching wallets:', error);
    return [];
  }
  return data;
}

// Add a wallet for the logged-in user
async function addWallet(chain, address) {
  const user = await getUser();
  if (!user) return;

  const { data, error } = await supabase
    .from('wallets')
    .insert([{ user_id: user.id, chain, address }]);

  if (error) alert('Failed to add wallet: ' + error.message);
  return data;
}
