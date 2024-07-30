document.addEventListener('DOMContentLoaded', function() {
    const nsfwToggle = document.getElementById('nsfwToggle');
    const videoPlayer = document.getElementById('iptvPlayer');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const videoSource = document.getElementById('videoSource');

    let videos = [];
    let currentIndex = 0;

    function fetchVideoList() {
        fetch('videolist.json')
            .then(response => response.json())
            .then(data => {
                updateVideoList(data);
            })
            .catch(error => {
                console.error('Video list yüklenirken hata oluştu:', error);
            });
    }

    function updateVideoList(data) {
        if (nsfwToggle.checked) {
            videos = [...data.defaultVideos, ...data.nsfwVideos];
        } else {
            videos = [...data.defaultVideos];
        }
        currentIndex = Math.floor(Math.random() * videos.length);
        updateVideoSource();
    }

    function updateVideoSource() {
        videoSource.src = videos[currentIndex];
        videoPlayer.load();
    }

    nsfwToggle.addEventListener('change', function() {
        localStorage.setItem('nsfwEnabled', nsfwToggle.checked);
        updateVideoListFromLocal();
    });

    function updateVideoListFromLocal() {
        fetchVideoList();
    }

    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + videos.length) % videos.length;
        updateVideoSource();
    });

    nextButton.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % videos.length;
        updateVideoSource();
    });

    // Başlangıçta videoyu yükle
    fetchVideoList();
});
