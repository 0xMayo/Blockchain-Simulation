import crypto from 'crypto';

export const createHash = (stringtoHash) => {
    return crypto.createHash('sha256').update(stringtoHash).digest('hex');
};