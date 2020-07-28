export const videoPlayerInit = () => {
        const videoPlayer = document.querySelector('.video-player'),
        videoButtonPlay = document.querySelector('.video-button__play'),
        videoButtonStop = document.querySelector('.video-button__stop'),
        videoTimePassed = document.querySelector('.video-time__passed'),
        videoProgress = document.querySelector('.video-progress'),
        videoTimeTotal = document.querySelector('.video-time__total');

    // Смена иконки плей и пауза
    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    };

    // запуск Плеера с условием если пауза нажата и клик то запуск плеера и если false (click) то приостанавливает;
    const togglePlayAndPause = () => {

        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    };

    // функция сброса плея на начало видео; 
    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;

    };
    // вся суть:  перем. имеет число, выполняем функцию, в которой число МЕНЬШЕ 10 (?)--означает IF(TRUE)
    //  если TRUE, то добавляет 0 в значение, (:)--если FALSE, то оставляет значение неизменным.
    const addZero = n => n < 10 ? '0' + n : n;

    // создаем события клика для запуска функции;
    videoPlayer.addEventListener('click', togglePlayAndPause);
    videoButtonPlay.addEventListener('click', togglePlayAndPause);

    // события в аудио и видео плеерах play and pause и запуск функции смены иконки;
    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    // сброс времени при клике на значок;
    videoButtonStop.addEventListener('click', stopPlay);

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const durationTime = videoPlayer.duration;

        // указывает новое значения после смены времени в процентах 100%  то есть 23 сек / 63 сек * 100 = 36% passed
        videoProgress.value = (currentTime / durationTime) * 100;

        // здесь общее время которое прошло в минутах и секундах
        let minutesPassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);

        // здесь время которое общее 
        let minutesTotal = Math.floor(durationTime / 60);
        let secondsTotal = Math.floor(durationTime % 60);

        // присваиваем классам новое значение для вывода в плеере;
        videoTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
    });
                                  // change используется для аудио и видео плееров 
    videoProgress.addEventListener('change', () => {
      
        // создание новой переменной для изменения времени по желанию;
        const durationTime = videoPlayer.duration;
        const value = videoProgress.value;

        // здесь указываем значение в секундах куда мы хотим переместить ползунок на значение до 100%;
        videoPlayer.currentTime = (value) * durationTime / 100;
    });
};