document.addEventListener('DOMContentLoaded', function() {
    const radios = document.querySelectorAll('input[name="widthOption"]');
    const iframe = document.querySelector('iframe#contabil');
    const iframe2 = document.querySelector('iframe#landg');

    radios.forEach(radio => {
        radio.addEventListener('change', function() {
            iframe.width = this.value;
            iframe2.width = this.value;
        });
    });
});