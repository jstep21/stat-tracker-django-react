import axiosInstance from 'api/axiosConfig';

export interface MatchGeneral {
    matchId: string;
    matchName: string;
    leagueRoundName: string;
    leagueId: number;
    leagueName: string;
    matchTimeUTC: string;
    started: boolean;
    finished: boolean;
    homeTeam: Team;
    awayTeam: Team;
}

export interface Team {
    name: string;
    id: number;
}

export interface TeamScore extends Team {
    score: number;
    imageUrl: string;
    pageUrl: string;
}

export interface MatchStatus {
    finished: boolean;
    started: boolean;
    scoreStr: string;
    numberOfHomeRedCards: number;
    numberOfAwayRedCards: number;
}

export interface MatchEvent {
    reactKey: string;
    timeStr: number;
    type: string;
    time: number;
    player: Player;
    goalDescription: string;
    assistStr: string | null;
}

export interface Player {
    id: number;
    name: string;
    profileUrl: string;
}

export interface MatchDetails {
    general: MatchGeneral;
    header: {
        teams: TeamScore[];
        status: MatchStatus;
        events: MatchEvents;
    }
}

export interface MatchEvents {
    homeTeamGoals: Record<string, MatchEvent[]>;
    awayTeamGoals: Record<string, MatchEvent[]>;
    homeTeamRedCards: Record<string, MatchEvent[]>;
    awayTeamRedCards: Record<string, MatchEvent[]>;
}

export const fetchMatch = async(matchId: number): Promise<MatchDetails> => {
    const { data } = await axiosInstance.get(`/matches/${matchId}`);
    return data;
}
