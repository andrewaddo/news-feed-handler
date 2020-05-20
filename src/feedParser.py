import feedparser
from datetime import datetime
import json
import re
from dbManager import recordNewFeeds, getCustomerConfig
from feedPublisher import publishToWebHook
from configHandler import ConfigHandler

# feed_url = 'https://news.google.com/rss/search?hl=en-SG&gl=SG&ceid=SG:en&q=%22Kyber+Network%22'

def getNewFeeds(profile, filterTime):
  # read search list
  config = ConfigHandler(profile)
  searchItems = config.getSearchConfig()
  for searchItem in searchItems:
    searchString = searchItem['SearchString'] if 'SearchString' in searchItem else None
    if 'RSS' in searchItem:
      rssUrl = searchItem['RSS']
    else:
      if searchString == 'SPECIAL_HARD_TO_SEARCH':
        continue
      if not searchString.startswith('"'):
        searchString = '"' + searchString
      if not searchString.endswith('"'):
        searchString = searchString + '"'
      rssUrl = 'https://news.google.com/rss/search?hl=en-SG&gl=SG&ceid=SG:en&q=' + searchString.replace('"', "%22").replace(' ', '+')
    getNewFeedPerCustomer(profile, filterTime, searchItem, rssUrl)

def getNewFeedPerCustomer(profile, filterTime, searchItem, rssUrl):
  print("Filtering news for", searchItem["SearchItem"])
  # get the feed from url
  feeds = feedparser.parse(rssUrl).entries
  ## check each feed, filter by last check time
  ### AWS what's new has timestamp 'Fri, 15 May 2020 17:03:58 +0000' does not match format '%a, %d %b %Y %H:%M:%S %z'
  ### Google News has timestamp 'Fri, 15 May 2020 17:03:58 UTC' does not match format '%a, %d %b %Y %H:%M:%S %Z'
  try: 
    newPosts = {entry for entry in feeds if datetime.strptime(entry.published, '%a, %d %b %Y %H:%M:%S %Z').isoformat() > filterTime}
  except:
    print("Error with %Z")
    try: 
      newPosts = {entry for entry in feeds if datetime.strptime(entry.published, '%a, %d %b %Y %H:%M:%S %z').isoformat() > filterTime}
    except:
      print("Error with %z! Unable to handle news timestamp format")

  filteredPosts = filterFeed(newPosts, searchItem)
  # publish a header
  for post in filteredPosts:
    # print("Title publish date", post.published, post.source, " filter date", filterTime)
    title = post.title
    result = recordNewFeeds(profile, searchItem, post)
    # print(result)
    # testing
    # publishFeed(post)
    # quit()
    if result is None:
      print("getting duplicate - skipping")
      continue
    elif result is True:
      publishFeed(profile, searchItem, post)

def publishFeed(profile, searchItem, post):
  description = clean_html(post.description)
  # description = post.description
  # payload = "{\"Content\":\"" + post.title + "\\n\\n"  \
  #   + post.published + "\\n\\n" \
  #   + description + "\\n\\n" \
  #   + post.link + "\"}"
  payload = "{\"Content\":\"" + profile + " - " + searchItem["SearchItem"] + " - " + post.published + "\\n" \
    + post.title + "\\n" \
    + post.link + "\"}"
  # + description + "\\n" \
  printable = "\\n".join(payload.split("\n"))
  # print("post data", postData)
  publishToWebHook(printable)

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
    if ('Strict' in searchItem and searchItem['Strict'] == "NAME_ON_TITLE"):
      if not searchItem["SearchString"] in post.title:
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



