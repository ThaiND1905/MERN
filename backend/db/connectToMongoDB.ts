import mongoose from "mongoose";

const connectToMongoDB = async () =>{
    try{
        await mongoose.connect(process.env.MGDB_URL!);
        console.log("Connect to MongoDB");
    }catch(error){
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.log("Error connecting to MongoDB",errorMessage);   
    }
}

export default connectToMongoDB;