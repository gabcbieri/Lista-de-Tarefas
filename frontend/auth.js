const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('signup-username').value.trim();
  const password = document.getElementById('signup-password').value;

  const res = await fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  const msg = document.getElementById('signup-message');

  if (res.ok) {
    msg.textContent = 'Cadastro realizado!';
    msg.style.color = 'green';
    signupForm.reset();
  } else {
    msg.textContent = data.error;
    msg.style.color = 'red';
  }
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;

  const res = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  const msg = document.getElementById('login-message');

  if (res.ok) {
    localStorage.setItem('token', data.token);
    msg.textContent = 'Login realizado!';
    msg.style.color = 'green';
    setTimeout(() => {
      window.location.href = 'index.html'; // volta para home
    }, 1000);
  } else {
    msg.textContent = data.error;
    msg.style.color = 'red';
  }
});