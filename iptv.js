document.addEventListener("DOMContentLoaded", function() {
    let videoList = [];
    let currentIndex = 0;

    // Videoları JSON'dan al
    fetch('videolist.json')
        .then(response => response.json())
        .then(data => {
            // NSFW ve default videoları birleştir
            videoList = [...data.defaultVideos, ...data.nsfwVideos];
            // Videoları karıştır
            videoList = videoList.sort(() => Math.random() - 0.5);
            loadVideo();
        })
        .catch(error => console.error('JSON yüklenirken hata:', error));

    function loadVideo() {
        if (videoList.length > 0) {
            const videoPlayer = document.getElementById('iptvPlayer');
            const videoSource = document.getElementById('videoSource');
            videoSource.src = videoList[currentIndex];
            videoPlayer.load();
        }
    }

    document.getElementById('prevVideo').addEventListener('click', function() {
        if (videoList.length > 0) {
            currentIndex = (currentIndex - 1 + videoList.length) % videoList.length;
            loadVideo();
        }
    });

    document.getElementById('nextVideo').addEventListener('click', function() {
        if (videoList.length > 0) {
            currentIndex = (currentIndex + 1) % videoList.length;
            loadVideo();
        }
    });

    document.getElementById('nsfwToggle').addEventListener('change', function() {
        const isNSFW = this.checked;
        fetch('videolist.json')
            .then(response => response.json())
            .then(data => {
                if (isNSFW) {
                    videoList = data.nsfwVideos;
                } else {
                    videoList = data.defaultVideos;
                }
                videoList = videoList.sort(() => Math.random() - 0.5);
                currentIndex = 0;
                loadVideo();
            });
    });
});
