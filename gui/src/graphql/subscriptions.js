/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProfileConfig = /* GraphQL */ `
  subscription OnCreateProfileConfig {
    onCreateProfileConfig {
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
export const onUpdateProfileConfig = /* GraphQL */ `
  subscription OnUpdateProfileConfig {
    onUpdateProfileConfig {
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
export const onDeleteProfileConfig = /* GraphQL */ `
  subscription OnDeleteProfileConfig {
    onDeleteProfileConfig {
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
export const onCreateSearchConfig = /* GraphQL */ `
  subscription OnCreateSearchConfig {
    onCreateSearchConfig {
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
export const onUpdateSearchConfig = /* GraphQL */ `
  subscription OnUpdateSearchConfig {
    onUpdateSearchConfig {
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
export const onDeleteSearchConfig = /* GraphQL */ `
  subscription OnDeleteSearchConfig {
    onDeleteSearchConfig {
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
export const onCreateNews = /* GraphQL */ `
  subscription OnCreateNews {
    onCreateNews {
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
export const onUpdateNews = /* GraphQL */ `
  subscription OnUpdateNews {
    onUpdateNews {
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
export const onDeleteNews = /* GraphQL */ `
  subscription OnDeleteNews {
    onDeleteNews {
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
