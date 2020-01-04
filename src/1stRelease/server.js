import express from 'express'
import http from 'http'
import createGame from './public/game.js'
import socketio from 'socket.io'
import playerActions from './public/playerActions.js'
import gameActions from './public/gameActions.js'
import gameEvents from './public/gameEvents.js'


const app = express()
const server = http.createServer(app)
const sockets = socketio(server)
const game = createGame()

app.use(express.static('public'))
const gameEventsInstance = gameEvents(game)

const playerActionsInstance = playerActions(game)

playerActionsInstance.subscribe((command) => {
    gameEventsInstance.checkForFruitCollision(command)
})
const gameActionsInstance = gameActions(game)
gameActionsInstance.subscribe((command) => {
    sockets.emit('add-fruit', command)
})

gameEventsInstance.subscribe((command) => {
    sockets.emit('remove-fruit', command)
    gameActionsInstance.removeFruit(command)
})
gameEventsInstance.subscribe(placar)


function placar(command) {
    console.log(command)
    const player = game.state.players[command.playerId]
    console.log('player', player)
    player.score = player.score + 1;
    const newCommand = {
        playerId: command.playerId,
        score: player.score
    }
    sockets.emit('update-score', newCommand)
    console.log('placar acionado', newCommand)
}

gameActionsInstance.startFruit(2000)

sockets.on('connection', (socket) => {

    const playerId = socket.id 
    gameActionsInstance.addPlayer({playerId: playerId})
    const command = {
        playerId: playerId,
        playerX: game.state.players[playerId].x,
        playerY: game.state.players[playerId].y,
        score: 0
    }
    socket.emit('setup', game.state)
    socket.broadcast.emit('add-player', command )
    
    socket.on('disconnect', () => {
        socket.emit('remove-player', {playerId: playerId}) 
        socket.broadcast.emit('remove-player', {playerId: playerId})
        gameActionsInstance.removePlayer({playerId: playerId})
    })

    socket.on('action-player', (command) => {
        command.playerId = playerId
        if (playerActionsInstance.main(command)) {
            socket.broadcast.emit('move-player', command)
        }     
    })

})
server.listen(
    3000,
    () => {
        console.log('server running on port 3000')   
    }
)
