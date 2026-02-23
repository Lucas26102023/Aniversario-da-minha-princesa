// Função para abrir abas
function openTab(evt, tabName) {
    // Oculta todos os conteúdos
    let contents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < contents.length; i++) {
        contents[i].style.display = "none";
    }

    // Remove a classe active de todos os botões
    let buttons = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active");
    }

    // Mostra o conteúdo da aba atual
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}

// Animação do fundo com corações
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];
for (let i = 0; i < 40; i++) {
    hearts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 2,
        speed: Math.random() * 1 + 0.5
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255, 0, 70, 0.8)";

    hearts.forEach(h => {
        ctx.beginPath();
        ctx.arc(h.x, h.y, h.size, 0, Math.PI * 2);
        ctx.fill();
        h.y += h.speed;

        if (h.y > canvas.height) {
            h.y = 0;
        }
    });

    requestAnimationFrame(draw);
}

draw();

// Redimensiona o canvas quando a janela muda de tamanho
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Controle de música global
const audioElement = document.getElementById("bgMusic");

if (audioElement) {
    // Restaura o estado da música ao carregar a página
    window.addEventListener("load", () => {
        const wasPlaying = sessionStorage.getItem("musicPlaying") === "true";
        const musicTime = parseFloat(sessionStorage.getItem("musicTime")) || 0;

        audioElement.currentTime = musicTime;

        if (wasPlaying) {
            audioElement.play().catch((error) => {
                console.log("Autoplay foi bloqueado pelo navegador");
            });
        } else {
            audioElement.play().catch((error) => {
                console.log("Autoplay foi bloqueado pelo navegador");
            });
        }
    });

    // Salva o tempo da música a cada atualização
    audioElement.addEventListener("timeupdate", () => {
        sessionStorage.setItem("musicTime", audioElement.currentTime);
        sessionStorage.setItem("musicPlaying", !audioElement.paused);
    });

    // Quando a música termina, reseta
    audioElement.addEventListener("ended", () => {
        sessionStorage.setItem("musicPlaying", "false");
        sessionStorage.setItem("musicTime", "0");
    });

    // Antes de sair da página, salva o estado
    window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("musicTime", audioElement.currentTime);
        sessionStorage.setItem("musicPlaying", !audioElement.paused);
    });
}

/* ===== JOGO INTERATIVO - CONSTRUINDO O FUTURO ===== */
const futurePromises = [
    "🏠 Vamos construir nossa casa do sonhos juntos, com um jardim cheio de flores!",
    "✈️ Vamos viajar por mundos incríveis, conhecer culturas e criar memórias eternas!",
    "😄 Vou fazer você rir todos os dias, mesmo nos momentos mais difíceis!",
    "💍 Vou amar você cada dia mais, sem nunca deixar de surpreender você!",
    "🌙 Vamos dançar sob a luz das estrelas, abraçados pelo nosso amor infinito!",
    "👨‍👩‍👧‍👦 Vamos construir uma família cheia de amor, risadas e momentos especiais!"
];

const gameElements = document.querySelectorAll('.game-element');
const promiseReveal = document.getElementById('promiseReveal');
const gameScore = document.getElementById('gameScore');
let clickedPromises = new Set();
let lastPromiseElement = null;

// Event listeners para cada elemento do jogo
gameElements.forEach((element, index) => {
    element.addEventListener('click', function() {
        if (!clickedPromises.has(index)) {
            clickedPromises.add(index);
            lastPromiseElement = element;
            
            // Animar o clique
            element.classList.add('clicked');
            
            // Mostrar a promessa
            showPromise(index);
            
            // Atualizar a barra de progresso
            updateProgress(index);
            
            // Atualizar score
            updateScore();
            
            // Desabilitar novo clique
            setTimeout(() => {
                element.style.pointerEvents = 'none';
                element.style.opacity = '0.6';
            }, 300);
        }
    });
});

// Event listener para clicar na promessa revelada
promiseReveal.addEventListener('click', function() {
    if (promiseReveal.querySelector('.promise-message')) {
        promiseReveal.classList.add('reveal-clicked');
        
        // Criar animação de confirmação
        createConfirmationEffect();
        
        // Remover a classe após a animação
        setTimeout(() => {
            promiseReveal.classList.remove('reveal-clicked');
        }, 600);
    }
});

function showPromise(index) {
    const promise = futurePromises[index];
    promiseReveal.innerHTML = `<div class="promise-message">✨ ${promise} ✨</div>`;
    
    // Adicionar classe de animação
    promiseReveal.style.animation = 'none';
    setTimeout(() => {
        promiseReveal.style.animation = 'promiseBoxGlow 0.8s ease';
    }, 10);
    
    // Criar efeito de luz adicional
    createLoveLight();
}

