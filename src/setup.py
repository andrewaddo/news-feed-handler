import csv
import boto3

def importCustomerConfigToDB(csvCustomerConfig):
  json_data = convertCSVToJson(csvCustomerConfig)
  writeToDB(json_data)

def convertCSVToJson(file):
  items = []
  with open(file) as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
      print(row)
      data = {}
      data['Profile'] = row['Profile']
      data['Customer'] = row['Customer']
      data['SearchString'] = row['SearchString']
      data['Strict'] = row['Strict']
      items.append(data)
  return items

def writeToDB(jsonData):
  db = boto3.resource('dynamodb')
  table = db.Table('cf_customers')
  with table.batch_writer() as batch:
    for item in jsonData:
      batch.put_item(Item=item)