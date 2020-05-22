import boto3
import json
from configHandler import ConfigHandler
# local test! there must be a better way
# from feedHandler import getNewsPerProfile

client = boto3.client('lambda')


def getNews(event, context):

    # get all profiles
    config = ConfigHandler()
    profiles = config.getProfileConfigs()
    print("profiles", profiles)
    for profile in profiles:
        client.invoke(FunctionName='getNewsPerProfile',
                      InvocationType='Event',
                      Payload=json.dumps({'profileID': event['id'], 'isTest': True}))
        # local test! there must be a better way
        # getNewsPerProfile(event={'profileID': profile['id']}, context={})
    return True