function updateProgress(index) {
    const progressFill = document.getElementById(`progress-${index}`);
    progressFill.style.width = '100%';
}

function updateScore() {
    gameScore.textContent = clickedPromises.size;
}

function createLoveLight() {
    // Criar luz de amor ao redor da promessa
    const light = document.createElement('div');
    light.style.position = 'fixed';
    light.style.pointerEvents = 'none';
    light.style.borderRadius = '50%';
    light.style.zIndex = '9998';
    light.style.width = '300px';
    light.style.height = '300px';
    
    // Posição relativa ao promise-reveal
    const rect = promiseReveal.getBoundingClientRect();
    light.style.left = (rect.left + rect.width / 2 - 150) + 'px';
    light.style.top = (rect.top + rect.height / 2 - 150) + 'px';
    
    light.style.background = 'radial-gradient(circle, rgba(255, 46, 99, 0.6) 0%, rgba(255, 46, 99, 0.2) 40%, transparent 70%)';
    light.style.animation = 'loveGlow 0.8s ease-out forwards';
    
    document.body.appendChild(light);
    setTimeout(() => light.remove(), 800);
}

function createConfirmationEffect() {
    // Criar partículas de confirmação ao redor da caixa
    const rect = promiseReveal.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.fontSize = '1.5em';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        
        // Diferentes emojis de amor
        const emojis = ['💕', '❤️', '💖', '✨', '💗', '🌟'];
        particle.textContent = emojis[i % emojis.length];
        
        // Ângulo radial
        const angle = (i / 12) * Math.PI * 2;
        const distance = 150;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        const duration = 0.6 + i * 0.05;
        particle.style.animation = `shootParticle ${duration}s ease-out forwards`;
        particle.style.setProperty('--endX', endX + 'px');
        particle.style.setProperty('--endY', endY + 'px');
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), duration * 1000);
    }
}

function createConfetti() {
    // Criar múltiplos confetes
    for (let i = 0; i < 15; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.pointerEvents = 'none';
        confetti.style.fontSize = '1.5em';
        confetti.style.zIndex = '9999';
        
        // Emojis variados
        const emojis = ['💕', '❤️', '💖', '💗', '✨', '⭐', '🌟'];
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Posição aleatória na tela
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '50%';
        
        // Duração aleatória
        const duration = 2000 + Math.random() * 1000;
        confetti.style.animation = `loveFloat ${duration}ms ease-out forwards`;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), duration);
    }
}

// Adicionar animação de confete ao CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes loveFloat {
        0% {
            opacity: 1;
            transform: translateY(0) translateX(0) rotate(0deg) scale(1);
        }
        50% {
            opacity: 1;
            filter: drop-shadow(0 0 10px rgba(255, 46, 99, 0.8));
        }
        100% {
            opacity: 0;
            transform: translateY(-120vh) translateX(${(Math.random() - 0.5) * 200}px) rotate(360deg) scale(0.2);
            filter: drop-shadow(0 0 20px rgba(255, 46, 99, 0.4));
        }
    }

    @keyframes float {
        0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

/* ===== JOGO DA MEMÓRIA ROMÂNTICO ===== */
const memoryPairs = [
    { image: 'imagens/foto7.jpg', id: 'foto7' },
    { image: 'imagens/foto7.jpg', id: 'foto7' },
    { image: 'imagens/foto8.jpg', id: 'foto8' },
    { image: 'imagens/foto8.jpg', id: 'foto8' },
    { image: 'imagens/foto9.jpg', id: 'foto9' },
    { image: 'imagens/foto9.jpg', id: 'foto9' },
    { image: 'imagens/foto10.jpg', id: 'foto10' },
    { image: 'imagens/foto10.jpg', id: 'foto10' },
    { image: 'imagens/foto11.jpg', id: 'foto11' },
    { image: 'imagens/foto11.jpg', id: 'foto11' },
    { image: 'imagens/foto12.jpg', id: 'foto12' },
    { image: 'imagens/foto12.jpg', id: 'foto12' }
];

let memoryBoard = document.getElementById('memoryBoard');
let memoryScore = document.getElementById('memoryScore');
let memoryAttempts = document.getElementById('memoryAttempts');
let memoryResetBtn = document.getElementById('memoryResetBtn');

let memoryState = {
    flipped: [],
    matched: 0,
    attempts: 0,
    canClick: true
};

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function initMemoryGame() {
    memoryBoard.innerHTML = '';
    memoryState = {
        flipped: [],
        matched: 0,
        attempts: 0,
        canClick: true
    };
    
    const shuffled = shuffleArray(memoryPairs);
    
    shuffled.forEach((pair, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card hidden';
        card.dataset.index = index;
        card.dataset.pair = JSON.stringify(pair);
        
        // Criar imagem
        const img = document.createElement('img');
        img.src = pair.image;
        img.alt = pair.id;
        img.className = 'memory-card-image';
        card.appendChild(img);
        
        card.addEventListener('click', function() {
            flipMemoryCard(this);
        });
        
        memoryBoard.appendChild(card);
    });
    
    updateMemoryDisplay();
}

function flipMemoryCard(card) {
    if (!memoryState.canClick || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }
    
    card.classList.add('flipped');
    card.classList.remove('hidden');
    memoryState.flipped.push(card);
    
    if (memoryState.flipped.length === 2) {
        memoryState.canClick = false;
        memoryState.attempts++;
        
        checkMemoryMatch();
    }
}

function checkMemoryMatch() {
    const card1 = memoryState.flipped[0];
    const card2 = memoryState.flipped[1];
    
    const pair1 = JSON.parse(card1.dataset.pair);
    const pair2 = JSON.parse(card2.dataset.pair);
    
    const isMatch = pair1.id === pair2.id;
    
    setTimeout(() => {
        if (isMatch) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            memoryState.matched++;
            
            // Criar celebração
            createMemoryConfetti(card1, card2);
            
            if (memoryState.matched === memoryPairs.length / 2) {
                setTimeout(() => {
                    alert('🎉 Parabéns! Você ganhou o jogo da memória! 💕');
                }, 300);
            }
        } else {
            card1.classList.remove('flipped');
            card1.classList.add('hidden');
            card2.classList.remove('flipped');
            card2.classList.add('hidden');
        }
        
        memoryState.flipped = [];
        memoryState.canClick = true;
        updateMemoryDisplay();
    }, 800);
}

