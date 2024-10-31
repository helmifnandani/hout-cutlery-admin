import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProtectedRoute from './ui/ProtectedRoute'
import AppLayout from './ui/AppLayout'
import Products from './pages/Products'
import Login from './pages/Login'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import '@fontsource/outfit'
import '@fontsource/outfit/400.css'
import '@fontsource/outfit/600.css'
import '@fontsource/outfit/700.css'
import Product from './pages/Product'
import Catalogs from './pages/Catalogs'
import Catalog from './pages/Catalog'
import { FileProvider } from './context/FileContext'
import { SearchProvider } from './context/SearchContext'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
        },
    },
})

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <FileProvider>
                <SearchProvider>
                    <ReactQueryDevtools initialIsOpen={false} />
                    <BrowserRouter>
                        <Routes>
                            <Route
                                element={
                                    <ProtectedRoute>
                                        <AppLayout />
                                    </ProtectedRoute>
                                }
                            >
                                <Route
                                    path="/"
                                    element={<Navigate replace to="products" />}
                                />
                                <Route
                                    path="/products"
                                    element={<Products />}
                                />
                                <Route
                                    path="/products/:productId"
                                    element={<Product />}
                                />
                                <Route
                                    path="/catalogs"
                                    element={<Catalogs />}
                                />
                                <Route
                                    path="/catalogs/:catalogId"
                                    element={<Catalog />}
                                />
                            </Route>
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </BrowserRouter>
                    <Toaster
                        position="top-center"
                        gutter={12}
                        containerStyle={{ margin: '8px' }}
                        toastOptions={{
                            success: { duration: 3000 },
                            error: { duration: 5000 },
                            style: {
                                fontSize: '16px',
                                maxWidth: '500px',
                                padding: '16px 24px',
                            },
                            className:
                                'bg-primary-200 text-primary-700 z-[99999999]',
                        }}
                    />
                </SearchProvider>
            </FileProvider>
        </QueryClientProvider>
    )
}

export default App
