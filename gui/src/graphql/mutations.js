/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProfileConfig = /* GraphQL */ `
  mutation CreateProfileConfig(
    $input: CreateProfileConfigInput!
    $condition: ModelProfileConfigConditionInput
  ) {
    createProfileConfig(input: $input, condition: $condition) {
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
export const updateProfileConfig = /* GraphQL */ `
  mutation UpdateProfileConfig(
    $input: UpdateProfileConfigInput!
    $condition: ModelProfileConfigConditionInput
  ) {
    updateProfileConfig(input: $input, condition: $condition) {
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
export const deleteProfileConfig = /* GraphQL */ `
  mutation DeleteProfileConfig(
    $input: DeleteProfileConfigInput!
    $condition: ModelProfileConfigConditionInput
  ) {
    deleteProfileConfig(input: $input, condition: $condition) {
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
export const createSearchConfig = /* GraphQL */ `
  mutation CreateSearchConfig(
    $input: CreateSearchConfigInput!
    $condition: ModelSearchConfigConditionInput
  ) {
    createSearchConfig(input: $input, condition: $condition) {
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
export const updateSearchConfig = /* GraphQL */ `
  mutation UpdateSearchConfig(
    $input: UpdateSearchConfigInput!
    $condition: ModelSearchConfigConditionInput
  ) {
    updateSearchConfig(input: $input, condition: $condition) {
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
export const deleteSearchConfig = /* GraphQL */ `
  mutation DeleteSearchConfig(
    $input: DeleteSearchConfigInput!
    $condition: ModelSearchConfigConditionInput
  ) {
    deleteSearchConfig(input: $input, condition: $condition) {
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
export const createNews = /* GraphQL */ `
  mutation CreateNews(
    $input: CreateNewsInput!
    $condition: ModelNewsConditionInput
  ) {
    createNews(input: $input, condition: $condition) {
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
export const updateNews = /* GraphQL */ `
  mutation UpdateNews(
    $input: UpdateNewsInput!
    $condition: ModelNewsConditionInput
  ) {
    updateNews(input: $input, condition: $condition) {
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
export const deleteNews = /* GraphQL */ `
  mutation DeleteNews(
    $input: DeleteNewsInput!
    $condition: ModelNewsConditionInput
  ) {
    deleteNews(input: $input, condition: $condition) {
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
