import { Box, Typography, Avatar } from '@mui/material';
import { MatchDetails } from 'data/match-details-data'

interface MatchHeaderProps {
    data: MatchDetails;
}

const MatchHeader: React.FC<MatchHeaderProps> = ({ data }) => {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2} borderRadius={1} >
            <Box display="flex" alignItems="center">
                <Avatar src={data.header.teams[0].imageUrl} alt={data.header.teams[0].name}/>
                <Typography variant="h6" mx={1}>{data.header.teams[0].name}</Typography>
            </Box>
            {data.general.started 
                ? <Typography>{data.header.teams[0].score} - {data.header.teams[1].score}</Typography> 
                : <Typography variant="h6">{data.general.matchTimeUTC}</Typography>}
            <Box display="flex" alignItems="center">
                <Avatar src={data.header.teams[1].imageUrl} alt={data.header.teams[1].name}/>
                <Typography variant="h6" mx={1}>{data.header.teams[1].name}</Typography>
            </Box>
        </Box>
    )
};

export default MatchHeader;