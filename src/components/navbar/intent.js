import xs from 'xstream';

export function intent({DOM, HTTP, storage, glue, props}) {

    /**
     * DOM intents including:
     * - Signin & signup buttons.
     * - Logout button.
     * - Angular handled route links.
     * - Open notifications link.
     */
    const modalLink$ = DOM.select('.modal-link').events('click')
        .map(event => ({modal: event.target.dataset.modal, data: event.target.dataset}));

    const logoutLink$ = DOM.select('#logout').events('click').mapTo(true);
    
    const openNotifications$ = DOM.select('#notifications').events('click');

    /**
     * HTTP read effects including: 
     * - Logged user data.
     * - Incoming notifications response.
     * - Socket.IO user channel messages.
     */
    const notifications$ = HTTP.select('notifications')
        .map(response$ => response$.replaceError(err => xs.of(err)))
        .flatten()
        .filter(res => !(res instanceof Error))
        .map(res => res.body);

    //const userChan$ = user$.map(user => socketIO.get(`user ${user.id} notification`))
    //    .flatten()
    //    .debug();
    const userChan$ = xs.empty();

    return {
        modalLink$, 
        logoutLink$, 
        notifications$, 
        userChan$, 
        openNotifications$,
        authToken$: props.authToken$,
    };
};