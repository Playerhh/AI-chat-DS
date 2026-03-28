项目为：next.js
登录使用clerk:邮箱：2665430078@qq.com   密码：12345678
遇到问题1：clerk配置api寻找和理解
2:修改了目录结构，出了问题后又可以l:修改了文件validator.ts中的
const handler = {} as typeof import("../../src/app/page.js")增加了src
出现问题：文件未包括在任何tsconfig.json中：你看到的是 IDE（如 VS Code）的 TypeScript 语言服务 提示，指出 .next/types/validator.ts 文件没有被 tsconfig.json 包含。这是正常现象，不会对项目造成任何影响，你可以放心忽略。

🔍 这个文件是什么？
.next/types/validator.ts 是 Next.js 自动生成的类型声明文件。

它的作用是辅助 App Router 的类型安全，例如为 page.ts 中的 params、searchParams 提供正确的类型推断。

该文件在每次 next dev 或 next build 时自动生成/更新，不需要手动引用或修改。

❓ 为什么提示“未包括在 tsconfig.json 中”？
你的 tsconfig.json 默认会包含项目源代码（如 src 目录）和必要的类型声明，但不会包含 .next 目录（因为它被 .gitignore 忽略，且是构建产物）。

IDE 检测到该文件存在，但发现它不在 tsconfig.json 的 include 列表或文件集中，于是发出提示。

这是 IDE 的 TypeScript 检查机制，并非错误或警告。

✅ 对项目的影响
完全无影响：Next.js 会自行处理该文件，类型检查依然正常工作。

项目的编译、运行、类型安全都不会因为此提示而受损。

该文件不需要被包含在 tsconfig.json 中，也不应该被提交到版本库（.next 已经在 .gitignore 中）。

🛠️ 如果你希望消除这个提示（可选）
在 VS Code 中，你可以通过设置 typescript.disableAutomaticTypeAcquisition 或调整 tsconfig.json 的 exclude 来避免，但不推荐，因为提示无害。

或者直接忽略它，这是最常见且安全的做法。


第二天：页面提交使用了Material icons


动态路由：用的是：Dynamic Route的app routes
聊天耶：aisdk
aisdk版本修改后代码不一致：ai修改代码----》要理解
ai-api:用的阿里云，还有baseurl
数据库：用的superbase
和drizzle-orm工具？干什么用的--

superbase使用up！搞清楚数据库的前后端调用流程，还是有点蒙的



导航目录的usequery而不是useeffect或这直接axios==》更理想，降低复杂度，节约时间

导航的理解：navibar理解

消息持久化：api:chat/routes中间
hook-get-chat/route.ts:为什么叫他hook，什么作用


判断一直失败：    console.log(chat?.data?.userId)
const { messages, sendMessage, status } = useChat({
transport: new DefaultChatTransport({
api: '/api/chat',
// body: {
//     'Model': model,
//     'Chat-Id': chat_id as string,
//     'Chat-User-Id': chat?.data?.userId ,
// },
body:{
model:model,
chat_id:chat_id,
chat_user_id:chat?.data?.userId
}
}),


    });初始化参数不对
上面问题改成组件ok了，去理解为什么：修改列一下数据库链接-解决了老是连接不上的问题

网络超级不行啊，等会再搞model吧
问题：第一次跳转后并没能直接送到表里面，搞清楚前后端调用逻辑！
新建聊天就能不能直接message，但是再有的页面里面聊天就可以，而且不会传递给chat，搞清楚为什么？
会不停的getmessage直到成功----应该是组件不能拆
而且还要优化一下，并且搞清楚怎么做的为啥这么做

改后的成功了！----去搞懂为什么和改了什么！

很多没懂的但是大体上完成了
搞清楚之后可以先用ai写个简历