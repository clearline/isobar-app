import { createConstants } from 'marty';
import keyMirror from 'keymirror';

export default {
    ActionTypes: createConstants([]),

    RouteNames: keyMirror({
        HOME: null
    }),

    Interactions: {},

    Status: keyMirror({
        PENDING: null,
        STARTED: null,
        FAILED: null,
        DONE: null
    })
};
