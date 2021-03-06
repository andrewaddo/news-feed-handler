import configparser
from datetime import datetime, timedelta
from dbManager import getDBProfileConfigs, getDBProfileConfig, getDBSearchConfig

class ConfigHandler:

  def __init__(self, profileID="ALL"):
    # DONE: load additional config from DB
    self.profileConfigs = []
    self.profileConfig = []
    self.searchConfig = []
    if profileID == "ALL":
      self.profileConfigs = getDBProfileConfigs()
    else:
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
