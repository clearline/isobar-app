import { handles, Store } from 'marty';
import { fromJS } from 'immutable';

import { ActionTypes, Interactions, Statuses } from '../constants';

export default class InteractionStore extends Store {
    constructor(options) {
        super(options);

        this.state = fromJS({
            errors: {},
            status: {}
        });
    }

    _setPending(key) {
        this.state = this.state.withMutations(s => {
            s.deleteIn(['errors', key]);
            s.setIn(['status', key], Status.PENDING);
        });
    }

    _setStarted(key) {
        this.state = this.state.withMutations(s => {
            s.deleteIn(['errors', key]);
            s.setIn(['status', key], Status.STARTED);
        });
    }

    _setFailed(key, err) {
        this.state = this.state.withMutations(s => {
            s.setIn(['errors', key], err);
            s.setIn(['status', key], Status.FAILED);
        });
    }

    _setDone(key) {
        this.state = this.state.setIn(['status', key], Status.DONE);
    }

    getError(key) {
        return this.state.getIn(['errors', key]);
    }

    getStatus(key) {
        return this.state.getIn(['status', key], Status.PENDING);
    }
}
