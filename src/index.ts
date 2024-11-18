import tmi from 'tmi.js'

const client: tmi.Client = new tmi.Client({
    channels: ['elraphik']
})

client.connect();

client.on('message', (channel, tags, message, self) => {
    console.log(`[${tags['display-name']}: ${message}`)
})
