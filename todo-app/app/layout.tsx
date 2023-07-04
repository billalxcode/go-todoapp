"use client"
import "./globals.css"
import Navbar from "@/components/Navbar"
import { Container } from "@mui/material"
import { ThemeProvider } from '@mui/material/styles'
import { lightTheme } from "./themes/themes"
import Head from "next/head"

export const metadata = {
  title: 'Next Todo App',
  description: 'NextJs todo app with go rest api',
  openGraph: {
    title: "TodoApp",
    description: "Nextjs todo app with go rest api"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <title>{ metadata.title }</title>
      </Head>
      <body>
        <ThemeProvider theme={lightTheme}>
          <Container maxWidth="sm">
            <Navbar></Navbar>

            {children}
          </Container>
        </ThemeProvider>
      </body>
    </html>
  )
}
