import { Route, Routes } from 'react-router-dom';
import { Box, ChakraProvider, HStack } from '@chakra-ui/react';
import { Sidebar } from './features/app/Siderbar.tsx';
import routes from './routes';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const App = () => {
  localStorage.setItem('chakra-ui-color-mode', 'dark');
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
          <HStack>
            <Sidebar routes={routes} />
            <Box flex={1} p={12} height="100vh" backgroundColor="gray.900">
              <Routes>
                {routes.map((route, i) => (
                  <Route
                      key={route.path + i}
                      path={route.path}
                      element={route.element}
                />
                ))}
              </Routes>
            </Box>
          </HStack>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;


