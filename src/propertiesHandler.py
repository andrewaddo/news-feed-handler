import configparser

class PropertiesHandler:

  def __init__(self):
    self.properties = configparser.ConfigParser()
    self.properties.read('conf/properties.conf')
    print("")

  def getProfileConfigTable(self):
    return self.properties['main']['PROFILECONFIG_TABLE']
  
  def getSearchConfigTable(self):
    return self.properties['main']['SEARCHCONFIG_TABLE']
  
  def getNewsTable(self):
    return self.properties['main']['NEWS_TABLE']