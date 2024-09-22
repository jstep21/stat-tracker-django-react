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

interface MatchTableProps {
  data: League[];
}

const MatchesTable: React.FC<MatchTableProps> = ({data}) => {

  return (
    <Paper sx={{ p: { xs: 4, sm: 8 }, height: 1 }}>
      <Typography variant="h4" color="common.white" mb={6}>
        Today's Matches
      </Typography>
      {data.map((league: League) => (
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
                  <TableCell>{match.home.score !== null ? match.home.score : '-'}</TableCell>
                  <TableCell>{match.home.longName}</TableCell>
                  <TableCell>{match.time}</TableCell>
                  <TableCell>{match.away.longName}</TableCell>
                  <TableCell>{match.away.score !== null ? match.away.score : '-'}</TableCell>
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
