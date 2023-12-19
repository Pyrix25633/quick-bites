import { Box, Paper, Stack, Typography } from "@mui/material";
import QrCodeIcon from '@mui/icons-material/QrCode';
import getDayName from "../utils/getDayName";

type OrderButtonProps = {
    date: Date,
    total: number,
    items: string[]
};

export default function OrderButton(props: OrderButtonProps) {
    return (
        <Paper sx={{borderRadius: 4, padding: 2, textAlign: "center"}}>
            <Stack direction="row" sx={{justifyContent: "space-between", alignItems: "center"}}>
                <Box>
                    <Typography variant="h5">{getDayName(props.date.getDay())}</Typography>
                    <Typography variant="h4">{props.date.getDate()}</Typography>
                </Box>
                <Box>
                    <Typography variant="h4">{'€ ' + props.total}</Typography>
                    {props.items.map(item => <Typography variant="h5" key={item}>{item}</Typography>)}
                </Box>
                <QrCodeIcon sx={{fontSize: "100px"}}/>
            </Stack>
        </Paper>
    )
}