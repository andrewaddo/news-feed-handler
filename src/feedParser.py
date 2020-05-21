import feedparser
from datetime import datetime
import json
import re
from dbManager import recordNewFeeds
from feedPublisher import publishToWebHook
from configHandler import ConfigHandler

def getNewFeeds(profileID, filterTime):
  # read search list
  config = ConfigHandler(profileID)
  searchItems = config.getSearchConfig()
  for searchItem in searchItems:
    searchString = searchItem['searchString'] if 'searchString' in searchItem else None
    if 'rss' in searchItem:
      rssUrl = searchItem['rss']
    else:
      if searchString == 'SPECIAL_HARD_TO_SEARCH':
        continue
      if not searchString.startswith('"'):
        searchString = '"' + searchString
      if not searchString.endswith('"'):
        searchString = searchString + '"'
      rssUrl = 'https://news.google.com/rss/search?hl=en-SG&gl=SG&ceid=SG:en&q=' + searchString.replace('"', "%22").replace(' ', '+')
    getNewFeedPerSearchItem(profileID, filterTime, searchItem, rssUrl)

def getNewFeedPerSearchItem(profileID, filterTime, searchItem, rssUrl):
  print("Filtering news for", searchItem["searchItem"], "with rss", rssUrl)
  # get the feed from url
  feeds = feedparser.parse(rssUrl).entries
  # print("Got feeds", feeds[0].published, datetime.strptime(feeds[0].published, '%a, %d %b %Y %H:%M:%S %z').isoformat(), "filter time", filterTime)
  for feed in feeds:
    print("feed time", feed.published, datetime.strptime(feed.published, '%a, %d %b %Y %H:%M:%S %z').isoformat())
  ## check each feed, filter by last check time
  ### security bulletins "Tue, 31 Mar 2020 18:17:41 +0000",
  ### AWS what's new has timestamp 'Fri, 15 May 2020 17:03:58 +0000' does not match format '%a, %d %b %Y %H:%M:%S %z'
  ### Google News has timestamp 'Fri, 15 May 2020 17:03:58 UTC' does not match format '%a, %d %b %Y %H:%M:%S %Z'
  newPosts = []
  try: 
    newPosts = {entry for entry in feeds if datetime.strptime(entry.published, '%a, %d %b %Y %H:%M:%S %Z').isoformat() > filterTime}
  except:
    print("Error with %Z")
    try: 
      newPosts = {entry for entry in feeds if datetime.strptime(entry.published, '%a, %d %b %Y %H:%M:%S %z').isoformat() > filterTime}
    except Exception as e: # work on python 3.x
      print('Failed to upload to ftp: '+ str(e))
  # print("Got filtered items", newPosts)
  filteredPosts = filterFeed(newPosts, searchItem)
  # publish a header
  for post in filteredPosts:
    # print("Title publish date", post.published, post.source, " filter date", filterTime)
    title = post.title
    result = recordNewFeeds(profileID, searchItem, post)
    # print(result)
    # testing
    # publishFeed(post)
    # quit()
    if result is None:
      print("getting duplicate - skipping")
      continue
    elif result is True:
      publishFeed(profileID, searchItem, post)

def publishFeed(profileID, searchItem, post):
  description = clean_html(post.description)
  config = ConfigHandler(profileID)
  webhookURL = config.getWebhookURL()
  # description = post.description
  # payload = "{\"Content\":\"" + post.title + "\\n\\n"  \
  #   + post.published + "\\n\\n" \
  #   + description + "\\n\\n" \
  #   + post.link + "\"}"
  payload = "{\"Content\":\"" + searchItem["searchItem"] + " - " + post.published + "\\n" \
    + post.title + "\\n" \
    + post.link + "\"}"
  # + description + "\\n" \
  printable = "\\n".join(payload.split("\n"))
  # print("post data", postData)
  publishToWebHook(printable, webhookURL)

# further filter feeds e.g.
## 1. List of known not-so-relevant sources
def filterFeed(posts, searchItem):
  blacklistSource = ["coin", "crypto", "crowdfundinsider", "newsletters", \
   "decrypt.co", "newsbtc", "u.today", "ethereumworldnews", \
   "coleofduty"]
  blacklistTitle = ["Market Insights", "Global Analysis", "Daily Briefing"]
  filteredPosts = set()
  for post in posts:
    # print("post", post)
    match = False
    for blackitem in blacklistSource:
      if hasattr(post, 'source') and blackitem in json.dumps(post.source):
        match = True
        break
    for blackitem in blacklistTitle:
      if blackitem in json.dumps(post.title):
        match = True
        break
    if ('Strict' in searchItem and searchItem['strict'] == "NAME_ON_TITLE"):
      if not searchItem["searchString"] in post.title:
        match = True
    if match == False:
      filteredPosts.add(post)
  return filteredPosts

def clean_html(raw_html):
  reg1 = re.compile('<.*?>')
  reg2 = re.compile('&nbsp;')
  clean_text = re.sub(reg1, '', raw_html)
  cleaner_text = re.sub(reg2, ' ', clean_text)
  return cleaner_text



