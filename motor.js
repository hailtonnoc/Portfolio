document.addEventListener('DOMContentLoaded', function() {
    const radios = document.querySelectorAll('input[name="widthOption"]');
    const iframe = document.querySelector('iframe#contabil');

    radios.forEach(radio => {
        radio.addEventListener('change', function() {
            iframe.width = this.value;
        });
    });
});