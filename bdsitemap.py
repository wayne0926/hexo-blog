import re
import urllib
import requests
import codecs

sitemap = 'https://wr0926.ml/sitemap.xml'
html = urllib.request.urlopen(sitemap).read().decode('utf-8')
result = html.replace('https://wr0926.ml', 'https://www.wr0926.ml')
f = codecs.open('baidu-sitemap.xml', mode='a', encoding='utf-8')
f.write(result)
f.close
print(result)
