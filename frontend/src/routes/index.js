import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Header from '../components/Header'
import Home from '../pages/Home'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import ForgotPassword from '../pages/ForgotPassword'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import BrandProduct from '../pages/BrandProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import Success from '../pages/Success'
import Cancel from '../pages/Cancel'
import Order from '../pages/Order'
import AllOrders from '../pages/AllOrders'
import VerifyEmail from '../pages/VerifyEmail'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "sign-up",
                element: <SignUp />
            },
            {
                path: "category-product",
                element: <BrandProduct />
            },
            {
                path: "cart",
                element: <Cart />
            },
            {
                path: "success",
                element: <Success />
            },
            {
                path: "cancel",
                element: <Cancel />
            },
            {
                path: "/product/:id",
                element: <ProductDetails />
            },
            {
                path: "search",
                element: <SearchProduct />
            },
            {
                path: "order",
                element: <Order />
            },
            {
                path: "verify-email",
                element: <VerifyEmail />
            },
            {
                path: "admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "all-users",
                        element: <AllUsers />
                    },
                    {
                        path: "all-orders",
                        element: <AllOrders />
                    },
                    {
                        path: "all-products",
                        element: <AllProducts />
                    },
                ]
            },

        ]
    }
])

export default router