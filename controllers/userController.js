const userService = require("../service/userService");

async function createUser(req, res) {
    const { username } = req.body;
    try {
        await userService.createUser(username);
        res.status(200).json({ message: "user added!"}) 
    } catch (error) {
        res.status(500).json({ error: "Something went wrong." });
    }
}

async function createGameRecord(req, res) {
    const { username, record } = req.body;

    try {
        const user = await userService.getUser(username);
        const records = await userService.gameRecord(record, user.id);
        res.status(200).json({ records: records });
    } catch(error) {
        res.status(500).json({ message: error.message || "Something went wrong."})
    }
}

async function fetchRecords(req, res) {
    try {
        const records = await userService.fetchGameRecord();
        res.status(200).json({ records: records });
    } catch(error) {
        res.status(500).json({ message: error.message || "Something went wrong."})
    }
}

module.exports = {
    createUser,
    createGameRecord,
    fetchRecords
}