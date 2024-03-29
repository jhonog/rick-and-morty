import gql from 'graphql-tag';

export const CHARACTERS_QUERY = gql`
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