namespace VideoSpeed {
  export class VideoElementsManager {

    constructor() {
    }

    private static isVideoElementValid(videoElement:HTMLVideoElement):boolean {
      return !!(videoElement && !isNaN(videoElement.duration) && videoElement.currentTime > 0 && !videoElement.paused && !videoElement.ended && videoElement.readyState > 2);
    }

    public static get videoElements():HTMLVideoElement[] {
      var elementsList : NodeListOf<HTMLVideoElement> = document.getElementsByTagName("video");
      var result : HTMLVideoElement[] = [];
      for (var i:number=0; i<elementsList.length; i++) {
        var videoElement : HTMLVideoElement = elementsList[i];
        if (VideoElementsManager.isVideoElementValid(videoElement))
          result.push(videoElement);
      }

//      console.log(`Video Speed found ${elementsList.length} Video elements, ${result.length} are valid. at ${window.location}`);
      return result;
    }
  }
}
