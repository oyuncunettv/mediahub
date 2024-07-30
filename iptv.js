document.addEventListener('DOMContentLoaded', function() {
    const nsfwToggle = document.getElementById('nsfwToggle');
    const videoPlayer = document.getElementById('iptvPlayer');
    const videoSource = document.getElementById('videoSource');
    const prevButton = document.getElementById('prevVideo');
    const nextButton = document.getElementById('nextVideo');

    let videos = [];
    let currentIndex = 0;

    fetch('videolist.json')
        .then(response => response.json())
        .then(data => {
            videos = nsfwToggle.checked ? data.nsfwVideos : data.defaultVideos;
            videos = shuffleArray(videos);
            updateVideoSource();
        })
        .catch(error => console.error('Error loading video list:', error));

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function updateVideoSource() {
        if (videos.length > 0) {
            videoSource.src = videos[currentIndex];
            videoPlayer.load();
        }
    }

    function showPreviousVideo() {
        if (videos.length > 0) {
            currentIndex = (currentIndex - 1 + videos.length) % videos.length;
            updateVideoSource();
        }
    }

    function showNextVideo() {
        if (videos.length > 0) {
            currentIndex = (currentIndex + 1) % videos.length;
            updateVideoSource();
        }
    }

    nsfwToggle.addEventListener('change', function() {
        fetch('videolist.json')
            .then(response => response.json())
            .then(data => {
                videos = nsfwToggle.checked ? data.nsfwVideos : data.defaultVideos;
                videos = shuffleArray(videos);
                currentIndex = 0; // Reset index
                updateVideoSource();
            })
            .catch(error => console.error('Error loading video list:', error));
    });

    prevButton.addEventListener('click', showPreviousVideo);
    nextButton.addEventListener('click', showNextVideo);
});
