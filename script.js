document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const landingPage = document.getElementById('landing-page');
    const sessionPage = document.getElementById('session-page');
    const playBtn = document.getElementById('play-btn');
    const stopBtn = document.getElementById('stop-btn');
    const musicBtn = document.getElementById('music-btn');
    const skipBtn = document.getElementById('skip-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const timerDisplay = document.getElementById('timer');
    const audio = document.getElementById('bg-music');

    // Playlist (with Names derived from URL or manually mapped if needed)
    // Since URLs are messy, I'll extract a cleaner name programmatically
    const playlistURLs = [
        "https://audio2.brain.fm/The%20Chase%20Cinematic%20Focus%20Deep%20Work%20Conor%20112bpm_Nrmlzd2_VBR5.mp3?expiration=1777387505313&token=VuD14V36YrqCxHfBjS%2B%2FbJqAXYKuVINYZ6%2B1Ae22%2Bt4%3D",
        "https://audio2.brain.fm/ReflectingPool_Focus_Creativity_Cinematic_108_MedNELNrmlzd2_VBR5.mp3?expiration=1777387505313&token=KosbSoWGKrsEVJdhKHA0VThVxMGC%2Fr6QHzNXP7qVzyo%3D",
        "https://audio2.brain.fm/AReflectionOnTime_Focus_DeepWork_Piano_30_120BPM_LowNEL_Nrmlzd2_VBR5.mp3?expiration=1777388013818&token=CeQlyAlcWZaA9GmjkJg%2BmtWO5KNnRQJvmaG8SJMF%2BA0%3D",
        "https://audio2.brain.fm/Reflective%20Rhythm_Focus_Deep%20Work_LoFi_30_86bpm_HighNELNrmlzd2_VBR5.mp3?expiration=1777388121909&token=bGRi%2Fy4pTzDghfTLkAUAnbEXft4%2FFP1OoAZNqgQKMOk%3D",
        "https://audio2.brain.fm/Reflecting%20Pools%20Acoustic%20Focus%20Light%20Work%20Conor%20120bpm_1.3_Nrmlzd2_VBR5.mp3?expiration=1777388197327&token=kzn7hTQJoBAD5Lat6eYjdII%2F5VltrwQfuT4XUDg9hlU%3D",
        "https://audio2.brain.fm/OceanFocus_Focus_DeepWork_Beach_30_120bpm_HighNEL_Nrmlzd2_VBR5.mp3?expiration=1777388286807&token=XeLSpkbeveEMUl6np59JX9smNYiTlG1XutYwY2JDeEU%3D",
        "https://audio2.brain.fm/Focused%20Drops%20Rain%202%20Focus%20Chris%20120_Nrmlzd_VBR5.mp3?expiration=1777388351423&token=fCaeYwqjxPEXQ%2B8iphQ%2B9JbVYzDheMYaDIgD%2Bee1sKk%3D",
        "https://audio2.brain.fm/SandstoneCliffs_Focus_DeepWork_Piano_30_123bpm_MED%20NEL_Nrmlzd2_VBR5.mp3?expiration=1777388488219&token=EYrGKZ8VRL%2BKHz7bw7VnsgJXU%2FKyhQDKXoIm%2BXReuQY%3D",
        "https://audio2.brain.fm/Black%20Sands%20Ambient%20Focus%20Deep%20Work%20Conor%20120bpm_Nrmlzd2_VBR5.mp3?expiration=1777388545648&token=u4dAqgKnzZt9qaVQmkjjcMD3Eg%2BDzy7C1qDtMesfe%2F8%3D",
        "https://audio2.brain.fm/QuietGrove_Focus_DeepWork_Forest_30_120bpm_MedNEL_Nrmlzd2_VBR5.mp3?expiration=1777388601379&token=CKhDC%2BmczX9aL9CJfKhESpMTyHoKpFNLjGksTx8vvCI%3D",
        "https://audio2.brain.fm/Roots%26Ember_Focus_DeepWork_Forest_30_120bpm_LowNEL_Nrmlzd2_VBR5.mp3?expiration=1777388638244&token=EATsGEAmIF5zQg3HmW2HEj%2F8Uz2cJGcqLpmrn6KQb2Q%3D",
        "https://audio2.brain.fm/Fortified_Focus_DeepWork_Cinematic_112_LowNEL_Nrmlzd2_VBR5.mp3?expiration=1777388701331&token=fF9XQE28wqGYCZLyPlXshJjqUtULbmmIENq0OZcxQ44%3D",
        "https://audio2.brain.fm/ForbiddenFiles_Focus_DeepWork_Cinematic_30_116BPM_LowNEL_Nrmlzd2_VBR5.mp3?expiration=1777388742675&token=y2ZjZ9GrnhFV6eG5HF6arS7qLF3lJoekIT3GqzzohnE%3D",
        "https://audio2.brain.fm/Phantom%20Forest_Focus_DeepWork_Cinematic_30_90bpm_HighNEL_Nrmlzd2_VBR5.mp3?expiration=1777388808513&token=xwKxdO73AZSbRgadKqfhccTXRU%2FLwCESlPRVD6hq24k%3D",
        "https://audio2.brain.fm/FlutteringForest_Focus_DeepWork_Classical_30_110bpm_MedNEL_Nrmlzd2_VBR5.mp3?expiration=1777388862418&token=hbZh3RPlQBfxPOXbumzmZU%2BekG4cChhX7ciYTckg9H4%3D",
        "https://audio2.brain.fm/Fortuitous_Focus_DeepWork_Grooves_30_120bpm_HighNEL_Nrmlzd2_VBR5.mp3?expiration=1777389784424&token=QYn313dvXdA8POuqZfdd4e2a%2F3u9Rc0l1hn0d7ngDok%3D",
        "https://audio2.brain.fm/Mongabay_Focus_DeepWork_Rainforest_30_120bpm_HighNEL_Nrmlzd2_VBR5.mp3?expiration=1777389838569&token=D%2FQlWfa6ONOJEx7%2BTGDRFzRqKgnTBW8eHN9%2FYz%2Bg%2BLs%3D"
    ];

    // Helper: Clean Track Name
    function getTrackName(url) {
        // Extract filename from URL (between last / and ?)
        let name = url.substring(url.lastIndexOf('/') + 1, url.indexOf('?'));
        // Decode URI component
        name = decodeURIComponent(name);
        // Remove file extension and extra IDs, make it readable
        // Note: 'repklace' typo fixed to 'replace'
        name = name.replace(/_/g, ' ').replace(/.mp3/g, '').replace(/Nrmlzd2|VBR5|Focus|Deep|Work|Cinematic|Nrmlzd/gi, '').trim();
        // Fallback or further cleanup could go here
        return name.length > 25 ? name.substring(0, 25) + '...' : name;
    }

    const playlist = playlistURLs.map(url => ({
        url: url,
        name: getTrackName(url)
    }));

    // State
    let isRunning = false;
    let startTime = 0;
    let elapsedTime = 0;
    let timerInterval = null;
    let isMusicPlaying = false;
    let currentTrackIndex = 0;

    // Icons
    const pauseIcon = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/></svg>`;
    const playIcon = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 5V19L19 12L8 5Z" fill="currentColor"/></svg>`;

    // Helper: Format time as HH:MM:SS
    function formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const h = hours.toString().padStart(2, '0');
        const m = minutes.toString().padStart(2, '0');
        const s = seconds.toString().padStart(2, '0');

        return `${h}:${m}:${s}`;
    }

    // Helper: Update Timer Display
    function updateTimer() {
        const now = Date.now();
        const currentElapsed = elapsedTime + (now - startTime);
        timerDisplay.textContent = formatTime(currentElapsed);
    }

    // Helper: Load and play track
    function playTrack(index) {
        if (index >= playlist.length) index = 0;
        currentTrackIndex = index;
        audio.src = playlist[currentTrackIndex].url;

        // Ensure play is called and handled safely
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isMusicPlaying = true;
                musicBtn.innerHTML = pauseIcon;
                // If timer isn't running but session is active (rare edge case), start it
                if (isRunning && !timerInterval) {
                    startTime = Date.now();
                    timerInterval = setInterval(updateTimer, 1000);
                }
            }).catch(e => {
                console.error("Audio play failed, retrying next track:", e);
                // If a track fails, try the next one automatically to keep the flow
                setTimeout(() => nextTrack(), 1000);
            });
        }
    }

    // Action: Next Track
    function nextTrack() {
        if (!isRunning) return; // Only allow skipping when session is active
        let nextIndex = currentTrackIndex + 1;
        // Infinite Loop: If at end, go back to 0
        if (nextIndex >= playlist.length) nextIndex = 0;
        playTrack(nextIndex);
    }

    // Action: Toggle Music
    function toggleMusic() {
        if (audio.paused) {
            // Resume
            audio.play().then(() => {
                isMusicPlaying = true;
                musicBtn.innerHTML = pauseIcon;

                // Resume Timer
                startTime = Date.now();
                timerInterval = setInterval(updateTimer, 1000);
            }).catch(e => console.error("Audio resume failed:", e));
        } else {
            // Pause
            audio.pause();
            isMusicPlaying = false;
            musicBtn.innerHTML = playIcon;

            // Pause Timer
            clearInterval(timerInterval);
            timerInterval = null; // Clear reference
            elapsedTime += Date.now() - startTime;
        }
    }

    // Action: Start Session
    function startSession() {
        // UI Transitions
        landingPage.classList.remove('active');
        landingPage.classList.add('hidden');

        // Wait for exit animation to start entry
        setTimeout(() => {
            sessionPage.classList.remove('hidden');
            sessionPage.classList.add('active');
        }, 100);

        // Logic
        isRunning = true;
        elapsedTime = 0;
        startTime = Date.now();
        timerDisplay.textContent = "00:00:00";
        // Ensure only one interval is running
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(updateTimer, 1000);

        // Audio: Reset to first track or random
        currentTrackIndex = Math.floor(Math.random() * playlist.length);
        playTrack(currentTrackIndex);
    }

    // Action: Stop Session
    function stopSession() {
        // UI Transitions
        sessionPage.classList.remove('active');
        sessionPage.classList.add('hidden');

        setTimeout(() => {
            landingPage.classList.remove('hidden');
            landingPage.classList.add('active');
        }, 100);

        // Logic
        isRunning = false;
        clearInterval(timerInterval);
        elapsedTime = 0;

        // Audio
        audio.pause();
        audio.currentTime = 0; // Reset track position
        isMusicPlaying = false;
    }

    // Event Listeners
    playBtn.addEventListener('click', startSession);
    stopBtn.addEventListener('click', stopSession);
    musicBtn.addEventListener('click', toggleMusic);
    skipBtn.addEventListener('click', nextTrack);

    // Auto-play next track
    audio.addEventListener('ended', nextTrack);

    // Volume Control
    volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value;
    });
});
