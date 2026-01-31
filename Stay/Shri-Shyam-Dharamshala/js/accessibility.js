// Font Size Controls
function increaseFont() {
    const body = document.body;
    if (!body.classList.contains('font-large')) {
        body.classList.add('font-large');
    } else if (!body.classList.contains('font-extra-large')) {
        body.classList.add('font-extra-large');
    }
}

function decreaseFont() {
    const body = document.body;
    body.classList.remove('font-extra-large');
    if (body.classList.contains('font-large')) {
        body.classList.remove('font-large');
    }
}

function resetFont() {
    const body = document.body;
    body.classList.remove('font-large', 'font-extra-large');
}
