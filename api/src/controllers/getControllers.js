const playersFromDB= require("./utils");

const asyncGetPlayers= async (req, res)=> {
    try {
        const allPlayers= await playersFromDB();
        allPlayers? res.status(200).json(allPlayers) : null;
    } catch (error) {
        console.log({error: error.message})
        
    }
}

module.exports= {playersFromDB,
asyncGetPlayers}