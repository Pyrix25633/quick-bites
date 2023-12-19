import { Paper, Typography } from "@mui/material";
import getDayName from "../utils/getDayName";

type DayButtonProps = {
    date: Date
};

export default function DayButton({ date }: DayButtonProps) {
    return (
        <Paper sx={{borderRadius: 4, padding: 2, textAlign: 'center', minWidth: "5rem"}}>
            <Typography variant="h5">{getDayName(date.getDay())}</Typography>
            <Typography variant="h4">{date.getDate()}</Typography>
        </Paper>
    )
}