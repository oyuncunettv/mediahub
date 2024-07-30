document.addEventListener('DOMContentLoaded', function() {
    const nsfwToggle = document.getElementById('nsfwToggle');
    const videoPlayer = document.getElementById('iptvPlayer');
    const videoSource = document.getElementById('videoSource');

    const defaultVideos = [
        'https://drive.google.com/file/d/1eFbeoNlIz3fECbyPtTbp25FBR83NFIJF/view?usp=drive_link',
        'https://drive.google.com/file/d/1Nka-LreEuPBnom6hWhcGYEOwnIzMsC3H/view?usp=drive_link',
        'https://drive.google.com/file/d/1Z7tCxYPC5edyqv2rpWBid5f7JtbA2-Tt/view?usp=drive_link',
        'https://drive.google.com/file/d/1WvdMQIvcAbVuToBTczJhDeswwh0JIqxk/view?usp=drive_link',
        'https://drive.google.com/file/d/1nvRJEhX4-D74ej0D6kXNjAEdF-orTmWc/view?usp=drive_link',
        'https://drive.google.com/file/d/1MEaDu_2g9jch1R7RELL0FOFdbMV0gXMt/view?usp=drive_link',
        'https://drive.google.com/file/d/1FmyC1NTHUqnIzmhO7gmAnQKv_lGwddoy/view?usp=drive_link',
        'https://drive.google.com/file/d/17cUraj2rI4Pej4rcYimSAUij4HDPDB1G/view?usp=drive_link',
        'https://drive.google.com/file/d/1HZnO8mjRDggt7ttDPV74__WLs_FFcFXb/view?usp=drive_link',
        'https://drive.google.com/file/d/1ubHiKWEh4ld090URknUnAKmdscV3PNGa/view?usp=drive_link',
        'https://drive.google.com/file/d/1u2NblT0zbZWDalAPqfuPwvOd8MZSEaHu/view?usp=drive_link',
        'https://drive.google.com/file/d/1VmuR9xv6ngj2HpbnRVsynqNMuVi-KiXt/view?usp=drive_link',
        // Diğer video yolları
    ];

    const nsfwVideos = [
        'https://drive.google.com/file/d/11kO58e2u-61y-rMftJsGmaV2of8uXE_-/preview',
        'https://drive.google.com/file/d/1K2q0CQT9FJFFddzXi6NCOpsH3579j6vI/preview',
        'https://drive.google.com/file/d/1lZAcfRi3E2UGiWzJHklYI6XMm5XZeKuB/preview',
        'https://drive.google.com/file/d/1YfkfGzBJeTv5IvaCyqnuJt9Y5E81OK-2/preview',
        // Diğer NSFW video yolları
    ];

    function getRandomVideo(videos) {
        const randomIndex = Math.floor(Math.random() * videos.length);
        return videos[randomIndex];
    }

    function updateVideoSource() {
        const videos = nsfwToggle.checked ? [...defaultVideos, ...nsfwVideos] : defaultVideos;
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
