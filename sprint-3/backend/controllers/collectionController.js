const Collection = require("../models/collectionModel");

// GET all collections
const getAllCollections = async (req, res) => {
    try {
        const collections = await Collection.find();
        res.status(200).json(collections);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST a new collection
const createCollection = async (req, res) => {
    const { name, id, type, songAmount } = req.body;
    try {
        const newCollection = new Collection({ name, id, type, songAmount });
        await newCollection.save();
        res.status(201).json(newCollection);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE a specific collection by ID
const deleteCollection = async (req, res) => {
    const { id } = req.params;
    try {
        const collection = await Collection.findByIdAndDelete(id);
        if (!collection) {
            return res.status(404).json({ message: "Collection not found" });
        }
        res.status(200).json({ message: "Collection deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllCollections,
    createCollection,
    deleteCollection,
};