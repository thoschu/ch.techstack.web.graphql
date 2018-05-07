const { graphql, buildSchema } = require('graphql');

// Maps id to User object
var fakeDatabase = {
    1: {
        id: 'a',
        name: 'tom',
    },
    2: {
        id: 'b',
        name: 'thomas',
    },
};

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Post {
    id: Int!
    userId: Int
    title: String
    body: String
  }
  
  type Query {
    hello: String
    foo: String
    posts: [Post]
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);


const typeDefs = `
  type Post {
    id: Int!
    userId: Int
    title: String
    body: String
  }
  type Query {
    posts: [Post]
  }
`;
const resolvers = {
    Query: {
        posts: async () => fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
    }
}


// The root provides a resolver function for each API endpoint
const root = {
    hello: () => {
        return 'Hello world!';
    },
    foo: () => {
        return '13';
    },
    bar: ({id}) => {

        console.log(id);

        //return fakeDatabase[id];
        return  {
            id: 'c',
            name: 'online'
        };
    },
    rollDice: function ({numDice, numSides}) {
        var output = [];
        for (var i = 0; i < numDice; i++) {
            output.push(1 + Math.floor(Math.random() * (numSides || 6)));
        }
        return output;
    },
    
};

// Run the GraphQL query '{ hello }' and print out the response
graphql(schema, '{ hello }', root).then((response) => {
    console.log(response);
});

// Run the GraphQL query '{ foo }' and print out the response
graphql(schema, '{ foo(id: "a") }', root).then((response) => {
    console.log(response);
});


graphql(schema, '{rollDice(numDice: 3, numSides: 6)}', root).then((response) => {
    console.log(response);
});
