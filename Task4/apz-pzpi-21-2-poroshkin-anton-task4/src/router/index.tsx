import App from "@/App"
import { createBrowserRouter } from "react-router-dom"
import MainLayout from "@/components/layout/MainLayout"
import AuthLayout from "@/components/layout/AuthLayout"
import SinginCompany from "@/components/layout/company/auth/SigninCompany"
import SignupCompany from "@/components/layout/company/auth/SignupCompany"
import ProtectedRoute from "@/components/hoc/ProtectedRoute"
import Hotels from "@/components/layout/company/hotels"
import Rooms from "@/components/layout/company/rooms"
import ClimateDevices from "@/components/layout/company/climate-devices"

export const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/",
                element: <MainLayout />,
                children: [
                    {
                        path: "hotels",
                        element: (
                            <ProtectedRoute>
                                <Hotels />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "rooms",
                        element: (
                            <ProtectedRoute>
                                <Rooms />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "climate-devices",
                        element: (
                            <ProtectedRoute>
                                <ClimateDevices />
                            </ProtectedRoute>
                        ),
                    },
                ],
            },
            {
                path: "/auth",
                element: <AuthLayout />,
                children: [
                    {
                        path: "company/signin",
                        element: <SinginCompany />,
                    },
                    {
                        path: "company/signup",
                        element: <SignupCompany />,
                    },
                    {
                        path: "client",
                        element: <div>Client auth page</div>,
                    },
                ],
            },
        ],
    },
])

