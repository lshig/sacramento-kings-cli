export interface Statistics {
  name: string;
  value: number;
}

export interface Record {
  summary: string;
  stats: Array<Statistics>;
  type: string;
}

export interface Competitor {
  homeAway: string;
  team: {
    abbreviation: string;
    color?: string;
    alternateColor?: string;
  };
  score?: string;
  winner?: boolean;
}

export interface Competition {
  boxscoreAvailable?: boolean;
  competitors: Array<Competitor>;
  date?: string;
  id?: string;
  status: {
    type: {
      completed: boolean;
      detail: string;
    };
  };
}

export interface NextEvent {
  competitions: Array<Competition>;
  date: string;
  id: string;
  name: string;
}

export interface FilteredCompetitor {
  isHome: boolean;
  primaryColor: string;
  secondaryColor: string;
  score?: string;
  team: string;
}
