export type ApiKey = {
    locked: boolean;
    name: string;
    quota: number;
    quota_limit: string;
    userid: string;
    key: string;
    usage: number;
  };