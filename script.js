const reasons = [
    "За твою улыбку",
    "За твой смех",
    "За твой взгляд",
    "За твои объятия",
    "За твою веру в меня",
    "За твои глаза",
    "За твои руки",
    "За твои поцелуи",
    "За твой голос",
    "За то, что ты есть",
    "За твою доброту",
    "За твою красоту",
    "За твой запах",
    "За твои капризы",
    "За то, как ты говоришь 'люблю'",
    "За твои щечки",
    "За твои волосы",
    "За то, как ты танцуешь",
    "За то, что ты готовишь",
    "За наши утра",
    "За наши вечера",
    "За то, что ты лучшая",
    "За твои ресницы",
    "За ямочки на щеках",
    "За то, как ты спишь",
    "За то, что понимаешь",
    "За твою поддержку",
    "За то, как злишься",
    "За то, как миришься",
    "За твои идеи",
    "За то, что ты моя муза",
    "За твои руки в моих",
    "За то, как мы дурачимся",
    "За то, что носишь мои футболки",
    "За твой вкус",
    "За твои мечты",
    "За то, что делишься секретами",
    "За твою искренность",
    "За твою нежность",
    "За твою силу",
    "За то, что плачешь от фильмов",
    "За то, как ешь сладкое",
    "За твои шутки",
    "За то, как ты меня называешь",
    "За наши споры",
    "За твою честность",
    "За твой взгляд утром",
    "За твоих родителей",
    "За твои милые страхи",
    "За то, как выбираешь одежду",
    "За то, что красивая всегда",
    "За твои мысли",
    "За твои советы",
    "За то, как гладишь меня",
    "За то, что умеешь слушать",
    "За то, что умеешь молчать",
    "За твои секреты",
    "За нашу историю",
    "За первое свидание",
    "За первый поцелуй",
    "За то, что терпишь меня",
    "За то, что вдохновляешь",
    "За то, что с тобой спокойно",
    "За то, что с тобой весело",
    "За твой стиль",
    "За твои духи",
    "За твою заботу",
    "За то, как ты болеешь",
    "За твой характер",
    "За то, как прощаешь",
    "За то, как ждешь меня",
    "За то, как встречаешь",
    "За то, как провожаешь",
    "За твои ножки",
    "За то, как строишь глазки",
    "За то, что ты моя",
    "За то, что выбрала меня",
    "За то, что мы семья",
    "За веру в чудеса",
    "За твою наивность",
    "За твою мудрость",
    "За то, что утешаешь",
    "За то, как ты светишься",
    "За твои фото",
    "За поцелуй в нос",
    "За 'С добрым утром'",
    "За 'Спокойной ночи'",
    "За то, что снишься мне",
    "За то, что любишь меня",
    "За запах после душа",
    "За то, как поешь",
    "За то, что особенная",
    "За счастье быть с тобой",
    "За то, что я лучше с тобой",
    "За наше будущее",
    "За каждый миг с тобой",
    "За твое тепло",
    "За то, что ты - это ты"
];

while (reasons.length < 100) {
    reasons.push("Просто за то, что ты есть ❤️");
}

const finalReasons = reasons.slice(0, 100);

const grid = document.getElementById('reasons-grid');
const openedSpan = document.getElementById('opened-count');
const totalSpan = document.getElementById('total-count');
const randomButton = document.getElementById('randomButton');

let openedCount = 0;
let cards = [];

totalSpan.textContent = finalReasons.length;

function updateCounter() {
    openedSpan.textContent = openedCount;
}

function handleCardClick(card, reasonIndex) {
    if (card.classList.contains('opened')) return;

    const reasonText = finalReasons[reasonIndex];
    const span = card.querySelector('span');
    
    span.innerHTML = `<span class="reason-text">${reasonText}</span>`;
    card.classList.add('opened');

    openedCount++;
    updateCounter();
    
    if (openedCount === finalReasons.length) {
        setTimeout(() => {
            alert('❤️ Я люблю тебя всеми 100 причинами! ❤️');
        }, 200);
    }
}

function createCards() {
    grid.innerHTML = '';
    cards = [];

    for (let i = 0; i < finalReasons.length; i++) {
        const card = document.createElement('div');
        card.className = 'heart-card';
        card.dataset.index = i;

        const span = document.createElement('span');
        span.textContent = i + 1;
        card.appendChild(span);

        card.addEventListener('click', () => handleCardClick(card, i));

        grid.appendChild(card);
        cards.push(card);
    }
}

function openRandomReason() {
    const notOpened = cards
        .map((card, idx) => card.classList.contains('opened') ? -1 : idx)
        .filter(idx => idx !== -1);

    if (notOpened.length === 0) {
        alert('❤️ Все сердечки уже открыты! ❤️');
        return;
    }

    const randomIndex = notOpened[Math.floor(Math.random() * notOpened.length)];
    const randomCard = cards[randomIndex];
    const reasonIdx = parseInt(randomCard.dataset.index);

    handleCardClick(randomCard, reasonIdx);
    
    randomCard.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center'
    });
}

const audio = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const muteBtn = document.getElementById('muteBtn');
const progressBar = document.getElementById('progressBar');
const progressFilled = document.getElementById('progressFilled');
const currentTimeSpan = document.getElementById('currentTime');
const durationSpan = document.getElementById('duration');

