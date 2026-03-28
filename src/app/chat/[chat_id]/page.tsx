// 'use client';
//
// import { useChat } from '@ai-sdk/react';
// import { DefaultChatTransport } from 'ai';
// import {useEffect, useRef, useState} from 'react';
// import EastIcon from "@mui/icons-material/East";
// import {useParams} from "next/navigation";
// import {useQuery} from "@tanstack/react-query";
// import axios from "axios";
//
//
// export default function Page() {
//     const {chat_id}=useParams();
//     const {data:chat}=useQuery({
//         queryKey:['chat',chat_id],
//         queryFn:()=>{
//             return axios.post(`/api/get-chat`,{chat_id:chat_id})
//         }
//
//     })
//
//     const [input, setInput] = useState('');
//     const [model,setModel]=useState("deepseek-v3")
//     const handlechangModel=()=>{
//         setModel(model==="deepseek-v3" ? "deepseek-r1" : "deepseek-v3")
//     }
//     console.log(chat?.data?.userId)
//     const { messages, sendMessage, status } = useChat({
//         transport: new DefaultChatTransport({
//             api: '/api/chat',
//             // body: {
//             //     'Model': model,
//             //     'Chat-Id': chat_id as string,
//             //     'Chat-User-Id': chat?.data?.userId ,
//             // },
//               body:{
//                 model:model,
//                 chat_id:chat_id,
//                 chat_user_id:chat?.data?.userId
//             }
//         }),
//
//
//     });
//
//     const endRef=useRef<HTMLDivElement>(null)
//    useEffect(()=>{
//        if(endRef.current){
//            endRef?.current?.scrollIntoView({behavior:'smooth'})
//        }
//     },[messages])
//     return (
//         <div className="flex flex-col h-screen justify-between items-center">
//             <div className="flex flex-col w-2/3 gap-8 overflow-y-auto
//             justify-between flex-1">
//                 <div className="h-4"></div>
//               <div className="flex flex-col  gap-8 flex-1">
//             {messages?.map(message => (
//                 <div key={message.id}
//                 className={`rounded-lg flex flex-row ${message?.role === 'assistant' ?'justify-start mr-18':"justify-end ml-10"} `}>
//                     {/*{message.role === 'user' ? 'User: ' : 'AI: '}*/}
//                     <p className={`inline-block p-2 rounded-lg ${message?.role === 'assistant' ? 'bg-blue-300':'bg-slate-100'}`}>
//                         {message?.parts.map((part, index) =>
//                         part.type === 'text' ? <span key={index}>{part.text}</span> : null,
//                     )}</p>
//
//                 </div>
//             ))}
//             </div>
//                 <div className="h-4" ref={endRef}></div>
//
//             {/*输入框*/}
//                 <div className="flex flex-col items-center justify-center mt-4 shadow-lg border-[1px] border-gray-300
//         h-32 rounded-lg">
//              <textarea
//                  className="w-full rounded-lg p-3 h-30 focus:outline-none"
//                  value={input}
//                  onChange={(e) => setInput(e.target.value)}
//              >
//              </textarea>
//                     <div className='flex flex-row items-center justify-between w-full h-12 mb-2'>
//                         <div>
//                             <div className={`flex flex-row items-center justify-center rounded-lg border-[1px]
//                         px-2 py-1 ml-2 cursor-pointer ${model==="deepseek-r1" ? "border-blue-300 bg-blue-200" : "border-gray-300"}`}
//                             onClick={handlechangModel}>
//                                 <p className="text-sm">
//                                     深度思考
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="flex items-center justify-center border-2 mr-4 border-black p-1 rounded-full"
//                         onClick={e => {
//                             e.preventDefault();
//                             if (input.trim()) {
//                                 sendMessage({ text: input });
//                                 setInput('');
//                             }
//                         }}>
//                             <EastIcon/>
//                         </div>
//                     </div>
//
//                 </div>
//             </div>
//
//         </div>
//     );
// }
////组件版的引入-------------------------------------------------------------------------------------------------------------------
// 'use client';
// //第二版本会有undefin不好处理
// //
// import { useEffect, useRef, useState } from 'react';
// // import ChatComponent from '@/components/ChatComponent';
// import ChatComponent from "@/src/components/ChatComponent";
// import { useParams } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
//
// // 父组件（原 Page 函数）
// export default function Page() {
//     const { chat_id } = useParams();
//     const [model, setModel] = useState("deepseek-v3"); // model 状态仍可保留在父组件，通过 initialModel 传递
//
//     // 获取聊天数据
//     const { data: chat, isLoading, error } = useQuery({
//         queryKey: ['chat', chat_id],
//         queryFn: async () => {
//             const res = await axios.post('/api/get-chat', { chat_id });
//             // 假设后端返回的是聊天对象数组，取第一个；如果是对象直接返回则不需要 [0]
//             return res.data[0]; // 根据你的实际后端返回值调整
//         },
//         enabled: !!chat_id, // 仅在 chat_id 存在时查询
//     });
//     // 获取聊天数据
//     // const { data: previousMessages } = useQuery({
//     //     queryKey: ['messages', chat_id],
//     //     queryFn:async  () => {
//     //          return await axios.post('/api/get-messages', {
//     //              chat_id:chat_id ,
//     //              chat_user_id:chat?.data?.userId,
//     //          });
//     //     },
//     //     enabled: !!chat?.data?.id
//     // });
//     const { data: previousMessages } = useQuery({
//         queryKey: ['messages', chat_id],
//         queryFn: async () => {
//             const res = await axios.post('/api/get-messages', {
//                 chat_id: chat_id,
//                 chat_user_id: chat?.userId, // ✅ 使用 chat.userId
//             });
//             return res.data; // ✅ 提取真正的消息数组
//         },
//         enabled: !!chat?.id, // ✅ 使用 chat.id 控制启用
//     });
//     console.log(previousMessages)
//
//     if (isLoading) return <div className="h-screen flex items-center justify-center">加载中...</div>;
//     if (error) return <div className="h-screen flex items-center justify-center text-red-500">加载失败</div>;
//     if (!chat) return <div className="h-screen flex items-center justify-center">聊天不存在</div>;
//
//     // 数据已就绪，渲染聊天组件，传入 chat 对象和初始 model
//     return <ChatComponent chat={chat} initialModel={model} initialMessages={previousMessages}/>;
// }


