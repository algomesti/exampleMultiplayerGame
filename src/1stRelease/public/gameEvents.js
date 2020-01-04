export default function gameEvents(game) {
    
    const observers = []

    function subscribe(observersFunction) {
        observers.push(observersFunction)
    }

    function notifyAll(command) {
        for (const observerFunction of observers) {
            observerFunction(command)
        }
    }

    function checkForFruitCollision(command) {
        console.log('check colisao',  command.playerId)
        const playerId = command.playerId
        const player = game.state.players[playerId]
    
        
        for (const fruitId in game.state.fruits) {
            const fruit = game.state.fruits[fruitId]
            if (player.x === fruit.x && player.y === fruit.y) {
                const command = {
                    fruitId: fruitId,
                    fruitX: fruit.x,
                    fruitY: fruit.y,
                    playerId: playerId,
                }
                notifyAll(command)
                return
            }
        }
    }

    return {
        checkForFruitCollision,
        subscribe
    }
    
}
