import re
import urllib
import requests

sitemap = 'https://wr0926.ml/sitemap.xml'

html = urllib.request.urlopen(sitemap).read().decode('utf-8')
result1 = html.replace('https://wr0926.ml', 'https://www.wr0926.ml')
result = re.findall(re.compile(r'(?<=<loc>).*?(?=</loc>)'), result1)
with open('urls.txt', 'w') as file:
  for data in result:
    print(data, file=file)
file.close()
