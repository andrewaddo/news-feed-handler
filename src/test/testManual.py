import sys
sys.path.insert(0, '.')

from src.setup import importCustomerConfigToDB
from src.dbManager import getRecordCount
from src.feedHandler import getNewsPerProfile

def test_importCustomerConfig():
  importCustomerConfigToDB('FinTech.csv')
  assert getRecordCount('nfh_SearchConfig', 'Profile', 'FinTech') == 168 # credoLab duplicate

def test_ConstructRssUrl():
  string = '"abc de"'
  replacedString = string.replace('"', "%22").replace(' ', '+')
  expectedString = '%22abc+de%22'
  print(replacedString)
  assert  replacedString == expectedString

def test_GetNewsForAProfile():
  getNewsPerProfile(event={'profileID': '3994c1d2-0a72-44e9-8b73-31ff6b401dc2', 'testBackDay':40, 'isTest': True}, context={})

if __name__ == "__main__":
  test_GetNewsForAProfile()
  # test_importCustomerConfig()
  # test_ConstructRssUrl()
  print("Passed")


