import wget
import re
import sys
import os
import subprocess
import sys
import webbrowser
import requests
from apiclient.discovery import build

service = build("customsearch", "v1", developerKey="<Developer Key>")
res = service.cse().list(
    q = sys.argv[1],
    cx = '<Your cx>',
    searchType = 'image',
    num=10,
    imgType='photo',
    imgSize='huge'
).execute()
currentPath = os.getcwd()
if not 'items' in res:
    print('No result !!\nres is: {}'.format(res))
else:
    print("Downloading images for {}".format(sys.argv[1]))
    deleteFolder = '{}{}'.format(currentPath, "/Download")
    for file in os.listdir(deleteFolder):
        file_path = os.path.join(deleteFolder, file)
        try:
            if os.path.isfile(file_path):
                os.unlink(file_path)
        except Exception as e:
            print(e)
    for item in res['items']:
        # print('{}:\n\t{}'.format(item['title'], item['link']))
        try:
            os.chdir('{}{}'.format(currentPath, "/Download"))
            wget.download(item['link'])
        except Exception as e:
            print(e)
os.chdir(currentPath)
print("Current Path: {}".format(currentPath))
webbrowser.open("{}".format(os.path.realpath('index.html')))
print("Path: {}".format(os.path.realpath('index.html')))
subprocess.run("node index.js")
