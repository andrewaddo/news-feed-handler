import requests

POST_HEADERS = {"Content-Type": "application/json"}
WH_ADDRESS = "https://hooks.chime.aws/incomingwebhooks/69b9c527-fb9c-49a0-baf9-a0ea447751f8?token=cTNTRzMzVGl8MXxNZC1QR3RuY2ZLTjVkVnhRUWN2eDMxZmk2M3IwRU5uNjNVS3ZKVVAwWkQw"

def publishToWebHook(postData):
  response = requests.post(WH_ADDRESS, data = postData.encode('utf-8'), headers = POST_HEADERS)
  # response = requests.post(WH_ADDRESS, data = postData, headers = POST_HEADERS)
  if response.status_code == 200:
    print("Published to webhook")