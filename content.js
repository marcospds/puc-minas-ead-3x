// Função para remover imagens e alterar o rate do vídeo dentro de um iframe
function removeImagesAndChangeVideoRate(iframe) {
    try {
        let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        if (!iframeDoc) return;

        console.log("Verificando iframe:", iframe);

        // Remover imagens com src específico
        let images = iframeDoc.querySelectorAll('img[src="https://pucminas.instructure.com/courses/193634/files/11029810/preview"]');
        images.forEach(img => {
            console.log("Removendo imagem:", img);
            img.remove();
        });

        // Alterar o rate do vídeo
        let videos = iframeDoc.getElementsByTagName("video");
        for (let video of videos) {
            video.playbackRate = 2.0; // Mudar o rate do vídeo (ajuste conforme necessário)
            console.log("Alterando playbackRate do vídeo:", video);
        }

    } catch (err) {
        console.warn("Erro ao acessar iframe (CORS bloqueado?):", err);
    }
}

// Função que varre todos os iframes da página
function processIframes() {
    let iframes = document.getElementsByTagName("iframe");
    for (let iframe of iframes) {
        if (iframe.contentDocument || iframe.contentWindow.document) {
            removeImagesAndChangeVideoRate(iframe);
        } else {
            iframe.addEventListener("load", () => {
                removeImagesAndChangeVideoRate(iframe);
            });
        }
    }
}

// Criando o botão flutuante
const button = document.createElement("button");
button.innerText = "3x";  // Nome do botão
button.style.position = "fixed";
button.style.top = "20px";  // Distância do topo
button.style.right = "20px";  // Distância da direita
button.style.zIndex = 9999;  // Garantir que fique acima de outros elementos
button.style.padding = "10px 20px";
button.style.backgroundColor = "#ff6347";  // Cor de fundo
button.style.color = "white";  // Cor do texto
button.style.border = "none";
button.style.borderRadius = "5px";
button.style.cursor = "pointer";
button.style.fontSize = "16px";

// Adicionar o botão ao corpo da página
document.body.appendChild(button);

// Quando o botão for clicado, varre todos os iframes
button.addEventListener("click", () => {
    processIframes();
});
