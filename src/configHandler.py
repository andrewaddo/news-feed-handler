import configparser

class ConfigHandler:

  def __init__(self):
    self.config = configparser.ConfigParser()
    self.config.read('conf/properties.conf')
    # TODO: load additional config from DB

  def getKeyValue(self, key):
    return self.config['main'][key]