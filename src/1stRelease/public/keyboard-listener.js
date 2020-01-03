export default function createKeyboardListener(document) {

    document.addEventListener('keydown', handleKeyDown)

    const state = {
        playerId: NaN,
        observers: []
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function registerPlayerId(playerId) {
        state.playerId = playerId
    }

    function notifyAll(command) {
        for (const observerFunction of state.observers) {            
            observerFunction(command)
        }
    }

    function handleKeyDown(event) {

        const playerId = state.playerId    
        if (playerId === NaN) {
            return
        }
        const keyPressed = event.key
        const command = {
            type: 'keydown-event',
            playerId,
            keyPressed
        }
        notifyAll(command)

    }

    return {
        subscribe,
        registerPlayerId
    }
}