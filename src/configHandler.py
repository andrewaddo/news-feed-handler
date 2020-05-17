import configparser
from dbManager import getProfileConfig, getSearchConfig

class ConfigHandler:

  def __init__(self, profile):
    # self.config = configparser.ConfigParser()
    # self.config.read('conf/properties.conf')
    # DONE: load additional config from DB
    self.profileConfig = getProfileConfig(profile)[0]
    self.searchConfig = getSearchConfig(profile)
    print("")

  def getSearchConfig(self):
    return self.searchConfig

  def getLastCheckTimestmap(self):
    return self.profileConfig['LastCheckTimestamp']
  
  def getWebhookURL(self):
    return self.profileConfig['WebhookURL']