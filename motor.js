document.addEventListener('DOMContentLoaded', function() {
    // Função para configurar os controles de visualização para cada iframe
    function setupDeviceControls(radioName, iframeId) {
        const radios = document.querySelectorAll(`input[name="${radioName}"]`);
        const iframe = document.getElementById(iframeId);
        
        if (radios.length && iframe) {
            radios.forEach(radio => {
                radio.addEventListener('change', function() {
                    const detailsElement = this.closest('details');
                    const controlsPosition = detailsElement.querySelector('.device-controls').getBoundingClientRect();
                    
                    iframe.width = this.value;
                    if (this.value == '450') {
                        iframe.height = '600'; // Altura para mobile
                    } else {
                        iframe.height = '700'; // Altura para desktop
                    }
                    
                    // Mantém a posição de visualização nos controles
                    if (detailsElement.open) {
                        requestAnimationFrame(() => {
                            window.scrollTo({
                                top: window.scrollY + controlsPosition.top - 20,
                                behavior: 'smooth'
                            });
                        });
                    }
                });
            });
        }
    }

    // Configurar cada projeto
    setupDeviceControls('jadWidthOption', 'jadmarketing');
    setupDeviceControls('contWidthOption', 'contabil');
    setupDeviceControls('landgWidthOption', 'landg');
    setupDeviceControls('repWidthOption', 'rep');

    // Definir visualização padrão para cada dispositivo
    function setDefaultView() {
        const isMobile = window.innerWidth <= 768;
        
        document.querySelectorAll('details').forEach(detail => {
            const mobileRadio = detail.querySelector('input[value="450"]');
            const desktopRadio = detail.querySelector('input[value="1020"]');
            
            if (isMobile && mobileRadio && !mobileRadio.checked) {
                mobileRadio.checked = true;
                mobileRadio.dispatchEvent(new Event('change'));
            } else if (!isMobile && desktopRadio && !desktopRadio.checked) {
                desktopRadio.checked = true;
                desktopRadio.dispatchEvent(new Event('change'));
            }
        });
    }

    // Configurar visualização inicial com base no dispositivo
    setDefaultView();
    
    // Atualizar visualização quando a janela for redimensionada
    window.addEventListener('resize', function() {
        setDefaultView();
    });
    
    // Adicionar evento para manter controles visíveis ao abrir details
    document.querySelectorAll('details').forEach(detail => {
        detail.addEventListener('toggle', function() {
            if (this.open) {
                const controls = this.querySelector('.device-controls');
                if (controls) {
                    requestAnimationFrame(() => {
                        const controlsRect = controls.getBoundingClientRect();
                        if (controlsRect.top < 0 || controlsRect.top > window.innerHeight) {
                            window.scrollTo({
                                top: window.scrollY + controlsRect.top - 20,
                                behavior: 'smooth'
                            });
                        }
                    });
                }
            }
        });
    });

    const thumbnails = document.querySelectorAll('.thumbnail');
    const projectIframe = document.getElementById('project-iframe');
    const projectDescription = document.getElementById('project-description');
    const widthOptions = document.querySelectorAll('input[name="widthOption"]');
    const mainViewer = document.getElementById('main-viewer');

    function updateViewer(thumbnail) {
        // Remove a classe 'active' de todas as miniaturas
        thumbnails.forEach(t => t.classList.remove('active'));
        // Adiciona a classe 'active' à miniatura clicada
        thumbnail.classList.add('active');

        const url = thumbnail.dataset.url;
        const description = thumbnail.dataset.description;
        const defaultView = thumbnail.dataset.defaultView || 'mobile';

        projectIframe.src = url;
        projectDescription.innerHTML = description;

        // Define a visualização padrão (mobile ou desktop)
        let desiredWidth = 450;
        if (defaultView === 'desktop') {
            document.querySelector('input[name="widthOption"][value="1020"]').checked = true;
            desiredWidth = 1020;
        } else {
            document.querySelector('input[name="widthOption"][value="450"]').checked = true;
        }
        projectIframe.width = desiredWidth;
        
        // Rola a página para o topo do visualizador
        mainViewer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Configura o primeiro projeto ao carregar a página
    if (thumbnails.length > 0) {
        updateViewer(thumbnails[0]);
    }

    // Adiciona o evento de clique para cada miniatura
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            updateViewer(thumbnail);
        });
    });

    // Adiciona o evento de mudança para os botões de rádio de largura
    widthOptions.forEach(option => {
        option.addEventListener('change', function() {
            projectIframe.width = this.value;
            // Recarrega o iframe para reiniciar animações
            projectIframe.src = projectIframe.src;
        });
    });
});