// 1. Efeito de Paralaxe nas Fotos
document.addEventListener("mousemove", function(e) {
    document.querySelectorAll(".foto").forEach(function(item) {
        const speed = item.getAttribute('data-speed');
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        item.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});

// 2. Lógica do Cursor Neon
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" });
});

function refreshCursorTargets() {
    const targets = document.querySelectorAll('a, button, .capa, .foto, .stream-card, .prod-card');
    targets.forEach(target => {
        target.addEventListener('mouseenter', () => cursorOutline.classList.add('cursor-hover'));
        target.addEventListener('mouseleave', () => cursorOutline.classList.remove('cursor-hover'));
    });
}

// 3. Lógica Principal (Vídeos e Áudio)
window.onload = function() {
    refreshCursorTargets();

    // ELEMENTOS
    const audioPlayer = document.getElementById('audio-player');
    const track = document.getElementById('track');
    const capas = document.querySelectorAll('.capa');
    
    const videoAgenda = document.getElementById('video-igao');
    const btnSomAgenda = document.getElementById('unmute-btn');

    const teaserVideo = document.getElementById('teaserVideo');
    const muteBtnTeaser = document.getElementById('muteBtn');
    const muteIconTeaser = document.getElementById('muteIcon');

    const bioVideo = document.getElementById('bioVideo');
    const muteBtnBio = document.getElementById('muteBtnBio');
    const muteIconBio = document.getElementById('muteIconBio');

    // Função para silenciar TODOS os vídeos
    function silenceAllVideos() {
        if (videoAgenda) {
            videoAgenda.muted = true;
            if (btnSomAgenda) { btnSomAgenda.style.backgroundColor = "rgba(138, 43, 226, 0.8)"; btnSomAgenda.innerHTML = "🔇 ATIVAR SOM"; }
        }
        if (teaserVideo) {
            teaserVideo.muted = true;
            if (muteIconTeaser) muteIconTeaser.src = "https://img.icons8.com/ios-filled/50/ffffff/mute.png";
        }
        if (bioVideo) {
            bioVideo.muted = true;
            if (muteIconBio) {
                muteIconBio.src = "https://img.icons8.com/ios-filled/50/ffffff/mute.png";
                muteBtnBio.style.background = "rgba(0, 238, 238, 0.6)";
            }
        }
    }

    // Controle Som Agenda
    if (btnSomAgenda && videoAgenda) {
        btnSomAgenda.onclick = () => {
            if (videoAgenda.muted) { silenceAllVideos(); videoAgenda.muted = false; btnSomAgenda.innerHTML = "🔊 SOM ATIVADO"; btnSomAgenda.style.backgroundColor = "#00eeff"; audioPlayer.pause(); } 
            else { videoAgenda.muted = true; btnSomAgenda.innerHTML = "🔇 ATIVAR SOM"; btnSomAgenda.style.backgroundColor = "rgba(138, 43, 226, 0.8)"; }
        };
    }

    // Controle Som Teaser
    if (muteBtnTeaser && teaserVideo) {
        muteBtnTeaser.onclick = () => {
            if (teaserVideo.muted) { silenceAllVideos(); teaserVideo.muted = false; muteIconTeaser.src = "https://img.icons8.com/ios-filled/50/ffffff/speaker.png"; audioPlayer.pause(); } 
            else { teaserVideo.muted = true; muteIconTeaser.src = "https://img.icons8.com/ios-filled/50/ffffff/mute.png"; }
        };
    }

    // Controle Som Bio
    if (muteBtnBio && bioVideo) {
        muteBtnBio.onclick = () => {
            if (bioVideo.muted) { silenceAllVideos(); bioVideo.muted = false; muteIconBio.src = "https://img.icons8.com/ios-filled/50/ffffff/speaker.png"; muteBtnBio.style.background = "#00eeee"; audioPlayer.pause(); } 
            else { bioVideo.muted = true; muteIconBio.src = "https://img.icons8.com/ios-filled/50/ffffff/mute.png"; muteBtnBio.style.background = "rgba(0, 238, 238, 0.6)"; }
        };
    }

    // Controle Carrossel Músicas
    capas.forEach(capa => {
        capa.addEventListener('click', function() {
            const musicaSrc = this.getAttribute('data-audio');
            if (audioPlayer.src.includes(musicaSrc) && !audioPlayer.paused) {
                audioPlayer.pause();
                track.classList.remove('paused-track');
                this.classList.remove('active');
            } else {
                silenceAllVideos();
                audioPlayer.src = musicaSrc;
                audioPlayer.play();
                track.classList.add('paused-track');
                capas.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
};