import { JwtPayload } from 'src/auth/types';

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };
