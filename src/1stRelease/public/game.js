export default function createGame() {
    
    const state = {
        players: {},
        fruits : {},
        screen: {
            width: 10,
            height: 10
        }
    }

    const observers = []

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }

    function notifyAll(command) {
        for (const observerFunction of observers) {
            observerFunction(command)
        }
    }

    function setState(newState) {
        Object.assign(state, newState)
    }

    return {
        state,
        setState,
        subscribe,
    }
}   
