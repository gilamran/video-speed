namespace VideoSpeed {
  export class EventsMapper {
    private m_eventCallback : (event:KeyboardEvent) => any;

    constructor(private eventsHandler:EventsHandler) {
      this.addEventListeners();
    }

    private addEventListeners() {
      this.m_eventCallback = (event:KeyboardEvent) => this.onKeyDown(event);
      window.addEventListener('keydown', this.m_eventCallback);
    }

    private removeEventListeners() {
      window.removeEventListener('keydown', this.m_eventCallback);
    }

    private onKeyDown(event:KeyboardEvent) {
      // TODO: ignore event when input/textarea is on focus
      var activeElement : Element = document.activeElement;
      if (activeElement && (activeElement.tagName==='INPUT' || (activeElement.tagName==='TEXTAREA'))) {
        return;
      }

      switch (event.keyCode) {
        case 219: this.eventsHandler.subtractFromPlaybackRate(); break; // [ key
        case 221: this.eventsHandler.addToPlaybackRate(); break;        // ] key
        case 48:  this.eventsHandler.resetPlaybackRate(); break;        // 0 key
        case 187: this.eventsHandler.skipForward(); break;              // + key
        case 189: this.eventsHandler.skipBack(); break;                 // - key
      }
    }

    public dispose() {
      this.removeEventListeners();
    }
  }
}
