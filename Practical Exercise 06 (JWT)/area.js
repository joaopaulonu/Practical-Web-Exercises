document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('userToken');
    const welcomeMessage = document.getElementById('welcome-message');
    const tokenDisplay = document.getElementById('token-display');
    const logoutButton = document.getElementById('logout-button');

    // Função utilitária para decodificar o payload do JWT (client-side)
    function decodeJwtPayload(token) {
        try {
            // Tokens JWT têm 3 partes: header.payload.signature
            const parts = token.split('.');
            if (parts.length !== 3) return null;
            
            // O payload está na segunda parte
            const base64Url = parts[1];
            
            // Converte Base64URL para string JSON
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);

        } catch (e) {
            console.error("Erro ao decodificar token:", e);
            return null;
        }
    }

    // 1. Recuperar o token do localStorage & 2. Bloquear o acesso
    if (!token) {
        alert('Acesso negado! Você precisa fazer login.');
        window.location.href = 'index.html';
        return; 
    } else {
        // Decodifica o payload
        const payload = decodeJwtPayload(token);
        
        // Exibe o token
        tokenDisplay.value = token;

        if (payload && payload.name) {
            // 3. Exibe o nome do usuário decodificado
            welcomeMessage.textContent = `Bem-vindo(a), ${payload.name}!`;
        } else {
            welcomeMessage.textContent = 'Bem-vindo(a)! Token inválido ou incompleto.';
        }

        // 4. Botão Logout
        logoutButton.addEventListener('click', () => {
            // Apaga o token
            localStorage.removeItem('userToken');
            alert('Você foi desconectado(a).');
            // Volta para index.html
            window.location.href = 'index.html';
        });
        
        // (Etapa 3 & 4) Instrução para o usuário copiar
        console.log("Token JWT salvo. Copie e cole no jwt.io para validar a assinatura com a Secret: my-secret-key");
    }
});