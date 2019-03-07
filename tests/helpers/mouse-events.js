//synthetic mouse event helpers lovingly stolen from @shopify/draggable:
//https://github.com/Shopify/draggable/tree/v1.0.0-beta.8/scripts/test
import { assign } from '@ember/polyfills';
import { later } from '@ember/runloop';
import { Promise } from 'rsvp';

//https://github.com/Shopify/draggable/blob/v1.0.0-beta.8/scripts/test/helpers/constants.js
export const defaultMouseEventOptions = {
    button: 0,
    clientX: 0,
    clientY: 0
};

//https://github.com/Shopify/draggable/blob/v1.0.0-beta.8/scripts/test/helpers/environment.js
export function withElementFromPoint(elementFromPoint, callback) {
    const originalElementFromPoint = document.elementFromPoint;
    document.elementFromPoint = () => elementFromPoint;
    callback();
    document.elementFromPoint = originalElementFromPoint;
}

//https://github.com/Shopify/draggable/blob/v1.0.0-beta.8/scripts/test/helpers/event.js
export function triggerEvent(element, type, data = {}) {
    const event = document.createEvent('Event');
    event.initEvent(type, true, true);

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            Object.defineProperty(event, key, {
                value: data[key],
            });
        }
    }

    withElementFromPoint(element, () => {
        element.dispatchEvent(event);
    });

    return event;
}

//https://github.com/Shopify/draggable/blob/v1.0.0-beta.8/scripts/test/helpers/sensor.js
export function clickMouse(element, options = {}) {
    return triggerEvent(element, 'mousedown', assign({}, defaultMouseEventOptions, options));
}

export function moveMouse(element, options = {}) {
    return triggerEvent(element, 'mousemove', assign({}, defaultMouseEventOptions, options));
}

export function releaseMouse(element, options = {}) {
    return triggerEvent(element, 'mouseup', assign({}, defaultMouseEventOptions, options));
}

export function waitFor(ms) {
    return new Promise((resolve) => {
        later(this, () => resolve(), ms);
    })
}
