var events = {};
var hOP = events.hasOwnProperty;

export type EventType = "refreshPage";

export default {
  subscribe(event: EventType, listener: Function) {
    // Create the event's object if not yet created
    if (!hOP.call(events, event)) {
      events[event] = [];
    }

    // Add the listener to queue
    var index = events[event].push(listener) - 1;

    // Provide handle back for removal of event
    return {
      remove() {
        delete events[event][index];
      },
    };
  },

  publish(event: EventType, args?: any) {
    // If the event doesn't exist, or there's no listeners in queue, just leave
    if (!hOP.call(events, event)) {
      return;
    }

    // Cycle through events queue, fire!
    events[event].forEach((fn: any) => {
      fn(args);
    });
  },
};
