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
    const dates: Date[] = [];
    for(let i = 0; i <20; i++)
        dates.push(new Date(new Date().getMilliseconds() + (i * 1000 * 60 * 60 * 24)))

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
                            <Paper sx={{borderRadius: 5, padding: 1}}>
                                <Stack className="overflow-x-auto" direction="row" gap={1}>
                                    {dates.map(date => <DayButton date={date}></DayButton>)}
                                </Stack>
                            </Paper>
                        </Box>
                        <Box>
                            <Typography variant="h4">Ordini attivi:</Typography>
                            <Paper sx={{borderRadius: 5, padding: 2}}>
                                <Stack className="overflow-y-auto" direction="column" gap={1}>
                                    <OrderButton date={new Date()} total={15} items={['Fil. primavera', 'Toast']}></OrderButton>
                                </Stack>
                            </Paper>
                        </Box>
                    </Stack>
                </Container>
            </main>
        </>
    )
}

type DayButtonProps = {
    date: Date
};

type OrderButtonProps = {
    date: Date,
    total: number,
    items: string[]
};

function DayButton({ date }: DayButtonProps) {
    return (
        <Paper sx={{borderRadius: 4, padding: 1, textAlign: 'center'}}>
            <Typography variant="h5">{getDayName(date.getDay())}</Typography>
            <Typography variant="h4">{date.getDate()}</Typography>
        </Paper>
    )
}

function OrderButton(props: OrderButtonProps) {
    return (
        <Paper sx={{borderRadius: 4, padding: 1, textAlign: "center"}}>
            <Stack direction="row" sx={{justifyContent: "space-between"}}>
                <Box>
                    <Typography variant="h5">{getDayName(props.date.getDay())}</Typography>
                    <Typography variant="h4">{props.date.getDate()}</Typography>
                </Box>
                <Box>
                    <Typography variant="h4">{'€ ' + props.total}</Typography>
                    {props.items.map(item => <Typography variant="h5">{item}</Typography>)}
                </Box>
                <AccountCircleIcon fontSize="large"/>
            </Stack>
        </Paper>
    )
}

function getDayName(day: number): string {
    switch(day) {
        case 1: return 'Lun';
        case 2: return 'Mar';
        case 3: return 'Mer';
        case 4: return 'Gio';
        case 5: return 'Ven';
        case 6: return 'Sab';
        default: return 'Dom';
    }
}