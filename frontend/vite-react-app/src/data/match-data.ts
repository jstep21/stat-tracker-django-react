// import { LinearProgressProps } from '@mui/material';
import axiosInstance from 'api/axiosConfig';

export interface Match {
  id: number;
  leagueId: number;
  time: string;
  home: {
    id: number;
    score: number | null;
    name: string;
    longName: string;
  };
  away: {
    id: number;
    score: number | null;
    name: string;
    longName: string;
  };
  statusId: number;
  tournamentStage: string;
  // can add 'status' here from API response later if needed
}

export interface League {
  ccode: string;
  id: number;
  primaryId: number;
  name: String;
  matches: Match[];
}

// export interface ApiResponse {
//   leagues: League[];
// }

export const fetchMatches = async(date: string): Promise<League[]> => {
  const response = await axiosInstance.get(`/matches/?date=${date}`);
  if (!response.data) throw new Error('No data receieved');
  return response.data;
}