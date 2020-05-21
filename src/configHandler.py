import configparser
from datetime import datetime, timedelta
from dbManager import getDBProfileConfigs, getDBProfileConfig, getDBSearchConfig

class ConfigHandler:

  def __init__(self):
    # DONE: load additional config from DB
    self.profileConfigs = getDBProfileConfigs()
    print("")

  def __init__(self, profileID):
    # DONE: load additional config from DB
    self.profileConfig = getDBProfileConfig(profileID)[0]
    self.searchConfig = getDBSearchConfig(profileID)
    print("")

  def getProfileConfigs(self):
    return self.profileConfigs

  def getSearchConfig(self):
    return self.searchConfig

  def getLastCheckTimestmap(self):
    yesterday = datetime.now() - timedelta(days = 1)
    return self.profileConfig['lastCheckTimestamp'] if 'lastCheckTimestamp' in self.profileConfig else yesterday.isoformat()
  
  def getProfileConfig(self):
    return self.profileConfig

  def getWebhookURL(self):
    return self.profileConfig['webhookURL']

  def getProfileConfigTable(self):
    return self.properties['main']['PROFILECONFIG_TABLE']
  
  def getSearchConfigTable(self):
    return self.properties['main']['SEARCHCONFIG_TABLE']
  
  def getNewsTable(self):
    return self.properties['main']['NEWS_TABLE']