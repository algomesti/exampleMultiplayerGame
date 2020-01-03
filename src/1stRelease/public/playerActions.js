export default function playerActions(game) {
    
    const observers = []

    function main(command, playerId = NaN) {
        
        if (command.type !== 'keydown-event') {
            return false
        }
        const acceptedPlayerActions = {
            ArrowUp(player) {
                if (player.y - 1 >= 0) {
                    player.y = player.y - 1
                }
                return true;
            },
            ArrowDown(player) {
                if (player.y + 1 < game.state.screen.height) {
                    player.y = player.y + 1
                }
                return true;
            },
            ArrowRight(player) {
                if (player.x + 1 < game.state.screen.width) {
                    player.x = player.x + 1
                }
                return true;
            },
            ArrowLeft(player) {
                if (player.x - 1 >= 0) {
                    player.x = player.x - 1
                } 
                return true; 
            }  
        }
        const player = game.state.players[command.playerId]  
        const keyPressed = command.keyPressed
        const actionFunction = acceptedPlayerActions[keyPressed]        
        if (player && actionFunction) {
            const move = actionFunction(player)
            if (move) {
                notifyAll(command)
            }
            return move
        }
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
       main,
       subscribe
    }
}
// Control
// Shift
// Tab
//a
//s
//d
//z
//x
//c
//Alt
//Meta