const body = document.getElementById('root');

export const fullScreenOpen = () => {
    if (body.requestFullscreen) {
        body.requestFullscreen();
    } else if (body.webkitrequestFullscreen) {
        body.webkitRequestFullscreen();
    } else if (body.mozRequestFullscreen) {
        body.mozRequestFullScreen();
    }
}

export const fullScreenCancel = () => {
    if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.mozCancelFullScreen) {
        document.mozRequestFullScreen();
    }
}