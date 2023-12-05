import { Box, Card, Container, Typography } from "@mui/material"
import { Metadata } from "next"


export const metadata: Metadata = {
    title: "Login",
    description: "Login page"
}

export default function Login() {
    return (
        <main>
            <Container>
                <Box>
                    <Card>
                        <Typography variant="h3">Test</Typography>
                    </Card>
                    <Card>
                        <Typography variant="h3">Test</Typography>
                    </Card>
                </Box>
            </Container>
        </main>
    )
}