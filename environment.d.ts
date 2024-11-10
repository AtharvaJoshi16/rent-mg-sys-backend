declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      TEST_PORT: number;
      DATABASE_URL: string;
      HOST: number;
      JWT_SECRET: string;
      EMAIL: string;
      PASS: string;
      USER_LOGIN_EXP_TIME: string;
    }
  }
}

export {};
