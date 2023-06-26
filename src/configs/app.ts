interface CONFIGURATION {
  PORT: string | undefined;
}

const CONFIGURATION: CONFIGURATION = {
  PORT: process.env.PORT,
};

export default CONFIGURATION;

