
import mongoose from "mongoose"
 
const url = "mongodb+srv://campusComputer:a1fJYUrFG1f4AHvu@cluster0.p7kbhem.mongodb.net/?retryWrites=true&w=majority"

export const connectDb = async () => {

    try {
        await mongoose.connect(url, {
            dbName: "campusComputer"
        });
        console.log("Database Connected Succesfully")
    } catch (error) {
        console.log("X-  Datasbe not Connect", error)
    }

}