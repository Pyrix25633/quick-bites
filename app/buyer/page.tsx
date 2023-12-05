import { Image } from "@mui/icons-material"
import MenuIcon from "@mui/icons-material/Menu"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { AppBar, Box, Container, IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material"
import { Metadata } from "next"


export const metadata: Metadata = {
    title: "Home",
    description: "See your orders and order food"
}

export default function Home() {
    return (
        <>
            <AppBar position="sticky">
                <Toolbar sx={{justifyContent: "space-between"}}>
                    <IconButton sx={{padding: 0}} color="inherit">
                        <MenuIcon fontSize="large"/>
                    </IconButton>
                    <Typography variant="h4">Mario</Typography>
                    <AccountCircleIcon fontSize="large"/>
                </Toolbar>
            </AppBar>
            <main>
                <Container>
                    <Stack gap={2}>
                        <Box>
                            <Typography variant="h4">Ordina:</Typography>
                            <Paper sx={{borderRadius: 5, padding: 2}}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam placeat dignissimos debitis perferendis sunt! Atque earum vero dicta pariatur expedita qui aut nisi delectus laborum minus! Id laboriosam recusandae quos at porro maxime aliquid laudantium? Nesciunt aut at quisquam, non earum fugit fugiat quibusdam asperiores qui. Officiis officia expedita maxime.
                            </Paper>
                        </Box>
                        <Box>
                            <Typography variant="h4">Ordini attivi:</Typography>
                            <Paper sx={{borderRadius: 5, padding: 2}}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi dicta repellat porro suscipit facere, sequi reprehenderit dolore odio laudantium, delectus aliquam ut dolorem. Obcaecati facilis consectetur necessitatibus cum laboriosam architecto alias aperiam ducimus, porro placeat illo nulla velit quos adipisci sit nihil excepturi doloribus omnis dignissimos voluptatem eos ad! Eligendi!
                            </Paper>
                        </Box>
                    </Stack>
                </Container>
            </main>
        </>
    )
}