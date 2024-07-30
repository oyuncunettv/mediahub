document.addEventListener('DOMContentLoaded', function() {
    const nsfwToggle = document.getElementById('nsfwToggle');
    const videoPlayer = document.getElementById('iptvPlayer');
    const videoSource = document.getElementById('videoSource');

    const defaultVideos = [
        'path/to/your/video1.mp4',
        'path/to/your/video2.mp4',
        // Diğer video yolları
    ];

    const nsfwVideos = [
        'path/to/your/nsfw/video1.mp4',
        'path/to/your/nsfw/video2.mp4',
        // Diğer NSFW video yolları
    ];

    function getRandomVideo(videos) {
        const randomIndex = Math.floor(Math.random() * videos.length);
        return videos[randomIndex];
    }

    function updateVideoSource() {
        const videos = nsfwToggle.checked ? defaultVideos : [...defaultVideos, ...nsfwVideos];
        videoSource.src = getRandomVideo(videos);
        videoPlayer.load();
    }

    function showAgeVerificationPopup() {
        if (!localStorage.getItem('ageVerified')) {
            const userResponse = confirm("18 Yaşından Büyük müsün?");
            if (userResponse) {
                localStorage.setItem('ageVerified', 'true');
                nsfwToggle.checked = false;
                updateVideoSource();
            } else {
                nsfwToggle.checked = true;
                updateVideoSource();
            }
        } else {
            nsfwToggle.checked = JSON.parse(localStorage.getItem('nsfwEnabled') ?? 'true');
            updateVideoSource();
        }
    }

    nsfwToggle.addEventListener('change', function() {
        if (nsfwToggle.checked) {
            showAgeVerificationPopup();
        } else {
            localStorage.setItem('nsfwEnabled', 'false');
            updateVideoSource();
        }
    });

    // İlk video yüklenirken
    showAgeVerificationPopup();
});
