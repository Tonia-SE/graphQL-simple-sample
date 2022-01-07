const express = require('express');
const schema = require('./server/schema/schema.js');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose'); 

const app = express();

CONNECTION_URL = "mongodb+srv://devuser:qwerty123@cluster0.n3gup.mongodb.net/udemy_graphql_first?authSource=admin&replicaSet=atlas-6lvwl6-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
mongoose.connect(CONNECTION_URL);
mongoose.connection.once('open', () => {
  console.log('Connection to db has been established successfully');
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
