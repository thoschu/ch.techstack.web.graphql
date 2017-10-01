/**
 * Created by Tom S.
 */
const {request, GraphQLClient} = require('graphql-request');

const query = `{
  Movie(title: "Inception") {
    releaseDate
    actors {
      name
    }
  }
}`;

const query2 = `{
    test
}`;

request('https://api.graph.cool/simple/v1/movies', query).then(data => console.log(data));

// ... or create a GraphQL client instance to send requests
const client = new GraphQLClient('http://localhost:4000/graphql', { headers: {} });

//client.request(query, variables).then(data => console.log(data));
client.request(query2).then(data => console.log(data));