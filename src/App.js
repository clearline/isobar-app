import { Application } from 'marty';

import interactionStore from './stores/InteractionStore';

export default class App extends Application {
    constructor(options) {
        super(options);

        this.register({
            core: {
                interactionStore
            }
        });
    }
}
