import { convertToModelMessages, streamText, UIMessage } from 'ai';
import {auth} from "@clerk/nextjs/server";
import {createDeepSeek} from "@ai-sdk/deepseek";
import {createMessage} from "@/src";
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
const deepseek=createDeepSeek({

    apiKey:process.env.DEEPSEEK_API_KEY,
    baseURL:process.env.BASE_URL

});
export async function POST(req: Request) {
    const { messages, model, chatId, chatUserId } = await req.json() as {
        messages: UIMessage[];
        model: string;
        chatId: string;
        chatUserId: string;
    };

    const chat_id = Number(chatId);
    if (isNaN(chat_id)) {
        return new Response(JSON.stringify({ error: 'Invalid chat ID' }), { status: 400 });
    }
    const {userId} =await auth();
    // if(!userId||userId !==chatUserId){
    //     return new Response(JSON.stringify({error: "Unauthorized"}),{status:401});
    // }
    //存入用户信息
    // 存入用户消息
    const lastMessage = messages[messages.length - 1];
    const userContent = lastMessage.parts?.find(p => p.type === 'text')?.text || '';
    await createMessage(chat_id, lastMessage.role, userContent);

    const result = streamText({
        model: deepseek("deepseek-v3"),
        system: 'You are a helpful assistant.',
        messages: await convertToModelMessages(messages),
        onFinish:async(result)=>{
            await createMessage(chat_id,'assistant',result.text)
        }
    });

    return result.toUIMessageStreamResponse();
}
