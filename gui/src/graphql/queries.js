/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProfileConfig = /* GraphQL */ `
  query GetProfileConfig($profile: ID!) {
    getProfileConfig(profile: $profile) {
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
    $profile: ID
    $filter: ModelProfileConfigFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listProfileConfigs(
      profile: $profile
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
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
  query GetSearchConfig($profileID: ID!, $searchItem: String!) {
    getSearchConfig(profileID: $profileID, searchItem: $searchItem) {
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
    $profileID: ID
    $searchItem: ModelStringKeyConditionInput
    $filter: ModelSearchConfigFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSearchConfigs(
      profileID: $profileID
      searchItem: $searchItem
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
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
