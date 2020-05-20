/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProfileConfig = /* GraphQL */ `
  query GetProfileConfig($id: ID!) {
    getProfileConfig(id: $id) {
      id
      profile
      webhookURL
      searchConfigs {
        items {
          id
          profileID
          searchItem
          searchString
          rss
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listProfileConfigs = /* GraphQL */ `
  query ListProfileConfigs(
    $filter: ModelProfileConfigFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfileConfigs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        profile
        webhookURL
        searchConfigs {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSearchConfig = /* GraphQL */ `
  query GetSearchConfig($id: ID!) {
    getSearchConfig(id: $id) {
      id
      profileID
      searchItem
      searchString
      rss
      profileConfig {
        id
        profile
        webhookURL
        searchConfigs {
          nextToken
        }
        createdAt
        updatedAt
      }
      News {
        items {
          id
          searchConfigID
          title
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listSearchConfigs = /* GraphQL */ `
  query ListSearchConfigs(
    $filter: ModelSearchConfigFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSearchConfigs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        profileID
        searchItem
        searchString
        rss
        profileConfig {
          id
          profile
          webhookURL
          createdAt
          updatedAt
        }
        News {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNews = /* GraphQL */ `
  query GetNews($id: ID!) {
    getNews(id: $id) {
      id
      searchConfigID
      searchConfig {
        id
        profileID
        searchItem
        searchString
        rss
        profileConfig {
          id
          profile
          webhookURL
          createdAt
          updatedAt
        }
        News {
          nextToken
        }
        createdAt
        updatedAt
      }
      title
      createdAt
      updatedAt
    }
  }
`;
export const listNewss = /* GraphQL */ `
  query ListNewss(
    $filter: ModelNewsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNewss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        searchConfigID
        searchConfig {
          id
          profileID
          searchItem
          searchString
          rss
          createdAt
          updatedAt
        }
        title
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
