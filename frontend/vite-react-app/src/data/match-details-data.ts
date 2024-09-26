import axiosInstance from 'api/axiosConfig';
import { Match } from './match-data';

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
    cancelled: boolean;
    awarded: boolean;
    scoreStr: string;
    reason: {
        short: string;
        shortKey: string;
        long: string;
        longKey: string;
    }
    numberOfHomeRedCards: number;
    numberOfAwayRedCards: number;
}

export interface MatchEvent {
    reactKey: string;
    type: string;
    time: number;
    overloadTime: number | null;
    eventId?: number;
    player?: Player;
    isHome?: boolean;
    ownGoal?: boolean;
    goalDescription?: string;
    isPenaltyShootoutEvent?: boolean;
    assistStr?: string | null;
    assistProfileUrl?: string;
    shotmapEvent?: ShotmapEvent;
    card?: string;
    cardDescription?: {
        localizedKey: string;
        defaultText: string;
    } | null;
}

export interface Player {
    id: number | null;
    name?: string;
    profileUrl?: string;
}

export interface PlayerOfTheMatch {
    id: number;
    name: {
        fullName: string;
    };
    teamName: string;
    teamId: number;
    rating: {
        num: string;
        isTop: {
            isTopRating: boolean;
            isMatchFinished: boolean;
        };
    };
    minutesPlayed: number;
    shotMap: ShotmapEvent[];
    pageUrl: string;
    isHomeTeam: boolean;
    stats: StatSection[];
    role: string;
}

export interface Periods {
    All: {
        stats: GameStatTitles;
        teamColors: {
            darkMode: {
                home: string;
                away: string;
            };
            lightMode: {
                home: string;
                away: string;
            };
            fontDarkMode: {
                home: string;
                away: string;
            };
            fontLightMode: {
                home: string;
                away: string;
            };
        };
    };
    FirstHalf: {
        stats: GameStatTitles;
        teamColors: {
            darkMode: {
                home: string;
                away: string;
            };
            lightMode: {
                home: string;
                away: string;
            };
            fontDarkMode: {
                home: string;
                away: string;
            };
            fontLightMode: {
                home: string;
                away: string;
            };
        };
    };
    secondHalf: {
        stats: GameStatTitles;
        teamColors: {
            darkMode: {
                home: string;
                away: string;
            };
            lightMode: {
                home: string;
                away: string;
            };
            fontDarkMode: {
                home: string;
                away: string;
            };
            fontLightMode: {
                home: string;
                away: string;
            };
        };
    };
}

export interface GameStats {
    periods: Periods;
}

// player names, stats and shotmap
export interface PlayerStats {
    name: string;
    stats: StatSection[];
    shotMap: ShotmapEvent[] | [];
}

// top stats, attacking, defending
export interface StatSection {
    title: string;
    key: string;
    stats: {
        [key: string]: PlayerStat;
    }
}

// rating, minutes, goals
export interface PlayerStat {
    key: string | null;
    stat: StatDetails;
}

export interface StatDetails {
    value: number | null;
    type?: string;
    total?: number;
}

// top stats, shots, passes, defense
export interface GameStatTitles {
    title: string;
    key: string;
    stats: GameStat[];
}

// possession, xG, shots
export interface GameStat {
    title: string;
    key: string;
    stats: Array<number | string>;
    type: string;
    highlighted: string;
}

export interface ShotmapEvent {
    id: number;
    eventType: string;
    teamId: number;
    playerId: number;
    playerName: string;
    x: number;
    y: number;
    min: number;
    minAdded: number;
    isBlocked: boolean;
    isOnTarget: boolean;
    blockedX: number | null;
    blockedY: number | null;
    goalCrossedY: number;
    goalCrossedZ: number;
    expectedGoals: number;
    expectedGoalsOnTarget: number;
    shotType: string;
    situation: string;
    period: string;
    isOwnGoal: boolean;
    onGoalShot: {
        x: number;
        y: number;
        zoomRatio: number;
    };
    isSavedOffLine: boolean;
    isFromInsideBox: boolean;
    teamColor: string;
}

export interface MatchesInRound {
    id: string;
    utcTime: string;
    roundId: string;
    roundName: string;
    status: MatchStatus;
    homeScore: number;
    awayScore: number;
    home: {
        id: string;
        name: string;
        shortName: string;
    };
    away: {
        id: string;
        name: string;
        shortName: string;
    };
}

