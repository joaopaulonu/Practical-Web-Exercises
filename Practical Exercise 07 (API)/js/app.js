document.addEventListener('DOMContentLoaded', () => {
    const buscarBtn = document.getElementById('buscarBtn');
    const limparBtn = document.getElementById('limparBtn');
    const cidadeInput = document.getElementById('cidadeInput');
    const resultadoDiv = document.getElementById('resultado');

    // Função assíncrona para buscar dados do clima
    const buscarClima = async () => {
        const cidade = cidadeInput.value.trim();

        if (!cidade) {
            exibirErro("Por favor, digite o nome de uma cidade.");
            return;
        }

        // Limpa resultados anteriores e mostra "carregando"
        resultadoDiv.innerHTML = '<p class="loading">Buscando dados...</p>';
        resultadoDiv.style.display = 'block';

        try {
            // 1. Buscar coordenadas da cidade (Geocoding API)
            const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`;
            const geoResponse = await fetch(geoURL);
            const geoData = await geoResponse.json();

            if (!geoData.results || geoData.results.length === 0) {
                throw new Error(`Cidade "${cidade}" não encontrada.`);
            }

            const { latitude, longitude, name, admin1, country } = geoData.results[0];

            // 2. Buscar dados do clima com as coordenadas (Weather API)
            const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;
            const weatherResponse = await fetch(weatherURL);
            const weatherData = await weatherResponse.json();

            if (!weatherData.current_weather) {
                throw new Error("Não foi possível obter os dados do clima.");
            }

            // 3. Exibir os resultados
            exibirResultado(weatherData, name, admin1, country);

        } catch (error) {
            exibirErro(error.message);
        }
    };

    // Função para exibir os resultados no terminal
    const exibirResultado = (data, nomeCidade, estado, pais) => {
        const { temperature, windspeed, weathercode } = data.current_weather;
        
        const localizacao = estado ? `${nomeCidade}, ${estado} - ${pais}` : `${nomeCidade} - ${pais}`;

        resultadoDiv.innerHTML = `
            <div class="scan-line"></div>
            <p class="result-line">> Localização: <span class="accent">${localizacao}</span></p>
            <p class="result-line">> Temperatura: <span class="accent">${temperature}°C</span></p>
            <p class="result-line">> Velocidade do Vento: <span class="accent">${windspeed} km/h</span></p>
            <p class="result-line">> Status: <span class="accent">Conexão bem-sucedida.</span></p>
        `;
    };

    // Função para exibir mensagens de erro
    const exibirErro = (mensagem) => {
        resultadoDiv.innerHTML = `
            <div class="scan-line"></div>
            <p class="result-line error">> ERRO: <span class="accent">${mensagem}</span></p>
        `;
    };

    // Função para limpar o terminal
    const limparTerminal = () => {
        cidadeInput.value = '';
        resultadoDiv.innerHTML = '<div class="scan-line"></div>';
        resultadoDiv.style.display = 'none';
        cidadeInput.focus();
    };

    // Adiciona os eventos aos botões
    buscarBtn.addEventListener('click', buscarClima);
    limparBtn.addEventListener('click', limparTerminal);

    // Permite buscar pressionando "Enter" no campo de input
    cidadeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            buscarClima();
        }
    });

    // Esconde o resultado inicialmente
    resultadoDiv.style.display = 'none';
});