/* Takes a graphql query/mutation, and returns a valid request body that can be used with axios
 * Note: requires the following header: 'Content-Type': 'application/json' */
const graphqlRequestBody = (operation) => {
    return {query: operation}
};

module.exports = graphqlRequestBody;