function updateMemoryDisplay() {
    memoryScore.textContent = memoryState.matched;
    memoryAttempts.textContent = memoryState.attempts;
}

function createMemoryConfetti(card1, card2) {
    const rect1 = card1.getBoundingClientRect();
    const rect2 = card2.getBoundingClientRect();
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.pointerEvents = 'none';
        particle.style.fontSize = '1.2em';
        particle.style.zIndex = '9999';
        
        const startX = i < 4 ? rect1.left + rect1.width / 2 : rect2.left + rect2.width / 2;
        const startY = i < 4 ? rect1.top + rect1.height / 2 : rect2.top + rect2.height / 2;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        
        particle.textContent = '💕';
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 100;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        particle.style.animation = `shootParticle 0.6s ease-out forwards`;
        particle.style.setProperty('--endX', endX + 'px');
        particle.style.setProperty('--endY', endY + 'px');
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 600);
    }
}

// Inicializar jogo de memória
initMemoryGame();

// Event listener para resetar
memoryResetBtn.addEventListener('click', initMemoryGame);

/* ===== GARRAFA COM MENSAGEM ROMÂNTICA ===== */
const bottleMessages = [
    "Te amo mais do que as palavras podem expressar! 💕",
    "Você é a razão do meu sorriso todos os dias! 😊❤️",
    "Obrigado por fazer minha vida mais bonita! 🌹",
    "Você é meu amor eterno! 💍✨",
    "Cada momento com você é especial! ⭐💫",
    "Meu coração é seu para sempre! 💗",
    "Você é a melhor parte da minha vida! 🌟",
    "Te amarei em todas as vidas! 💖",
    "Você é meu presente mais precioso! 🎁💕",
    "Feliz aniversário ao amor da minha vida! 🎉💗",
    "Obrigado por existir ao meu lado! 🙏❤️",
    "Você é meu sonho realizado! 💫✨",
    "Com você, tudo faz sentido! 🧩💕",
    "Você é minha melhor aventura! 🚀❤️",
    "Te amo infinitamente! ♾️💗"
];

let usedMessages = [];
const messageBottle = document.getElementById('messageBottle');
const messageDisplay = document.getElementById('messageDisplay');
const bottleResetBtn = document.getElementById('bottleResetBtn');

function getRandomMessage() {
    if (usedMessages.length === bottleMessages.length) {
        usedMessages = [];
    }
    
    let message;
    do {
        message = bottleMessages[Math.floor(Math.random() * bottleMessages.length)];
    } while (usedMessages.includes(message));
    
    usedMessages.push(message);
    return message;
}

function openBottle() {
    messageBottle.classList.add('opened');
    const message = getRandomMessage();
    messageDisplay.innerHTML = `<p class="message-text">${message}</p>`;
    
    // Remover classe de animação para próximo clique
    setTimeout(() => {
        messageBottle.classList.remove('opened');
    }, 500);
}

messageBottle.addEventListener('click', openBottle);
bottleResetBtn.addEventListener('click', openBottle);
