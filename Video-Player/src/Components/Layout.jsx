import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import Alert from "./Alert";
import Header from "./Header";


const Layout = () => {

    const theme = createTheme({
        palette: {
          mode: 'dark'
        }
    })

  return (
    <>
    <ThemeProvider theme={theme} >
    <Header/>
    <main>
        <CssBaseline/>
        <Outlet/>
    </main>
    <Alert/>
    </ThemeProvider>
    </>
  )
}

export default Layout;