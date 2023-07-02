export enum Platform {
  Twitch = "Twitch",
  Youtube = "YouTube",
  Tiktok = "TikTok",
  Kick = "Kick",
  Rumble = "Rumble",
}


export interface NewStreamerI {
  streamerName: string;
  streamingPlatform: string;
  streamerDescription: string;
}

export interface StreamerDetailsI {
  streamerName: string;
  platform: string;
  streamerDescription: string;
  image: string;
}

export type VoteType = 'plus' | 'minus'

export interface UpdateVoteI {
  userId: string;
  type: VoteType;
}

export interface NewStreamerHeaderI {
  openForm: () => void;
  closeModal: () => void;
}

export interface ErrorType {
  response: {
    data: {
      message: string;
    };
  };
}

export interface PaginationI {
  page: number;
  handleChangePagePrev: () => void;
  handleChangePageNext: () => void;
  totalPages: number;
  handleSetItemsOnPage: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface ShortDescriptionAboutPlatformI {
  shortDescription: string;
}

export interface StreamerHeaderI {
  openForm: () => void;
  streamers: number;
  isLoading: boolean;
}

export interface ErrorPageI {
  status: number;
  message: string;
  error: any;
}

export interface StreamingApplication {
  streamers: {
  id: string;
  streamerName: string;
  streamingPlatforms: {
    id: string;
    streamingPlatform: string;
    streamingDescription: string;
  }[];
  upvotes: number;
  downvotes: number;
  }[]
  totalPages: number;
  totalStreamersCount: number;
}

export interface StreamingPlatformsI {
  id: string;
  streamingPlatform: string;
  streamingPlatformDescription: string;
}

export interface PlatformDescriptionI {
  platform: string;
}