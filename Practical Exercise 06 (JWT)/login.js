document.addEventListener('DOMContentLoaded', () => {
    // Token Válido Fixo (Conforme fornecido na atividade)
    const FIXED_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJuYW1lIjoiRW5nLiBDb21wdXRhXHUwMGU3XHUwMGUzbyIsInJvbGUiOiJKV1QiLCJpYXQiOjE3NTk5ODEzMTcsImV4cCI6MTc1OTk4NDkxN30.b1KfcSFInRwYnvRA0Ae5jYuL59KZmCsufPgISNGq0X0";
    const form = document.getElementById('login-form');
    const feedback = document.getElementById('feedback');

    // Opcional: Se já tiver token, redireciona diretamente (para UX)
    if (localStorage.getItem('userToken')) {
        window.location.href = 'area.html';
        return; 
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        // 1. Verificar se os campos foram preenchidos.
        if (!email || !senha) {
            feedback.textContent = "Por favor, preencha todos os campos.";
            feedback.style.color = 'red';
            return;
        }
        
        // Simulação de sucesso de login
        
        // 2. Armazenar o token fixo no localStorage
        localStorage.setItem('userToken', FIXED_TOKEN);
        feedback.textContent = "Login realizado com sucesso! Redirecionando...";
        feedback.style.color = 'green';

        // 3. Redirecionar o usuário para area.html
        setTimeout(() => {
            window.location.href = 'area.html';
        }, 500);
    });
});