from setup import importCustomerConfigToDB
from dbManager import getRecordCount

def test_importCustomerConfig():
  importCustomerConfigToDB('FinTech.csv')
  assert getRecordCount('cf_customers', 'Profile', 'FinTech') == 168 # credoLab duplicate

def test_ConstructRssUrl():
  string = '"abc de"'
  replacedString = string.replace('"', "%22").replace(' ', '+')
  expectedString = '%22abc+de%22'
  print(replacedString)
  assert  replacedString == expectedString

if __name__ == "__main__":
  test_importCustomerConfig()
  # test_ConstructRssUrl()
  print("Passed")
