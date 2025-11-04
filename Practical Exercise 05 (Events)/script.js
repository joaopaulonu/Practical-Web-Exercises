document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastro-form');
    const btnEnviar = document.getElementById('btn-enviar');
    const sumarioErros = document.getElementById('sumario-erros');
    const listaErros = document.getElementById('lista-erros');
    
    // Armazena a validade de cada campo para o desafio final
    const camposValidos = {
        nome: false,
        email: false,
        senha: false,
        curso: false,
        termos: false
    };

    // ===========================================
    // FUNÇÕES DE UTILIDADE E VALIDAÇÃO GERAL
    // ===========================================

    /** Atualiza o estado de validade do botão Enviar */
    function atualizarBotaoEnviar() {
        const todosValidos = Object.values(camposValidos).every(val => val === true);
        btnEnviar.disabled = !todosValidos;
    }

    /** Remove/Adiciona classe de erro e atualiza feedback textual */
    function setFeedback(element, isValid, message = '') {
        const feedbackElement = document.getElementById(element.id + '-feedback');
        
        if (isValid) {
            element.classList.remove('input-erro');
            element.setAttribute('aria-invalid', 'false');
            if (feedbackElement) feedbackElement.textContent = '';
        } else {
            element.classList.add('input-erro');
            element.setAttribute('aria-invalid', 'true');
            if (feedbackElement) feedbackElement.textContent = message;
        }
    }

    // ===========================================
    // ETAPA 1: CONTADOR DE CARACTERES
    // ===========================================
    const inputNome = document.getElementById('nome');
    const espelhoNome = document.getElementById('nome-espelho');
    const maxCaracteres = 50;

    inputNome.addEventListener('input', () => {
        const valor = inputNome.value;
        const comprimento = valor.length;
        
        // 1. Espelho
        espelhoNome.textContent = valor;

        // 2. Contador
        const feedback = document.getElementById('nome-feedback');
        feedback.textContent = `Caracteres: ${comprimento}/${maxCaracteres}`;

        // 3. Validação (Limite e Mínimo)
        const isLengthValid = comprimento > 0 && comprimento <= maxCaracteres;
        const isMinValid = comprimento >= parseInt(inputNome.getAttribute('data-min-length'));

        if (!isLengthValid) {
            inputNome.classList.add('input-erro');
            feedback.style.color = '#dc3545'; // Cor de erro
            camposValidos.nome = false;
        } else if (!isMinValid) {
             inputNome.classList.add('input-erro');
             feedback.textContent += ` (Mínimo ${inputNome.getAttribute('data-min-length')} caracteres)`;
             feedback.style.color = '#dc3545';
             camposValidos.nome = false;
        } else {
            inputNome.classList.remove('input-erro');
            feedback.style.color = 'inherit';
            camposValidos.nome = true;
        }
        
        atualizarBotaoEnviar();
    });

    // ===========================================
    // ETAPA 2: SELECT DEPENDENTE
    // ===========================================
    const selectEstado = document.getElementById('estado');
    const selectCidade = document.getElementById('cidade');
    
    // Dados de exemplo
    const cidadesPorEstado = {
        SP: ['São Paulo', 'Campinas', 'Ribeirão Preto'],
        RJ: ['Rio de Janeiro', 'Niterói', 'Cabo Frio'],
        MG: ['Belo Horizonte', 'Uberlândia', 'Contagem']
    };

    selectEstado.addEventListener('change', () => {
        const estadoSelecionado = selectEstado.value;
        
        // 1. Limpa e desabilita/habilita
        selectCidade.innerHTML = '<option value="">Selecione a Cidade</option>';
        selectCidade.disabled = !estadoSelecionado;

        // 2. Preenchimento dinâmico
        if (estadoSelecionado && cidadesPorEstado[estadoSelecionado]) {
            cidadesPorEstado[estadoSelecionado].forEach(cidade => {
                const option = document.createElement('option');
                option.value = cidade;
                option.textContent = cidade;
                selectCidade.appendChild(option);
            });
        }
    });

    // ===========================================
    // ETAPA 3: FOCO E BLUR (E-MAIL)
    // ===========================================
    const inputEmail = document.getElementById('email');

    // 1. Foco (Focus) - Ficar azul
    inputEmail.addEventListener('focus', () => {
        inputEmail.classList.add('input-foco');
        // Limpa a mensagem de feedback ao focar
        setFeedback(inputEmail, true);
    });

    // 2. Perda de Foco (Blur) - Validação básica e feedback
    inputEmail.addEventListener('blur', () => {
        inputEmail.classList.remove('input-foco');
        const email = inputEmail.value;
        // Validação básica: verifica se tem @ e ponto.
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (email === '') {
            setFeedback(inputEmail, false, 'O campo E-mail é obrigatório.');
            camposValidos.email = false;
        } else if (!isValid) {
            setFeedback(inputEmail, false, 'Formato de E-mail inválido (ex: usuario@dominio.com).');
            camposValidos.email = false;
        } else {
            setFeedback(inputEmail, true);
            camposValidos.email = true;
        }

        atualizarBotaoEnviar();
    });
    
    // ===========================================
    // DESAFIO: INDICADOR DE FORÇA DE SENHA
    // ===========================================
    const inputSenha = document.getElementById('senha');
    const forcaTexto = document.getElementById('forca-texto');
    const forcaBarra = document.getElementById('forca-barra');

    function verificarForcaSenha(senha) {
        let forca = 0;
        // 1. Comprimento (mínimo 8)
        if (senha.length >= 8) forca += 1;
        // 2. Letras maiúsculas
        if (/[A-Z]/.test(senha)) forca += 1;
        // 3. Números
        if (/[0-9]/.test(senha)) forca += 1;
        // 4. Caracteres especiais
        if (/[^A-Za-z0-9]/.test(senha)) forca += 1;
        return forca;
    }

    inputSenha.addEventListener('input', () => {
        const forca = verificarForcaSenha(inputSenha.value);
        let texto = 'Fraca';
        let cor = '#dc3545'; // Vermelho
        let largura = '0%';
        
        if (forca >= 4) {
            texto = 'Forte';
            cor = '#28a745'; // Verde
            largura = '100%';
        } else if (forca >= 2) {
            texto = 'Média';
            cor = '#ffc107'; // Amarelo
            largura = '66%';
        } else if (inputSenha.value.length > 0) {
            largura = '33%';
        }
        
        forcaTexto.textContent = texto;
        forcaTexto.style.color = cor;
        forcaBarra.style.backgroundColor = cor;
        forcaBarra.style.width = largura;

        // Atualizar validação para o botão
        camposValidos.senha = (forca >= 2); // Considera Média como válido para o formulário
        if (inputSenha.value === '') camposValidos.senha = false;
        
        setFeedback(inputSenha, camposValidos.senha, 'Senha muito fraca (mínimo 8 caracteres e alguma variação)');
        atualizarBotaoEnviar();
    });
    
    // ===========================================
    // ETAPA 4 + DESAFIO: VALIDAÇÃO FINAL E SUBMIT
    // ===========================================
    
    const selectCurso = document.getElementById('curso');
    const checkboxTermos = document.getElementById('termos');

    // Listener para Curso (select) e Termos (checkbox)
    [selectCurso, checkboxTermos].forEach(element => {
        element.addEventListener('change', () => {
            if (element.id === 'curso') {
                camposValidos.curso = element.value !== '';
                setFeedback(element, camposValidos.curso, 'Selecione um curso para continuar.');
            } else if (element.id === 'termos') {
                camposValidos.termos = element.checked;
            }
            atualizarBotaoEnviar();
        });
    });

    // Função de validação final
    function validarTudo() {
        // Dispara os eventos para forçar a validação visual (input, blur, change)
        inputNome.dispatchEvent(new Event('input')); 
        inputEmail.dispatchEvent(new Event('blur'));
        inputSenha.dispatchEvent(new Event('input'));
        selectCurso.dispatchEvent(new Event('change'));
        checkboxTermos.dispatchEvent(new Event('change'));
        
        // Verifica todos os campos
        return Object.values(camposValidos).every(val => val === true);
    }

    // Evento Submit do Formulário
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Impedir o envio padrão

        // 1. Validação
        const isValid = validarTudo();
        
        // 2. Sumário de Erros (Desafio Final)
        listaErros.innerHTML = '';
        sumarioErros.style.display = 'none';

        if (!isValid) {
            let erros = [];
            if (!camposValidos.nome) erros.push('Nome: deve ter entre 3 e 50 caracteres.');
            if (!camposValidos.email) erros.push('E-mail: formato inválido ou campo vazio.');
            if (!camposValidos.senha) erros.push('Senha: muito fraca ou campo vazio.');
            if (!camposValidos.curso) erros.push('Curso: selecione um curso.');
            if (!camposValidos.termos) erros.push('Termos: aceite os termos.');
            
            erros.forEach(erro => {
                const li = document.createElement('li');
                li.textContent = erro;
                listaErros.appendChild(li);
            });
            
            sumarioErros.style.display = 'block';
            sumarioErros.focus(); // Foco para acessibilidade (role="alert")
            return;
        }

        // 3. Envio com Sucesso
        alert('Cadastro realizado com sucesso!');
        
        // 4. Reset do Formulário (Desafio Final)
        form.reset();
        
        // Reset manual dos estados (porque form.reset() não afeta classes/flags JS)
        setTimeout(() => {
            Object.keys(camposValidos).forEach(key => camposValidos[key] = false);
            document.querySelectorAll('.input-erro, .input-foco').forEach(el => el.classList.remove('input-erro', 'input-foco'));
            document.getElementById('nome-espelho').textContent = '';
            document.getElementById('nome-feedback').textContent = '';
            document.getElementById('forca-barra').style.width = '0%';
            document.getElementById('forca-texto').textContent = 'Fraca';
            selectCidade.innerHTML = '<option value="">Selecione a Cidade</option>';
            selectCidade.disabled = true;
            sumarioErros.style.display = 'none'; // Esconde o sumário
            atualizarBotaoEnviar();
        }, 50);
    });
});