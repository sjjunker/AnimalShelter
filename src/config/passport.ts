import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import env from "dotenv";
import { Profile } from "passport";
import { GetDatabase } from "../db/connection.ts";

env.config({ path: "AnimalShelter" + "/.env" });

const GoogleStrategy = passportGoogle.Strategy;

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
      //Get the collection
      const collection = GetDatabase().collection("Users");

      try {
        //Find the google user
        const user = await collection.findOne({ googleId: profile.id });

        // If user doesn't exist creates a new user
        if (!user) {
          const newUser = {
            username: profile.displayName,
            googleId: profile.id,
            petNumber: null,
            city: "",
            state: "",
            familySize: null,
          };

          try {
            const result = await collection.insertOne(newUser);

            if (result.insertedId) {
              const createdUser = await collection.find({
                _id: result.insertedId,
              });
              done(null, createdUser);
            }
          } catch (error) {
            console.log(`Error adding new user: ${error}`);
          }
        } else {
          done(null, user);
        }
      } catch (error) {
        console.log(`Error looking up user: ${error}`);
        done(error, null);
      }
    }
  )
);

//Get user data and store in cookie
passport.serializeUser((user: any, done) => {
  console.log("Serializing user:", user.googleId);
  done(null, user.googleId);
});

//Read cookie and get user id
passport.deserializeUser(async (id: string, done) => {
  try {
    const collection = GetDatabase().collection("Users");
    const user = await collection.findOne({ googleId: id });

    if (!user) {
      return done(new Error("User not found"), null);
    }

    console.log("Deserializing user:", user);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
