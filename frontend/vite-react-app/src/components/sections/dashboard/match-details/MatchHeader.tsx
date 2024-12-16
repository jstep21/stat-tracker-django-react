import { Box, Typography, Avatar } from '@mui/material';
import { MatchDetails } from 'data/match-details-data';


interface MatchHeaderProps {
    data: MatchDetails;
}

const MatchHeader: React.FC<MatchHeaderProps> = ({ data }) => {

    const convertToEst = (utcTime: string): string => {
        const date = new Date(utcTime);
        return date.toLocaleTimeString('en-US', {
            timeZone: 'America/New_York',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={3.5}>
            <Box 
                gridColumn={{ xs:'span 12'}} 
                display="flex"
                justifyContent="center"
                textAlign="center"
            >
                    { data.general.leagueRoundName !== null 
                        ? <Typography variant="h4">{ data.general.leagueName } { data.general.leagueRoundName }</Typography>
                        : <Typography variant="h4">{ data.general.leagueName }</Typography>
                    }
            </Box>

            <Box 
                gridColumn={{ xs:'span 12', lg: 'span 10' }}
                display="flex" 
                width="100%" 
                justifyContent="space-between"  
            >
                    <Box display="flex" alignItems="center">
                        <Avatar src={data.header.teams[0].imageUrl} alt={data.header.teams[0].name}/>
                        <Typography variant="h4" mx="auto">{data.header.teams[0].name}</Typography>
                    </Box>

                    <Box display="flex" flexDirection="column" alignItems="center">
                        {data.general.started 
                            ? <Typography>{data.header.teams[0].score} - {data.header.teams[1].score}</Typography> 
                            : <Typography variant="h6">{convertToEst(data.general.matchTimeUTC)}</Typography>}
                        {data.header.status.liveTime?.long
                            ? <Typography>{ data.header.status.liveTime.long }</Typography>
                            : data.header.status.reason?.long 
                                ? <Typography>{ data.header.status.reason.long }</Typography>
                                : null
                        }
                    </Box>

                    <Box display="flex" alignItems="center">
                        <Avatar src={data.header.teams[1].imageUrl} alt={data.header.teams[1].name}/>
                        <Typography variant="h4" mx="auto">{data.header.teams[1].name}</Typography>
                    </Box>
            </Box>
            <Box gridColumn={{ xs:'span 2', lg: 'span 2' }}>
                <Typography>nfjgkdghdf</Typography>
            </Box>
        </Box>
    )
};

export default MatchHeader;