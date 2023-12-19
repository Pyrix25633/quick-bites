import DayButton from "@/lib/components/DayButton";
import OrderButton from "@/lib/components/OrderButton";
import { Box, Container, Paper, Stack, Typography } from "@mui/material"
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
        <Container>
            <Stack gap={2}>
                <Box>
                    <Typography variant="h4">Ordina:</Typography>
                    <Paper sx={{borderRadius: 5}}>
                        <Stack className="overflow-x-auto" direction="row" gap={1} sx={{borderRadius: 5, padding: 2}}>
                            {dates.map(date => <DayButton date={date} key={date.getMilliseconds()}></DayButton>)}
                        </Stack>
                    </Paper>
                </Box>
                <Box>
                    <Typography variant="h4">Ordini attivi:</Typography>
                    <Paper sx={{borderRadius: 5}}>
                        <Stack className="overflow-y-auto" direction="column" gap={1} sx={{padding: 2}}>
                            <OrderButton date={new Date()} total={15} items={['Fil. primavera', 'Toast']}></OrderButton>
                            <OrderButton date={new Date()} total={7} items={['Fil. primavera', 'Pizza wurstel']}></OrderButton>
                        </Stack>
                    </Paper>
                </Box>
            </Stack>
        </Container>
    )
}