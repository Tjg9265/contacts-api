const { ObjectId } = require("mongodb");
const db = require("../data/database");
const getAll=async (req, res) => {
    try{
        const result = await db.getDb().collection("contacts").find();
        const contacts = await result.toArray();
        
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts);        
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSingle = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id);
        const result = await db.getDb().collection("contacts").findOne({ _id: contactId });

        if (!result) {
            return res.status(404).json({ message: "Contact not found"});
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);
    }catch(error) {
        res.status(500).json({ message: error.message});
    }
};

module.exports = {
    getAll,
    getSingle
};