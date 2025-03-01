import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Animal Shelter API",
    description: "An API showing a list of shelter animals",
  },
  host: ["animalshelter-wyak.onrender.com"],
  schemes: ["https"],
  components: {
    securitySchemes: {
      OAuth2: {
        type: "oauth2",
        flows: {
          implicit: {
            authorizationUrl: [
              "https://animalshelter-wyak.onrender.com/auth/google",
              "http://localhost:3000/auth/google",
            ],
          },
        },
      },
    },
  },
};

const outputFile = "./swagger.json";
const endpointFiles = ["./routes/index.ts"];

swaggerAutogen(outputFile, endpointFiles, doc);
