import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import env from "dotenv";
const GoogleStrategy = passportGoogle.Strategy;
import User from "../models/User.ts";
import { Profile } from "passport";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: "/oauth2/redirect/google",
      passReqToCallback: true,
    },
    async (
      req: any,
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: Function
    ) => {
      const user = await User.findOne({ googleId: profile.id });

      // If user doesn't exist creates a new user
      if (!user) {
        const newUser = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0].value,
        });

        if (newUser) {
          done(null, newUser);
        }
      } else {
        done(null, user);
      }
    }
  )
);

//Get user data and store in cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//Read cookie and get user id
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
