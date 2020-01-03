export default function gameActions(game) {

    const observers = []
    function startFruit(frequency) {
        setInterval(addFruit, frequency)
    }
    function addPlayer(command) {
        const playerId = command.playerId
        const playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random() * game.state.screen.width)
        const playerY = 'playerY' in command ? command.playerY : Math.floor(Math.random() * game.state.screen.height)
        
        game.state.players[playerId] = {
            x: playerX,
            y: playerY
        }
    }

    function removePlayer(command) {
        const playerId = command.playerId
        delete game.state.players[playerId]
    }

    function addFruit(command) {
        const fruitId = command ? command.fruitId : Math.floor(Math.random() * 10000000)
        const fruitX = command ? command.fruitX : Math.floor(Math.random() * game.state.screen.width)
        const fruitY = command ? command.fruitY : Math.floor(Math.random() * game.state.screen.height)
     
        game.state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }
        
        notifyAll({
            type: 'add-fruit',
            fruitId: fruitId,
            fruitX: fruitX,
            fruitY: fruitY
        })
        
    }

    function removeFruit(command) {
        const fruitId = command.fruitId
        delete game.state.fruits[fruitId]   
    }

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }

    function notifyAll(command) {
        for (const observerFunction of observers) {
            observerFunction(command)
        }
    }
    return {
        startFruit,
        addPlayer,
        addFruit,
        removePlayer,
        removeFruit,
        subscribe
    }
    
}
