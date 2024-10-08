declare namespace NodeJS {
  interface ProcessEnv {
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
    DB_SYNC: boolean;
    ACCESS_TOKEN_SECRET_KEY: string;
    ACCESS_TOKEN_EXPIRES: string;
    REFRESH_TOKEN_SECRET_KEY: string;
    REFRESH_TOKEN_SECRET_KEY: string;
    REFRESH_TOKEN_EXPIRES: string;
  }
}
