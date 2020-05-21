import boto3
from datetime import datetime, timedelta
from dbManager import updateLastCheckTimestamp
from feedParser import getNewFeeds
from feedPublisher import publishToWebHook
from configHandler import ConfigHandler

def getNewsPerProfile(event, context):

  print("event", event)
  # get profileID
  profileID = event.profileID
  # get last check timestamp
  config = ConfigHandler(profileID)
  lastCheckTimestamp = config.getLastCheckTimestmap()
  webhookURL = config.getWebhookURL()
  print(lastCheckTimestamp)
  print(config.getProfileConfig())
  # save new feeds
  ## publish start statement
  # publishToWebHook("{\"Content\":\"/md **Daily " + config.getProfileConfig()['profile'] + " news**\"}", webhookURL)
  newFeeds = getNewFeeds(profileID, lastCheckTimestamp)

  # mark new timestamp
  # now = datetime.now() - timedelta(days = 30)
  now = datetime.now()
  newLastCheckTimestmap = now.isoformat()
  # update last check timestamp
  updateLastCheckTimestamp(newLastCheckTimestmap)
  
  # publish an end statement
  # publishToWebHook("{\"Content\":\"/md *Stay classy " + config.getProfileConfig()['profile'] + "!*\"}", webhookURL)

  return True