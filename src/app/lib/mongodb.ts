import mongoose from "mongoose";

interface MongooseGlobal{
    conn?:mongoose.Connection | null,
    promise?:Promise<mongoose.Connection> | null
}

const globalWithMongoose=globalThis as typeof globalThis & { mongooseGlobal:MongooseGlobal}

export async function dbconnect(){
     if(globalWithMongoose.mongooseGlobal?.conn){
        return globalWithMongoose.mongooseGlobal.conn
     }
    if(!process.env.MONGO_URL){
        throw new Error ("Couldn't locate Mongo_url")
    }
    globalWithMongoose.mongooseGlobal=globalWithMongoose.mongooseGlobal || {}

    globalWithMongoose.mongooseGlobal.promise=globalWithMongoose.mongooseGlobal.promise ||
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"wallpaperdb",
        autoIndex:true
    }).then((mongooseInstance)=>mongooseInstance.connection)

    globalWithMongoose.mongooseGlobal.conn= await globalWithMongoose.mongooseGlobal.promise
}