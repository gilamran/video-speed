namespace VideoSpeed {
  export class InfoBubble {
    private m_bubbleElement   : HTMLElement;
    private m_fadeTimeoutId   : number;

    constructor() {
    }

    private static createBubbleElement() {
      var result : HTMLElement = document.createElement("div");
      result.classList.add('videoSpeed');
      result.classList.add('speedIndicator');
      return result;
    }

    private get bubbleElement() {
      if (!this.m_bubbleElement) {
        this.m_bubbleElement = InfoBubble.createBubbleElement();
      }
      return this.m_bubbleElement;
    }

    private placeBubbleOnElement(element:HTMLElement):void {
      element.appendChild(this.bubbleElement);
    }

    private fadeInBubbleV():void {
      this.bubbleElement.classList.remove('fadeout');
      this.bubbleElement.classList.add('fadein');
    }

    private fadeOutBubble():void {
      this.bubbleElement.classList.remove('fadein');
      this.bubbleElement.classList.add('fadeout');
    }

    private setBubbleText(text:string):void {
      this.bubbleElement.innerHTML = text;
    }

    private faceOutBubble():void {
      if (this.m_fadeTimeoutId != null)
        clearTimeout(this.m_fadeTimeoutId);

      this.m_fadeTimeoutId = setTimeout(() => {
        this.fadeOutBubble();
        this.m_fadeTimeoutId = null;
      }, 500);
    }

    public showTextOnVideoElement(text:string, videoElement:HTMLVideoElement):void {
      this.placeBubbleOnElement(videoElement.parentElement);
      this.setBubbleText(text);
      this.fadeInBubbleV();
      this.faceOutBubble();
    }

    public dispose() {
    }
  }
}