// //组件版的代码-----------------------------------------------------------------------------------------------------------------
// export default function Page() {
//     const { chat_id } = useParams();
//     const [model] = useState("deepseek-v3");
//
//     // 1. 查询聊天信息
//     const chatQuery = useQuery({
//         queryKey: ['chat', chat_id],
//         queryFn: async () => {
//             const res = await axios.post('/api/get-chat', { chat_id });
//             return res.data[0]; // 根据后端调整
//         },
//         enabled: !!chat_id,
//     });
//
//     // 2. 查询历史消息（依赖 chatQuery.data 的 userId）
//     // 2. 查询历史消息（依赖 chatQuery.data 的 userId）
//     const messagesQuery = useQuery({
//         queryKey: ['messages', chat_id],
//         queryFn: async () => {
//             const res = await axios.post('/api/get-messages', {
//                 chat_id: chat_id,
//                 chat_user_id: chatQuery.data?.userId,
//             });
//             // 假设 res.data 是原始消息数组，如 [{ id, chatId, role, content }]
//             const rawMessages = res.data;
//             // 转换为 UIMessage 格式
//             return rawMessages.map((msg: any) => ({
//                 id: String(msg.id),
//                 role: msg.role,
//                 parts: [{ type: 'text', text: msg.content }],
//             }));
//         },
//         enabled: !!chatQuery.data?.id,
//     });
//
//     // 处理加载状态
//     if (chatQuery.isLoading || messagesQuery.isLoading) {
//         return <div className="h-screen flex items-center justify-center">加载中...</div>;
//     }
//
//     // 处理错误
//     if (chatQuery.error || messagesQuery.error) {
//         console.log(chatQuery.error)
//         console.log(messagesQuery.error)
//         return <div className="h-screen flex items-center justify-center text-red-500">加载失败</div>;
//     }
//
//     // 确保数据存在
//     if (!chatQuery.data) return <div>聊天不存在</div>;
//
//     // 数据已就绪，渲染子组件
//     return (
//         <ChatComponent
//             chat={chatQuery.data}
//             initialModel={model}
//             initialMessages={messagesQuery.data || []} // 确保是数组
//         />
//     );
//}
'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai'; // 注意：根据实际路径调整
import EastIcon from "@mui/icons-material/East";

