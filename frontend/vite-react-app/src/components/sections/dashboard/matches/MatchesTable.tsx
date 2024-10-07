import {
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
} from '@mui/material';
import { League } from 'data/match-data';
import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';

interface MatchTableProps {
  data: League[];
  countryCodes: string[]
}

const MatchesTable: React.FC<MatchTableProps> = ({data, countryCodes}) => {

  const filteredLeagues = data.filter((league: League) => countryCodes.includes(league.ccode));

  return (
    <Paper sx={{ p: { xs: 4, sm: 8 }, height: 1 }}>
      <Typography variant="h4" color="common.white" mb={6}>
        Today's Matches
      </Typography>
      {filteredLeagues.map((league: League) => (
        <TableContainer key={league.id} component={SimpleBar} style={{ maxHeight: '300px' }}>
          <Typography variant="h6" color="primary" mb={2}>
            {league.name}
          </Typography>
          <Table sx={{ minWidth: 440 }}>
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ width: '40%', textAlign:'left' }}>Home Team</TableCell>
                <TableCell align="center" sx={{ width: '20%', textAlign:'center' }}>Match Time</TableCell>
                <TableCell align="right" sx={{ width: '40%', textAlign:'right' }}>Away Team</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {league.matches.map((match) => (
                <TableRow key={match.id}>
                  <TableCell align="left" sx={{ width: '40%', textAlign:'left' }}>{match.home.longName}</TableCell>
                  <TableCell align="center" sx={{ width: '20%', textAlign:'center' }}>
                    <Link 
                      to={`/${match.id}`} 
                      style={{ textDecoration: 'none', color: 'inhert' }}
                        
                    >
                      {match.statusId > 1 ? `${match.home.score} - ${match.away.score}` : match.time}
                      {/* {match.time} */}
                    </Link>
                  </TableCell>
                  <TableCell align="right" sx={{ width: '40%', textAlign:'right' }}>{match.away.longName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ))}

    </Paper>
  );
};

export default MatchesTable;
