import requests
from configHandler import ConfigHandler

POST_HEADERS = {"Content-Type": "application/json"}
profileID = '6fe2666a-6566-4a23-bfc5-1ce2da0dbfbd'

def publishToWebHook(postData, webhookURL):
  # print("webhook", WH_ADDRESS)
  response = requests.post(webhookURL, data = postData.encode('utf-8'), headers = POST_HEADERS)
  if response.status_code == 200:
    print("Published to webhook")