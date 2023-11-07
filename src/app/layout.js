"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import TopMenu from "@/components/TopMenu";
import { Flip, ToastContainer, toast } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>HouseFy - 365Group</title>
      </head>
      <body className={inter.className}>
        <Provider store={store}>
          <ToastContainer
            transition={Flip}
            position="bottom-left"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <TopMenu></TopMenu>
          <div className="pt-[80px] ">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
