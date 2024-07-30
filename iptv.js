document.addEventListener('DOMContentLoaded', function() {
    const nsfwToggle = document.getElementById('nsfwToggle');
    const videoPlayer = document.getElementById('iptvPlayer');

    const loadVideoList = async () => {
        try {
            const response = await fetch('videolist.json');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Video listesi yüklenirken bir hata oluştu:', error);
            return { defaultVideos: [], nsfwVideos: [] };
        }
    };

    const getRandomVideo = (videos) => {
        const randomIndex = Math.floor(Math.random() * videos.length);
        return videos[randomIndex];
    };

    const updateVideoSource = (videos) => {
        videoPlayer.src = getRandomVideo(videos);
        videoPlayer.load();
    };

    nsfwToggle.addEventListener('change', async function() {
        const { defaultVideos, nsfwVideos } = await loadVideoList();
        const videos = nsfwToggle.checked ? defaultVideos : [...defaultVideos, ...nsfwVideos];
        updateVideoSource(videos);
        localStorage.setItem('nsfwEnabled', nsfwToggle.checked);
    });

    // Sayfa yüklendiğinde
    (async () => {
        const { defaultVideos, nsfwVideos } = await loadVideoList();
        const nsfwEnabled = JSON.parse(localStorage.getItem('nsfwEnabled') ?? 'true');
        nsfwToggle.checked = !nsfwEnabled;
        const videos = nsfwEnabled ? [...defaultVideos, ...nsfwVideos] : defaultVideos;
        updateVideoSource(videos);
    })();
});
