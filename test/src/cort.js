const cron = require("node-cron")
const axios = require("axios")

const Monitor = require("../models/Monitor")

cron.schedule("* * * * *", async ()=>{

    console.log("Checking Websites...")

    const monitors = await Monitor.find()

    for(let monitor of monitors){

        try{

            const start = Date.now()

            await axios.get("https://google.com")

            const end = Date.now()

            monitor.status = "UP"

            monitor.responseTime = end - start

            monitor.lastChecked = new Date()

            await monitor.save()

            console.log(`${monitor.url} is UP`)

        }catch(error){

            monitor.status = "DOWN"

            monitor.lastChecked = new Date()

            await monitor.save()

            console.log(`${monitor.url} is DOWN`)
        }

    }

})