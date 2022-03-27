const Room = require("../models/room")
const mongoose = require("mongoose")
const rooms = require("../data/rooms.json")

mongoose.connect(
    "mongodb+srv://MyMongDBUser:pjtjamj@firstmongodb.ar4n4.mongodb.net/bookIt?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)

const seedRooms = async () => {
    try {
        await Room.deleteMany()
        console.log("Rooms are deleted")

        await Room.insertMany(rooms)
        console.log("All rooms are added.")

        process.exit()
    } catch (error) {
        console.log(error.message)
        process.exit()
    }
}

seedRooms()
