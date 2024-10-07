import { Box, Typography, Avatar } from '@mui/material';
import { MatchDetails } from 'data/match-details-data'

interface MatchHeaderProps {
    data: MatchDetails;
}

const MatchHeader: React.FC<MatchHeaderProps> = ({ data }) => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Box display="flex" width="80%" mx="auto" justifyContent="space-between" alignItems="center" p={2} borderRadius={1} >
                <Box display="flex" alignItems="center">
                    <Avatar src={data.header.teams[0].imageUrl} alt={data.header.teams[0].name}/>
                    <Typography variant="h6" mx={1}>{data.header.teams[0].name}</Typography>
                </Box>

                <Box display="flex" flexDirection="column" alignItems="center">
                    {data.general.started 
                        ? <Typography>{data.header.teams[0].score} - {data.header.teams[1].score}</Typography> 
                        : <Typography variant="h6">{data.general.matchTimeUTC}</Typography>}
                    {data.header.status.liveTime?.long
                        ? <Typography>{ data.header.status.liveTime.long }</Typography>
                        : data.header.status.reason?.long 
                            ? <Typography>{ data.header.status.reason.long }</Typography>
                            : null
                    }
                </Box>

                <Box display="flex" alignItems="center">
                    <Avatar src={data.header.teams[1].imageUrl} alt={data.header.teams[1].name}/>
                    <Typography variant="h6" mx={1}>{data.header.teams[1].name}</Typography>
                </Box>
            </Box>
            <Box >
                <Typography>nfjgkdghdf</Typography>
            </Box>
        </Box>
    )
};

export default MatchHeader;