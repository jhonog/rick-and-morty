# React + TypeScript + Vite

# Rick and Morty List Search App

## Introduction

This README provides instructions on how to run the Rick and Morty Search app, as well as information on how to use the Rick and Morty API that's integrated into the project.

## How to Run the App

To run the app locally, follow these steps:

1. Make sure you have Node.js installed on your machine.

2. Install Yarn if you haven't already. You can install it globally using npm with the following command:

``` shell
npm install -g yarn
```

3. Open your terminal and navigate to the project's root directory.

4. Run the following command to install the project's dependencies:

``` shell
yarn install 
```
or 

``` shell
just yarn
```

5. After the dependencies are installed, you can start the development server by running:

yarn dev


This command will start the app and open it in your default web browser at http://localhost:5173.

## GraphQL Integration

This project uses the Rick and Morty API to fetch character information using a GraphQL query. Here's how it's done:

1. Make sure you have Apollo Client installed as a dependency in your project.

2. Define a GraphQL query for retrieving character data. In your code, it looks like this:

  ```javascript
  const CHARACTERS_QUERY = gql`
    {
      characters {
        results {
          id
          name
          species
          image
          status
          gender
        }
      }
    }
  `;
  ```

## Integration with Apollo Client

1. Use the useQuery hook from Apollo Client to fetch data using the defined query. Here's how it's used:

  ```javascript
    const { loading, data } = useQuery(CHARACTERS_QUERY);
  ```

This hook returns the loading state and the fetched data.

2. Map the result of the query to have control over the character list, adding additional properties as needed. Here's an example:

  ```javascript
    const allCharacters: Character[] = data?.characters?.results.map((character: Character) => ({
      ...character,
      isStarred: false,
      isActivate: true,
      comments: []
    }));
  ```

Rick and Morty API Documentation

For more information on the Rick and Morty API, including details on available queries and mutations, refer to the Rick and Morty API documentation.