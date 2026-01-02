import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://mxofcfmkdovgyschmgop.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14b2ZjZm1rZG92Z3lzY2htZ29wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxMjQ5NzMsImV4cCI6MjA4MjcwMDk3M30.LtsXpumBjrL-SsBZz5nKHk9Cw_4EL3EAmwujQhIyM4E";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ---------- SIGN UP ---------- */
async function signup(email, password) {
  const { error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    alert(error.message);
  } else {
    window.location.href = "dashboard.html";
  }
}

/* ---------- LOGIN ---------- */
async function login(email, password) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
  } else {
    window.location.href = "dashboard.html";
  }
}

/* ---------- LOAD DASHBOARD ---------- */
async function loadDashboard() {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("user-email").innerText = user.email;

  const { data: wallets, error } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    alert(error.message);
    return;
  }

  const list = document.getElementById("wallet-list");
  list.innerHTML = "";

  wallets.forEach((w) => {
    const li = document.createElement("li");
    li.innerText = `${w.chain.toUpperCase()} — ${w.address}`;
    list.appendChild(li);
  });
}

/* ---------- LOGOUT ---------- */
async function logout() {
  await supabase.auth.signOut();
  window.location.href = "login.html";
}

/* ---------- GLOBAL HOOKS ---------- */
window.signup = signup;
window.login = login;
window.loadDashboard = loadDashboard;
window.logout = logout;
