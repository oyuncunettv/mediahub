document.addEventListener('DOMContentLoaded', function() {
    const videoPlayer = document.getElementById('iptvPlayer');
    const videoSource = document.getElementById('videoSource');
    const prevButton = document.getElementById('prevVideo');
    const nextButton = document.getElementById('nextVideo');

    let videos = [];
    let currentIndex = 0;

    // Fetch video list from JSON file
    fetch('videolist.json')
        .then(response => response.json())
        .then(data => {
            // Combine and shuffle videos
            videos = [...data.defaultVideos, ...data.nsfwVideos];
            videos = shuffleArray(videos);
            if (videos.length > 0) {
                loadVideo();
            }
        })
        .catch(error => console.error('Error loading video list:', error));

    function loadVideo() {
        if (videos.length > 0) {
            videoSource.src = videos[currentIndex].url;
            videoPlayer.load();
        }
    }

    function showPrevVideo() {
        if (videos.length > 0) {
            currentIndex = (currentIndex - 1 + videos.length) % videos.length;
            loadVideo();
        }
    }

    function showNextVideo() {
        if (videos.length > 0) {
            currentIndex = (currentIndex + 1) % videos.length;
            loadVideo();
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    prevButton.addEventListener('click', showPrevVideo);
    nextButton.addEventListener('click', showNextVideo);
});
