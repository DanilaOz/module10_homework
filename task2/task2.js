const btn = document.querySelector('.btn-request');

btn.addEventListener('click', () => {

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    alert(`Размер экрана составляет ${screenWidth}x${screenHeight}px`);

});