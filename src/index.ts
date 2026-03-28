import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import {chatsTable, messagesTable} from "@/src/db/schema";
import {and,eq,desc} from "drizzle-orm";

    const client = postgres(process.env.DATABASE_URL!)
    const db = drizzle({ client });


export const createChat=async (title:string,userId:string,model:string)=>{
    try{
        const[newChat]=await db.insert(chatsTable).values({
            // id:chat_id,
            title,
            userId,
            model,
        }).returning()
         return newChat
    }catch(error){
        console.error("error create chat",error)
        return null
    }


}
export const getChat=async (chatId:number,userId:string)=>{
    try{
        const chat=await db.select().from(chatsTable).where(and(eq(chatsTable.id,chatId),eq(chatsTable.userId,userId)))
        if(chat.length===0){
            return null
        }
        return chat
    }catch(error){
        console.error("error get chat",error)
        return null
    }

}
export const getChats=async (userId:string)=>{
    try {
     const chats=await db.select().from(chatsTable).where(eq(chatsTable.userId,userId)).orderBy(desc(chatsTable.id))
     return chats
    }catch (error) {
        console.error("error get chats",error)
        return null}
}
//messages


    export const createMessage=async (chat_Id:number,role:string,content:string)=>{
    try{
        const[newMessage]=await db.insert(messagesTable).values({
            chatId:chat_Id,
            role:role,
            content:content,
        }).returning()
        return newMessage
    }catch(error){
        console.error("error create message",error)
        return null
    }


}
export const getMessage=async (chatId:number)=>{
    try{
        const messages=await db.select().from(messagesTable).where(eq(messagesTable.chatId,chatId))
        if(messages.length===0){
            return null
        }
        return messages
    }catch(error){
        console.error("error get message",error)
        return null
    }

}
