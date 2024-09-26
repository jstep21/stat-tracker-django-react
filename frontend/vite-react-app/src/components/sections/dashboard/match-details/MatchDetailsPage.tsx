import { useParams } from "react-router-dom"
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query'
import { fetchMatch, MatchDetails } from 'data/match-details-data.ts';
import MatchHeader from "./MatchHeader";
import ShotMap from "../shot-map/ShotMap";


const MatchDetailsPage: React.FC = () => {


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
            <ShotMap 
                shotData={data.content.shotmap.Periods.All} 
                homeTeamId={data.general.homeTeam.id} 
                awayTeamId={data.general.awayTeam.id}
            />
        </Box>
    )
}

export default MatchDetailsPage