export default function Page() {
    const { chat_id } = useParams();
    const [model, setModel] = useState("deepseek-v3");
    const [input, setInput] = useState('');
    const endRef = useRef<HTMLDivElement>(null);
    const hasSentInitial = useRef(false);

    // 1. 查询聊天信息
    const chatQuery = useQuery({
        queryKey: ['chat', chat_id],
        queryFn: async () => {
            const res = await axios.post('/api/get-chat', { chat_id });
            return res.data[0];
        },
        enabled: !!chat_id,
    });

    // 2. 查询历史消息
    const messagesQuery = useQuery({
        queryKey: ['messages', chat_id],
        queryFn: async () => {
            const res = await axios.post('/api/get-messages', {
                chat_id: chat_id,
                chat_user_id: chatQuery.data?.userId,
            });
            const rawMessages = res.data;
            // 修复：如果 rawMessages 为 null 或 undefined，返回空数组
            if (!rawMessages) return [];
            return rawMessages.map((msg: any) => ({
                id: String(msg.id),
                role: msg.role,
                parts: [{ type: 'text', text: msg.content }],
            }));
        },
        enabled: !!chatQuery.data?.id,
    });

    const chat = chatQuery.data;
    const initialMessages = messagesQuery.data || [];
    // useEffect(() => {
    //     if (chat?.model) {
    //         // eslint-disable-next-line react-hooks/set-state-in-effect
    //         setModel(chat.model);
    //         // hasSetModel.current = true;
    //     }
    // }, [chat?.model]);
    // 3. 使用 useMemo 动态创建 transport，确保 model 和 chat 变化时 body 更新
    const transport = useMemo(
        () =>
            new DefaultChatTransport({
                api: '/api/chat',
                body: {
                    model,
                    chatId: chat?.id ? String(chat.id) : '',
                    chatUserId: chat?.userId || '',
                },
            }),
        [model, chat?.id, chat?.userId]
    );

    // 4. 使用标准 useChat，传入 id 稳定会话，使用动态 transport
    const { messages, sendMessage } = useChat({
        id: chat?.id ? String(chat.id) : undefined, // 提供会话 ID，避免额外请求
        transport,
        messages: initialMessages,
    });

    // 自动发送标题的 effect
    useEffect(() => {
        if (chat?.title && messages.length === 0 && !hasSentInitial.current) {
            hasSentInitial.current = true;
            sendMessage({ text: chat.title });
        }
    }, [chat?.title, messages, sendMessage]);

    // 滚动到底部
    useEffect(() => {
        if (endRef.current) {
            endRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handlechangModel = () => {
        setModel(model === "deepseek-v3" ? "deepseek-r1" : "deepseek-v3");
    };

    // 处理加载状态（Hooks 已全部调用，此处可条件返回）
    if (chatQuery.isLoading || messagesQuery.isLoading) {
        return <div className="h-screen flex items-center justify-center">加载中...</div>;
    }

    if (chatQuery.error || messagesQuery.error) {
        console.log(chatQuery.error);
        console.log(messagesQuery.error);
        return <div className="h-screen flex items-center justify-center text-red-500">加载失败</div>;
    }

    if (!chat) return <div>聊天不存在</div>;

    return (
        <div className="flex flex-col h-screen justify-between items-center">
            <div className="flex flex-col w-2/3 gap-8 overflow-y-auto justify-between flex-1">
                <div className="h-4"></div>
                <div className="flex flex-col gap-8 flex-1">
                    {messages?.map(message => (
                        <div key={message.id}
                             className={`rounded-lg flex flex-row ${message?.role === 'assistant' ? 'justify-start mr-18' : 'justify-end ml-10'}`}>
                            <p className={`inline-block p-2 rounded-lg ${message?.role === 'assistant' ? 'bg-blue-300' : 'bg-slate-100'}`}>
                                {message?.parts.map((part, index) =>
                                    part.type === 'text' ? <span key={index}>{part.text}</span> : null
                                )}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="h-4" ref={endRef}></div>
            </div>

            {/* 输入框 */}
            <div className="flex flex-col items-center justify-center mt-4 shadow-lg border-[1px] border-gray-300 h-32 rounded-lg">
                <textarea
                    className="w-full rounded-lg p-3 h-30 focus:outline-none"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <div className='flex flex-row items-center justify-between w-full h-12 mb-2'>
                    <div>
                        <div className={`flex flex-row items-center justify-center rounded-lg border-[1px] px-2 py-1 ml-2 cursor-pointer ${model === "deepseek-r1" ? "border-blue-300 bg-blue-200" : "border-gray-300"}`}
                             onClick={handlechangModel}>
                            <p className="text-sm">深度思考</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center border-2 mr-4 border-black p-1 rounded-full"
                         onClick={e => {
                             e.preventDefault();
                             if (input.trim()) {
                                 sendMessage({ text: input });
                                 setInput('');
                             }
                         }}>
                        <EastIcon />
                    </div>
                </div>
            </div>
        </div>
    );
}