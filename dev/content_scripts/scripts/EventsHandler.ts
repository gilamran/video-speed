namespace VideoSpeed {
  export class EventsHandler {
    private static STEP_SIZE = 0.02;
    private static SKIP_SIZE = 5.00;

    constructor(private infoBubble:InfoBubble) {
    }

    private setPlaybackRate(videoElement:HTMLVideoElement, playbackRate:number) {
      this.infoBubble.showTextOnVideoElement("Speed is x" + playbackRate.toFixed(2), videoElement);
      videoElement.playbackRate = playbackRate;
    }

    public subtractFromPlaybackRate() {
      VideoElementsManager.videoElements.forEach((videoElement) => {
        var newRate = Math.max(0.5, videoElement.playbackRate - EventsHandler.STEP_SIZE);
        this.setPlaybackRate(videoElement, newRate);
      });
    }

    public addToPlaybackRate() {
      VideoElementsManager.videoElements.forEach((videoElement) => {
        var newRate = Math.min(4.0, videoElement.playbackRate + EventsHandler.STEP_SIZE);
        this.setPlaybackRate(videoElement, newRate);
      });
    }

    public resetPlaybackRate() {
      VideoElementsManager.videoElements.forEach((videoElement) => {
        this.setPlaybackRate(videoElement, 1.0);
      });
    }

    public skipForward() {
      VideoElementsManager.videoElements.forEach((videoElement) => {
        videoElement.currentTime = Math.min(videoElement.duration, videoElement.currentTime + EventsHandler.SKIP_SIZE);
      });
    }

    public skipBack() {
      VideoElementsManager.videoElements.forEach((videoElement) => {
        videoElement.currentTime = Math.max(0, videoElement.currentTime - EventsHandler.SKIP_SIZE);
      });
    }
  }
}
