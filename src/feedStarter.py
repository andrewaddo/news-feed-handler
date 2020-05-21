import boto3
import json
from configHandler import ConfigHandler

client = boto3.client('lambda')


def getNews(event, context):

    # get all profiles
    config = ConfigHandler()
    profiles = config.getProfileConfigs()

    for profile in profiles:
        client.invoke(FunctionName='getNewsPerProfile',
                      InvocationType='Event',
                      Payload=json.dumps({'profileID': profile['id']}))

    return True
