// Logic for handling camera operations

const camera = {

    player: document.querySelector('#player'),
    canvas: document.querySelector('#canvas'),
    ctx: canvas.getContext('2d'),
    captureButton: document.querySelector('#camera-capture'),

    init() {
        this.captureButton.addEventListener('click', () => this.capture());
    },

    async openVideoStream() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            this.player.srcObject = stream;
        } catch (err) {
            console.log(err);
        }
    },

    capture() {
        console.log('chk');
        this.ctx.drawImage(this.player, 0, 0, this.canvas.width, this.canvas.height);
    }

}


// When we switch to the camera view, initialize the camera
document.querySelector('#camera-button').addEventListener('click', () => {
    camera.init();
    camera.openVideoStream();
});
