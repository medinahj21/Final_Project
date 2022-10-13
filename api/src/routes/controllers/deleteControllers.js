const { Group } = require("../../db");
const { Sequelize, Model } = require("sequelize");

const deleteGroups = async (req, res) => {
    const { id } = req.params
    try {
        if (!id || id.length < 36) {
            res.json({message:"id is require or id is to short, please try again"}).status(400)
        } else {
            const validateGroup = await Group.findByPk(id)
            if (validateGroup !== null) {
                await Group.destroy({
                    where: { id }
                })
                res.json({message:"Group has been delete"}).status(200)
            } else {
                res.json({message:"group not found"}).status(404)
            }
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    deleteGroups
}