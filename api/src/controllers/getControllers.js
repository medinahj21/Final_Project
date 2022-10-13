const { Player }= require ("../db");

const playersFromDB= async () => {
    try {
      const myPlayers= await Player.findAll();
      if (myPlayers) return myPlayers;
      else return false;
      
    } catch (error) {
      console.log({error: error.message})
    } 
  }

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