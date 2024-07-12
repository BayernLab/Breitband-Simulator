let intervals = [];
let activeButton = null; // Variable für den aktuell aktiven Button

function startAllDownloads(fileSize, button) {
    // Überprüfen, ob bereits ein anderer Button aktiv ist
    if (activeButton && activeButton !== button) {
        activeButton.classList.remove('active');
    }

    // Setze den aktiven Button auf den aktuellen Button
    activeButton = button;

    // Alle vorherigen Intervalle löschen
    intervals.forEach(clearInterval);
    intervals = [];

    // Fortschrittsbalken und Texte zurücksetzen
    resetProgressBar('progress-bar-16', 'time-16');
    resetProgressBar('progress-bar-100', 'time-100');
    resetProgressBar('progress-bar-400', 'time-400');
    resetProgressBar('progress-bar-1000', 'time-1000');
    resetProgressBar('progress-bar-10000', 'time-10000');

    // Aktiviere den Button visuell
    button.classList.add('active');

    // Neue Downloads starten
    simulateDownload(16, fileSize, 'progress-bar-16', 'time-16');
    simulateDownload(100, fileSize, 'progress-bar-100', 'time-100');
    simulateDownload(400, fileSize, 'progress-bar-400', 'time-400');
    simulateDownload(1000, fileSize, 'progress-bar-1000', 'time-1000');
    simulateDownload(10000, fileSize, 'progress-bar-10000', 'time-10000');
}

function resetProgressBar(barId, timeId) {
    const progressBar = document.getElementById(barId);
    progressBar.style.width = '0%';
    progressBar.textContent = '0%';
    document.getElementById(timeId).textContent = '';
}

function simulateDownload(speed, fileSize, barId, timeId) {
    const timeInSeconds = (fileSize * 8) / speed; // Zeit in Sekunden
    const progressBar = document.getElementById(barId);
    const timeDisplay = document.getElementById(timeId);

    let width = 0;
    const intervalTime = timeInSeconds * 10; // Fortschritt in 0.1%-Schritten
    const interval = setInterval(() => {
    
        if (width >= 100) {
            clearInterval(interval);
            timeDisplay.textContent = formatTime(timeInSeconds);
        } else {
            width++;
            progressBar.style.width = width + '%';
            progressBar.textContent = width + '%';
        }

    }, intervalTime);
    //timeDisplay.textContent = formatTime(timeInSeconds);

    // Intervalle speichern, um sie später löschen zu können
    intervals.push(interval);
}

function formatTime(seconds) {
    if (seconds > 3600) {
        // Mehr als 60 Minuten: Stunden, Minuten und Sekunden anzeigen
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours}h ${minutes}min ${remainingSeconds}sek`;
    } else if (seconds > 60) {
        // Mehr als 60 Sekunden: Minuten und Sekunden anzeigen
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}min ${remainingSeconds}sek`;
    } else {
        // Weniger als 60 Sekunden: Nur Sekunden anzeigen
        return `${seconds}sek`;
    }
}

function allProgressBarsComplete() {
    // Überprüfe, ob alle Fortschrittsbalken 100% erreicht haben
    const progressBars = ['progress-bar-16', 'progress-bar-100', 'progress-bar-400', 'progress-bar-1000', 'progress-bar-10000'];
    return progressBars.every(barId => {
        const progressBar = document.getElementById(barId);
        return progressBar.style.width === '100%';
    });
}
