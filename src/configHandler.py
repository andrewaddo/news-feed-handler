import configparser

class ConfigHandler:

  def __init__(self, type):
    config = configparser.ConfigParser()
    config.read('conf/properties.conf')
    # TODO: load additional config from DB

  def getKeyValue(self, key):
    return self.config[key]