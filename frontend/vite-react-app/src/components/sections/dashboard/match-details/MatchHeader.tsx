import { Box, Typography, Avatar } from '@mui/material';

interface MatchHeaderProps {
    homeTeam: {
        name: string;
        imageUrl: string;
        score: number;
    };
    awayTeam: {
        name: string;
        imageUrl: string;
        score: number;
    };
    matchTime: string;
    hasStarted: boolean;
}

const MatchHeader: React.FC<MatchHeaderProps> = ({ homeTeam, awayTeam, matchTime, hasStarted }) => {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2} borderRadius={1} >
            <Box display="flex" alignItems="center">
                <Avatar src={homeTeam.imageUrl} alt={homeTeam.name}/>
                <Typography variant="h6" mx={1}>{homeTeam.name}</Typography>
            </Box>
            {hasStarted 
                ? <Typography>{homeTeam.score} - {awayTeam.score}</Typography> 
                : <Typography variant="h6">{matchTime}</Typography>}
            <Box display="flex" alignItems="center">
                <Avatar src={awayTeam.imageUrl} alt={awayTeam.name}/>
                <Typography variant="h6" mx={1}>{awayTeam.name}</Typography>
            </Box>
        </Box>
    )
};

export default MatchHeader;