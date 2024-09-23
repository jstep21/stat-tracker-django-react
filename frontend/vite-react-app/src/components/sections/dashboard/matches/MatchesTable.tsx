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
          <h2>{league.name}</h2>
          <Table sx={{ minWidth: 440 }}>
            <TableHead>
              <TableRow>
                <TableCell align="left">Home Score</TableCell>
                <TableCell align="left">Home Team</TableCell>
                <TableCell align="left">Match Time</TableCell>
                <TableCell align="left">Away Team</TableCell>
                <TableCell align="left">Away Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {league.matches.map((match) => (
                <TableRow key={match.id}>
                  <TableCell>{match.statusId > 1 ? match.home.score : '-'}</TableCell>
                  <TableCell>{match.home.longName}</TableCell>
                  <TableCell>
                    <Link to={`/${match.id}`} style={{ textDecoration: 'none', color: 'inhert' }}>
                      {match.time}
                    </Link>
                  </TableCell>
                  <TableCell>{match.away.longName}</TableCell>
                  <TableCell>{match.statusId > 1 ? match.away.score : '-'}</TableCell>
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
