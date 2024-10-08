const Collection = require("../models/collectionModel");

// GET all collections
const getAllCollections = async (req, res) => {
    const userId = req.user.userId;

    try {
        const collections = await Collection.find({userIds: userId});
        res.status(200).json(collections);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// POST a new collection
const createCollection = async (req, res) => {
    const {name, id, type, songAmount} = req.body;
    const userId = req.user.userId;

    try {
        let collection = await Collection.findOne({id});

        if (collection) {
            // If collection exists, check if user ID is already present
            if (collection.userIds.includes(userId)) {
                return res.status(400).json({message: "User has already added this collection"});
            } else {
                collection.userIds.push(userId);
                await collection.save();
            }
        } else {
            // If collection does not exist, create a new one
            collection = new Collection({name, id, type, songAmount, userIds: [userId]});
            await collection.save();
        }

        res.status(201).json(collection);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

// DELETE a specific collection by ID
const deleteCollection = async (req, res) => {
    const {id} = req.params;
    const userId = req.user.userId;

    try {
        const collection = await Collection.findOne({id});

        if (!collection) {
            return res.status(404).json({message: "Collection not found"});
        }

        // Remove user ID from the collection's user array
        collection.userIds = collection.userIds.filter(uid => uid.toString() !== userId.toString());

        if (collection.userIds.length === 0) {
            // If no users are associated with the collection, delete it
            await collection.remove();
        } else {
            // Otherwise, save the updated collection
            await collection.save();
        }

        res.status(200).json({message: "Collection updated"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getAllCollections,
    createCollection,
    deleteCollection,
};