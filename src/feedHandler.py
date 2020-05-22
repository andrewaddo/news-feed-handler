import boto3
from datetime import datetime, timedelta
from dbManager import updateLastCheckTimestamp
from feedParser import getNewFeeds
from feedPublisher import publishToWebHook
from configHandler import ConfigHandler

def getNewsPerProfile(event, context):

  print("event", event)
  # get profileID
  profileID = event['profileID']
  # get last check timestamp
  config = ConfigHandler(profileID)
  lastCheckTimestamp = config.getLastCheckTimestmap()
  webhookURL = config.getWebhookURL()
  print(lastCheckTimestamp)
  print(config.getProfileConfig())
  # mark new timestamp
  # now = datetime.now() - timedelta(days = 30)
  now = datetime.now()
  newLastCheckTimestmap = now.isoformat()

  ## publish start statement
  publishToWebHook("{\"Content\":\"/md **Daily " + config.getProfileConfig()['profile'] + " news**\"}", webhookURL)
  
  # is this a test
  if 'isTest' in event and event['isTest'] is True:
    testFrom = datetime.now() - timedelta(days = event['testBackDay'] if 'testBackDay' in event else 3)
    newFeeds = getNewFeeds(profileID, testFrom.isoformat(), isTest=True)
    return True
  
  # fool proof TODO refactor me
  newFeeds = getNewFeeds(profileID, lastCheckTimestamp, isTest=False)
  
  # update last check timestamp
  updateLastCheckTimestamp(profileID, newLastCheckTimestmap)
  
  # publish an end statement
  publishToWebHook("{\"Content\":\"/md *Stay classy " + config.getProfileConfig()['profile'] + "!*\"}", webhookURL)

  return True