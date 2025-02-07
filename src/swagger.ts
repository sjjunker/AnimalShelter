import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Animal Shelter API",
    description: "An API showing a list of shelter animals",
  },
  host: "animalshelter-wyak.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger.json";
const endpointFiles = ["./routes/index.ts"];

swaggerAutogen({ openai: "3.0.0" })(outputFile, endpointFiles, doc);
