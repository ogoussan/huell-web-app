import { VStack, HStack, Heading, Center } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {activeStyle} from "../../theme/style.ts";

interface SidebarRoute {
    label: string,
    icon: ReactNode,
    path: string,
}

interface Props {
    routes: SidebarRoute[],
}

export const Sidebar = ({routes}: Props) => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const showSidebar = routes.map((route) => route.path).includes(pathname);

    return (
        <>
            <HStack display={showSidebar ? 'flex' : 'none'} minWidth="100px" height="100vh" bg="gray.600" alignItems="flex-start" py={4}>
                <VStack flex={1} width="full" height="100%" alignItems="flex-start" mx={4}>
                    <Center bg="gray.700" rounded="md" width="100%" height={20}>
                        <Heading size="md">huell</Heading>
                    </Center>
                    {routes.map((route, i) => (
                        <HStack
                          key={route.label + i}
                          width="100%"
                          _hover={{
                            bg: 'gray.500',
                            rounded: 'md'
                          }}
                          style={pathname === route.path ? (
                            activeStyle
                          ) : (
                            {}
                          )}
                          cursor="pointer"
                          p={4} alignItems="center"
                          onClick={() => navigate(route.path)}
                        >
                            {route.icon}
                            <Heading size="md">{route.label}</Heading>
                        </HStack>
                    ))}
                </VStack>
            </HStack>
        </>
    );
}