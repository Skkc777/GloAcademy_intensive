export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioStop = document.querySelector('.radio-stop');

    // сложная конструкция создания обьекта. Создаем новый обьект Audio;
    const audio = new Audio();
    audio.type = 'audio/aac';

    // Отключаем кнопку Плей в меню Радио;
    radioStop.disabled = true;


    // Смена иконки плей и пауза, также реализуем Css-animation with classlist play;
    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.remove('fa-pause');
            radioStop.classList.add('fa-play');
        } else {
            radio.classList.add('play');
            radioStop.classList.add('fa-pause');
            radioStop.classList.remove('fa-play');
        }
    };

    // функция для ободка при прослушивании определенной станции, вывод через parrent;
    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    };


    // меняет положение кнопки за счет события change; click and changes radio input,
    // as in html radio input with a name the same for all;
    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        // получаем Родителя по классу, для выполнения анимации и смены иконки и текста при воиспр.
        const parrent = target.closest('.radio-item');
        selectItem(parrent);
        // обращаемся к radio-name и изменяем название в cls Radio-header__big;
        const titleName = parrent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = titleName;
        // таким же способом обращаемся к источнику картинки и классу и меняем картинку на картинку Радио воиспроизвед.;
        const urlImg = parrent.querySelector('.radio-img').src;
        radioCoverImg.src = urlImg;
        // включаем кнопку воспроизведения музыки;
        radioStop.disabled = false;
        // выводим через Js ссылку на радио ссылки(dataset and here u have log with piece info dom object when click);
        audio.src = target.dataset.radioStantion;
        // just for play( audio has method for use play);
        audio.play();
        changeIconPlay();
    });

    // Stop and Play;
    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    });
};