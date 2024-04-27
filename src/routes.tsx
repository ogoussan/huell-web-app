import { ReactNode } from "react";
import {Home, MessagesSquare} from "lucide-react";
import { HomePage } from "./features/home/HomePage.tsx";
import { ChatPage } from "./features/chat/ChatPage.tsx";

const routes: {label: string, icon: ReactNode, path: string, element: ReactNode}[] = [
    {
        label: 'Home',
        icon: <Home size={32} />,
        path: '/',
        element: (
                <HomePage />
        )
    },
    {
        label: 'Chat',
        icon: <MessagesSquare size={32} />,
        path: '/chat',
        element: <ChatPage />
    },
]

export default routes;