import { useParams } from "react-router-dom"
import { Box } from '@mui/material';
import MatchHeader from "./MatchHeader";

const MatchDetails = () => {
    const { matchId } = useParams<{matchId: string}>();

    return (
        <Box>
            {/* <MatchHeader/> */}
        </Box>
    )
}

export default MatchDetails