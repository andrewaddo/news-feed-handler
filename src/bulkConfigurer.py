import csv
import boto3
import uuid
from datetime import datetime

class BulkConfigurer:
  def __init__(self, profileID, fileName, tableName):
    self.__fileName = fileName
    self.__profileID = profileID
    self.__tableName = tableName

  def updateDB(self):
    self.__convertCSVToJson()
    self.__writeToDB()
  
  def __convertCSVToJson(self):
    self.__jsonItems = []
    currentDate = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%f')[:-3] + 'Z'
    with open(self.__fileName) as csvfile:
      reader = csv.DictReader(csvfile)
      for row in reader:
        print(row)
        data = {}
        data['id'] = str(uuid.uuid4())
        data['__typename'] = 'SearchConfig'
        data['createdAt'] = currentDate
        data['updatedAt'] = currentDate
        data['profileID'] = self.__profileID
        data['searchItem'] = row['Customer']
        data['searchString'] = row['SearchString']
        data['strict'] = row['Strict']
        self.__jsonItems.append(data)

  def __writeToDB(self):
    db = boto3.resource('dynamodb')
    table = db.Table(self.__tableName)
    with table.batch_writer() as batch:
      for item in self.__jsonItems:
        batch.put_item(Item=item)
