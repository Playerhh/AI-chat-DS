import {auth} from "@clerk/nextjs/server"
import {createChat} from "@/src";


export async function POST(req: Request) {
    const {title,model}=await req.json();

    const {userId}=await auth()



    if(userId){
      //1.创建一个chat
        const newChat=await createChat(title,userId,model)
        //2.返回新chat
        return new Response(JSON.stringify({id:newChat?.id}),{status:200})
    }
    return new Response(null,{status:200});
}