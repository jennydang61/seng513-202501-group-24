// used for hashing password so plain passwords are not saved in the db
import bcrypt from 'bcrypt';

export const hashValue = async (value: string, saltRounds?: number) => 
    bcrypt.hash(value, saltRounds || 10);

export const compareValue = async (value: string, hashedValue: string) =>
    bcrypt.compare(value, hashedValue).catch(() => false);