// Initialize Supabase
const SUPABASE_URL = "https://mxofcfmkdovgyschmgop.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14b2ZjZm1rZG92Z3lzY2htZ29wIiwicm9sZSIsImF1dGgiOjE3NjcxMjQ5NzMsImV4cCI6MjA4MjcwMDk3M30.LtsXpumBjrL-SsBZz5nKHk9Cw_4EL3EAmwujQhIyM4E";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const walletsContainer = document.getElementById("wallets-container");
const addWalletForm = document.getElementById("add-wallet-form");

// Check if user is logged in
async function checkUser() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = "login.html";
    return null;
  }
  return session.user;
}

// Fetch wallets for logged-in user
async function fetchWallets() {
  const user = await checkUser();
  if (!user) return;

  const { data: wallets, error } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error(error);
    return;
  }

  walletsContainer.innerHTML = "";
  wallets.forEach(wallet => {
    const div = document.createElement("div");
    div.className = "wallet-box";
    div.innerHTML = `
      <h3>${wallet.name}</h3>
      <p>Address: ${wallet.address}</p>
      <p>Chain: ${wallet.chain}</p>
      <p>Added: ${new Date(wallet.added_at).toLocaleString()}</p>
    `;
    walletsContainer.appendChild(div);
  });
}

// Add new wallet
if (addWalletForm) {
  addWalletForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = await checkUser();
    if (!user) return;

    const name = document.getElementById("wallet-name").value;
    const address = document.getElementById("wallet-address").value;
    const chain = document.getElementById("wallet-chain").value;

    const { data, error } = await supabase
      .from("wallets")
      .insert([{ name, address, chain, user_id: user.id }]);

    if (error) {
      alert(error.message);
    } else {
      addWalletForm.reset();
      fetchWallets();
    }
  });
}

// Initial load
fetchWallets();
