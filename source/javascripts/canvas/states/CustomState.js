class CustomState extends Phaser.State {
    calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
        let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

        return {width: srcWidth * ratio, height: srcHeight * ratio};
    }
}

export default CustomState;
