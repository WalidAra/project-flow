import passportStrategy from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { envConfig } from "@/config";
import { AuthService } from "@/core/application/services";

passportStrategy.use(
  new GoogleStrategy(
    {
      authorizationURL: envConfig.googleAuthUri,
      tokenURL: envConfig.googleTokenUri,
      clientID: envConfig.googleClientId as string,
      clientSecret: envConfig.googleClientSecret as string,
      callbackURL: envConfig.googleCallbackUrl,
    },
    async function (
      accessToken: string,
      refreshToken: string,
      profile: any,
      cb: (error: any, user?: any) => void,
    ) {
      try {
        const data = await AuthService.googleAuth(profile);
        return cb(null, data);
      } catch (error) {
        return cb(error, null);
      }
    },
  ),
);

passportStrategy.serializeUser(
  (user: any, done: (error: any, id?: any) => void) => {
    done(null, user);
  },
);

passportStrategy.deserializeUser(
  (user: any, done: (error: any, user?: any) => void) => {
    done(null, user);
  },
);

export default passportStrategy;
