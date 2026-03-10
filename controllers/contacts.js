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
const createContact = async(req, res) => {
    try{
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        const response = await db.getDb().collection("contacts").insertOne(contact);

        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const updateContact = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id);

        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        const response = await db.getDb().collection("contacts").replaceOne(
            { _id: contactId },
            contact 
        );

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ message: "Error updating contact" });
        } 

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteContact = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id);

        const response = await db.getDb().collection("contacts").deleteOne({
            _id: contactId
        });

        if (response.deletedCount > 0) {
            res.status(200).send();
        } else {
            res.status(500).json({ message: "Error deleting contact" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact,
};