let isPlaying = false;
let isMuted = false;

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateProgress() {
    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressFilled.style.width = percent + '%';
        currentTimeSpan.textContent = formatTime(audio.currentTime);
    }
}

audio.addEventListener('loadedmetadata', () => {
    durationSpan.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', updateProgress);

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.innerHTML = '<span class="play-icon">▶</span>';
    } else {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                playPauseBtn.innerHTML = '<span class="play-icon">⏸</span>';
            }).catch(error => {
                console.log('Автовоспроизведение заблокировано браузером');
                alert('Нажмите на кнопку "Случайная причина" или на любое сердечко, а затем нажмите play 🎵');
            });
        }
    }
    isPlaying = !isPlaying;
});

audio.addEventListener('pause', () => {
    isPlaying = false;
    playPauseBtn.innerHTML = '<span class="play-icon">▶</span>';
});

audio.addEventListener('play', () => {
    isPlaying = true;
    playPauseBtn.innerHTML = '<span class="play-icon">⏸</span>';
});

muteBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    isMuted = audio.muted;
    muteBtn.innerHTML = isMuted ? '<span class="mute-icon">🔇</span>' : '<span class="mute-icon">🔊</span>';
});

progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percent = clickX / width;
    
    if (audio.duration) {
        audio.currentTime = percent * audio.duration;
        updateProgress();
    }
});

audio.addEventListener('ended', () => {
    audio.currentTime = 0;
    audio.play();
});

document.addEventListener('DOMContentLoaded', () => {
    createCards();
    randomButton.addEventListener('click', openRandomReason);
    
    document.addEventListener('click', function unlockAudio() {
    
        audio.load();
        document.removeEventListener('click', unlockAudio);
    }, { once: true });
});
const galleryPhotos = [
    {
        src: "images/photo1.jpg",
        caption: "Самый счастливый день"
    },
    {
        src: "images/photo2.jpg",
        caption: "Твоя улыбка"
    },
    {
        src: "images/photo3.jpg",
        caption: "Наше первое свидание"
    },
    {
        src: "images/photo4.jpg",
        caption: "Ты самая красивая"
    },
    {
        src: "images/photo5.jpg",
        caption: "Наш поцелуй"
    },
    {
        src: "images/photo6.jpg",
        caption: "Просто любимая"
    },
    {
        src: "images/photo7.jpg",
        caption: "Наше путешествие"
    },
    {
        src: "images/photo8.jpg",
        caption: "Ты и я"
    },
    {
        src: "images/photo9.jpg",
        caption: "Счастье рядом"
    }
];

let currentPhotoIndex = 6;
const photoGallery = document.getElementById('photoGallery');
const loadMoreBtn = document.getElementById('loadMoreBtn');

function createGalleryItem(photo) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.style.animation = 'fadeInUp 0.6s ease';
    
    item.innerHTML = `
        <div class="photo-card">
            <div class="photo-container">
                <img src="${photo.src}" alt="${photo.caption}" class="photo-img">
                <div class="photo-overlay">
                    <div class="photo-hearts">
                        <span class="floating-heart">❤️</span>
                        <span class="floating-heart">❤️</span>
                        <span class="floating-heart">❤️</span>
                    </div>
                    <p class="photo-caption">${photo.caption}</p>
                </div>
            </div>
        </div>
    `;
    
    return item;
}

function loadMorePhotos() {
    const photosToShow = galleryPhotos.slice(currentPhotoIndex, currentPhotoIndex + 3);
    
    photosToShow.forEach(photo => {
        const item = createGalleryItem(photo);
        photoGallery.appendChild(item);
    });
    
    currentPhotoIndex += photosToShow.length;
    
    if (currentPhotoIndex >= galleryPhotos.length) {
        loadMoreBtn.style.display = 'none';
        
        const endMessage = document.createElement('div');
        endMessage.className = 'end-message';
        endMessage.innerHTML = '❤️ Это все наши фотографии... пока! ❤️';
        endMessage.style.cssText = `
            text-align: center;
            margin: 30px 0;
            font-size: 1.3rem;
            color: #b34b67;
            animation: fadeInUp 0.6s ease;
        `;
        photoGallery.parentNode.insertBefore(endMessage, loadMoreBtn.parentNode);
    }
}

if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadMorePhotos);
}

const galleryItems = document.querySelectorAll('.gallery-item');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

galleryItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease';
    observer.observe(item);
});
document.addEventListener('DOMContentLoaded', () => {
    createCards();
    randomButton.addEventListener('click', openRandomReason);
    document.addEventListener('click', function unlockAudio() {
        audio.load();
        document.removeEventListener('click', unlockAudio);
    }, { once: true });
});
const startDate = new Date(2022, 2, 3, 23, 33, 0);

function updateTimer() {
    const now = new Date();
    const diff = now - startDate;
    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const years = Math.floor(totalDays / 365);
    const months = Math.floor((totalDays % 365) / 30);
    const days = Math.floor((totalDays % 365) % 30);
    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;
    document.getElementById('yearsCount').textContent = years;
    document.getElementById('monthsCount').textContent = months;
    document.getElementById('daysCount').textContent = days;
    document.getElementById('hoursCount').textContent = hours;
    document.getElementById('minutesCount').textContent = minutes;
    document.getElementById('secondsCount').textContent = seconds;
    
}
updateTimer();
setInterval(updateTimer, 1000);