export interface TeamForm {
    result: number;
    resultString: string;
    imageUrl: string;
    linkToMatch: string;
    date: {
        utcTime: string;
    };
    teamPageUrl: string;
    tooltipTexT: {
        utcTime: string;
        homeTeam: string;
        homeTeamId: number;
        homeScore: string;
        awayTeam: string;
        awayTeamId: number;
        awayScore: string;  
    };
    score: string;
    home: {
        id: string;
        name: string;
        isOurTeam: boolean;
    };
    away: {
        id: string;
        name: string;
        isOurTeam: boolean;
    };
}

export interface InfoBox {
    MatchDate: {
        utcTime: string;
        isDateCorrect: boolean;
    };
    Tournament: {
        id: number;
        parentLeagueId: number;
        link: string;
        leagueName: string;
        roundName: string;
        round: string;
        selectedSeason: string;
        isCurrentSeason: boolean;
    };
    Stadium: {
        name: string;
        city: string;
        country: string;
        lat: number;
        long: number;
    };
    Referee: {
        imgUrl: string;
        text: string;
        country: string;
    };
    Attendance: number;
}

export interface Insight {
    type: string;
    playerId: number | null;
    teamId: number;
    priority: number;
    text: string;
    color: string;
}

export interface MatchFacts {
     highlights: {
        image: string;
        url: string;
        source: string;
     };
     playerOfTheMatch: PlayerOfTheMatch;
     matchesInRound: MatchesInRound;
     events: {
        ongoing: boolean;
        events: MatchEvent[];
        eventTypes: string[];
        // penaltyShootoutEvents: MatchEvent[] | null;
     };
     infoBox: InfoBox;
     teamForm: TeamForm[][];
    //  poll: OddsPoll;
    //  topPlayers: ;
     insights: Insight[];
}

export interface Layout {
    x: number;
    y: number;
    height: number;
    width: number;
}

export interface SubEvent {
    time: number;
    type?: string;
    reason?: string;
}

export interface Performance {
    rating: number;
    substitutionEvents?: SubEvent[];
    seasonRating: number;
}

export interface PlayerInfo {
    id: number;
    age: number;
    name: string;
    positionId?: number;
    usualPlayingPositionId?: number;
    shirtNumber?: string;
    countryName: string;
    countryCode: string;
    unavailability?: {
        injuryId: number;
        type: string;
        expectedReturn: string;
    }
    horizontalLayout?: Layout;
    verticalLayout?: Layout;
    performance: Performance;
    firstName: string;
    lastName: string;
}

export interface Coach {
    id: number;
    age: number;
    name: string;
    countryName: string;
    countryCode: string;
    primaryTeamId: number;
    primaryTeamName: string;
}

export interface Team {
    id: number;
    name: string;
    rating: number;
    formation: string;
    starters: PlayerInfo[];
    coach: ContentVisibilityAutoStateChangeEvent;
    subs: PlayerInfo[];
    unavailable: PlayerInfo[];
    averageStarterAge: number;
}

export interface Lineup {
    matchId: number;
    lineupType: string;
    availableFilters: string[];
    homeTeam: Team;
    awayTeam: Team;
}

export interface Table {
    leagueId: string;
    url: string;
    teams: number[];
    tournamentNameForUrl: string;
    parentLeagueId: number;
    parentLeagueName: string;
    isCurrentSeason: boolean;
    parentLeagueSeason: string;
    countryCode: string;
}

export interface H2HMatch {
    time: {
        utcTime: string;
    };
    matchUrl: string;
    league: {
        name: string;
        id: string;
        pageUrl: string;
    };
    home: {
        name: string;
        id: string
    };
    status: {
        utcTime: string;
        started: boolean;
        cancelled: boolean;
        finished: boolean;
    };
    finished: boolean;
    away: {
        name: string;
        id: string;
    }
}

export interface H2H {
    summary: number[];
    matches: H2HMatch[];

}

export interface MomentumData {
    minute: number;
    value: number;
}

export interface Momentum {
    main: {
        data: MomentumData[];
    }
}

export interface MatchDetails {
    general: MatchGeneral;
    header: {
        teams: TeamScore[];
        status: MatchStatus;
        events: MatchEvents;
    },
    content: {
        matchFacts: MatchFacts;
        stats: GameStats;
        playerStats: {
            [id: string]: PlayerStats
        };
        shotmap: {
            shots: ShotmapEvent[];
            Periods: {
                All: ShotmapEvent[];
                FirstHalf: ShotmapEvent[];
                SecondHalf: ShotmapEvent[];
            }
        };
        lineup: Lineup,
        playoff: boolean;
        table: Table;
        h2h: H2H;
        momentum: Momentum;
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
