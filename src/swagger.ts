import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Animal Shelter API",
    description: "An API showing a list of shelter animals",
  },
  host: "animalshelter-wyak.onrender.com",
  schemes: ["https"],
  components: {
    securitySchemes: {
      OAuth2: {
        type: "oauth2",
        flows: {
          authorizationCode: {
            authorizationUrl:
              "https://animalshelter-wyak.onrender.com/oauth/authorize",
            tokenUrl: "https://animalshelter-wyak.onrender.com/oauth/token",
            scopes: {
              read: "Grants read access",
              write: "Grants write access",
              admin: "Grants access to admin operations",
            },
          },
        },
      },
    },
  },
};

const outputFile = "./swagger.json";
const endpointFiles = ["./routes/index.ts"];

swaggerAutogen({ openai: "3.0.0" })(outputFile, endpointFiles, doc);
