'use client';

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        background: {
            default: "#5A1812",
            paper: "#E6B17E"
        },
        primary: {
            main: "#CD9058",
            contrastText: "#5A1812"
        }
    }
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    )
}