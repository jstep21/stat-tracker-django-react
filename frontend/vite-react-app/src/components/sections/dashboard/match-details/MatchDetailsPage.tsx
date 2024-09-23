import { useParams } from "react-router-dom"
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query'
import { fetchMatch, MatchDetails } from 'data/match-details-data.ts';
import MatchHeader from "./MatchHeader";


const MatchDetailsPage = () => {
    const { matchId } = useParams<{matchId: string}>();

    const { data, error, isLoading } = useQuery<MatchDetails, Error>({
        queryKey: ['match', matchId],
        queryFn: () => fetchMatch(Number(matchId))
    })

    if (isLoading) return <div>Loading match details...</div>;
    if (error) return <div>Error loading match: {error.message}</div>;
    if (!data) return <div>Match not availabe</div>;

    return (
        <Box>
            <MatchHeader data={data}/>
        </Box>
    )
}

export default MatchDetailsPage