// var express = require('express');
// var bodyParser = require('body-parser');
// var { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
// var { makeExecutableSchema } = require('graphql-tools');
//
// var typeDefs = [`
// type Query {
//   hello: String
// }
//
// schema {
//   query: Query
// }`];
//
// var resolvers = {
//     Query: {
//         hello(root) {
//             return 'world';
//         }
//     }
// };
//
// var schema = makeExecutableSchema({typeDefs, resolvers});
// var app = express();
// app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
// app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
// app.listen(4000, () => console.log('Now browse to localhost:4000/graphiql'));

const express = require('express'),
    graphqlHTTP = require('express-graphql'),
    {buildSchema} = require('graphql'),
    PORT = 4000;

let schema = buildSchema(`
      type Query {
        hello: String,
        test: String
      }
    `),
    root = {
        hello: () => 'Hello world!',
        test: () => 'FooBarBaz',
    },
    app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(PORT, () => console.log('Now browse to localhost:' + PORT + '/graphql'));