import dotenv from 'dotenv';

dotenv.config();

// Export region for app use ( default is set to eu-west-1 )
export const REGION = process.env.REGION || 'eu-central-1';
