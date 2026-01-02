// Initialize Supabase
const SUPABASE_URL = "https://mxofcfmkdovgyschmgop.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14b2ZjZm1rZG92Z3lzY2htZ29wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxMjQ5NzMsImV4cCI6MjA4MjcwMDk3M30.LtsXpumBjrL-SsBZz5nKHk9Cw_4EL3EAmwujQhIyM4E";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// SIGNUP FORM
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirm = document.getElementById("signup-confirm").value;

    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert(error.message);
    } else {
      alert("Sign up successful! Check your email to verify your account.");
      window.location.href = "login.html";
    }
  });
}

// LOGIN FORM
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    } else {
      window.location.href = "dashboard.html";
    }
  });
}
