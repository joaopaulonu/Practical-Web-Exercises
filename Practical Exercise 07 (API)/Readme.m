# 🌐 CyberWeather System

![CyberWeather](https://img.shields.io/badge/Version-2.0-8b5cf6?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-06b6d4?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Online-10b981?style=for-the-badge)

Sistema avançado de monitoramento meteorológico com interface cyberpunk e dados em tempo real.

## 🚀 Visão Geral

O **CyberWeather** é uma aplicação web moderna que consome a API Open-Meteo para fornecer dados climáticos precisos de qualquer cidade do mundo. Desenvolvido com tecnologias front-end modernas e design futurista.

### ✨ Características Principais

- 🎨 **Design Cyberpunk** - Interface moderna com tema futurista
- 🌍 **Cobertura Global** - Dados de qualquer cidade do mundo
- ⚡ **Tempo Real** - Atualizações instantâneas via API
- 📱 **Responsivo** - Compatível com todos os dispositivos
- 🎯 **Precisão** - Dados meteorológicos confiáveis
- 🔒 **Sem Cadastro** - Acesso direto sem necessidade de login

## 🛠️ Tecnologias Utilizadas

### Front-end
- **HTML5** - Estrutura semântica
- **CSS3** - Estilos avançados e animações
- **JavaScript ES6+** - Lógica e interatividade

### APIs e Bibliotecas
- **Open-Meteo API** - Dados meteorológicos
- **Particles.js** - Efeitos de partículas no background
- **Geocoding API** - Conversão cidade → coordenadas

### Design
- **CSS Grid & Flexbox** - Layouts responsivos
- **CSS Variables** - Sistema de cores consistente
- **CSS Animations** - Transições e efeitos visuais
- **Glass Morphism** - Efeitos de vidro fosco

## 📁 Estrutura do Projeto
lab-api-clima/
├── 📄 index.html # Página inicial
├── 📄 clima.html # Consulta de clima
├── 📄 cidades.html # Cidades monitoradas
├── 📄 sobre.html # Sobre o sistema
├── 📄 contato.html # Página de contato
├── 📂 css/
│ ├── 🎨 style.css # Estilos principais
│ └── ⚡ animations.css # Animações e efeitos
├── 📂 js/
│ ├── 🧠 app.js # Lógica da aplicação
│ └── 🔧 main.js # Navegação e utilitários
└── 📂 assets/
└── 🖼️ icons/ # Recursos visuais


## 🎯 Funcionalidades

### Páginas do Sistema

1. **🏠 Home** (`index.html`)
   - Apresentação do sistema
   - Estatísticas em tempo real
   - Navegação intuitiva

2. **🌤️ Consulta Climática** (`clima.html`)
   - Busca por nome da cidade
   - Dados de temperatura e vento
   - Interface tipo terminal

3. **🏙️ Cidades Monitoradas** (`cidades.html`)
   - Lista de cidades principais
   - Dados climáticos pré-carregados
   - Layout em grid responsivo

4. **ℹ️ Sobre o Sistema** (`sobre.html`)
   - Tecnologias utilizadas
   - Funcionalidades avançadas
   - Stack técnica completa

5. **📞 Contato** (`contato.html`)
   - Formulário de contato
   - Informações de suporte
   - Integração futura com backend

### Recursos Técnicos

- **Navegação Fluida** - Transições suaves entre páginas
- **Design Responsivo** - Adaptável a mobile e desktop
- **Performance Otimizada** - Carregamento rápido
- **Acessibilidade** - Navegação por teclado suportada
- **SEO Friendly** - Estrutura semântica adequada

## 🚀 Como Usar

### 1. Instalação Local
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/cyberweather.git

# Acesse o diretório
cd cyberweather

# Abra no navegador
open index.html

Uso Onlinex 
# Disponível via GitHub Pages ou servidor web
# Basta abrir o arquivo index.html em qualquer navegador

APIs Utilizadas
const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=1&language=pt&format=json`;

Weather API
const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&timezone=auto`;