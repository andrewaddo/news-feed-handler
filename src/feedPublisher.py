import requests
from configHandler import ConfigHandler

POST_HEADERS = {"Content-Type": "application/json"}
profile = 'FinTech'

def publishToWebHook(postData):
  config = ConfigHandler(profile)
  WH_ADDRESS = config.getWebhookURL()
  # print("webhook", WH_ADDRESS)
  response = requests.post(WH_ADDRESS, data = postData.encode('utf-8'), headers = POST_HEADERS)
  if response.status_code == 200:
    print("Published to webhook")