import { useParams } from "react-router-dom"
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query'
import { fetchMatch, MatchDetails } from 'data/match-details-data.ts';
import MatchHeader from "./MatchHeader.tsx";
import ShotMap from "../shot-map/ShotMap.tsx";
import MomentumChart from "../momentum-charts/MomentumChart.tsx";


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
        <Box 
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{
                width: "90%",
                maxWidth: "1200px",
                margin: "0, auto",
                padding: "24px",
            }}    
        >
            <MatchHeader data={data}/>

            { data.general.started && data.content.momentum && data.content.shotmap && (
                <>
                    <ShotMap 
                        shotData={data.content.shotmap.Periods.All} 
                        homeTeamId={data.general.homeTeam.id} 
                        awayTeamId={data.general.awayTeam.id}
                    />
                
                    <Box>
                        <MomentumChart 
                            data={data.content.momentum.main.data} 
                            width={1700} 
                            height={1400}
                            homeTeamColor={data.general.teamColors.darkMode.home}
                            awayTeamColor={data.general.teamColors.darkMode.away}
                        />
                    </Box>
                </>
            )}
            
        </Box>
    )
}

export default MatchDetailsPage