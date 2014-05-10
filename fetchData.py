import urllib2
import re

f = open("words.js", 'w')
f.write("<!--\nvar dict = [")

for p in range(1, 16):
	url = str(p)
	if len(url) < 2:
		url = "0" + url
	
	#fetch data
	
	fetch = urllib2.urlopen(urllib2.Request("http://www.majortests.com/gre/wordlist_"+url)).read()
	fetch = fetch.split("tr><th>")[1:]
	for i in range(len(fetch)):
		fetch[i] = re.split('</th><td>|</td></tr>',fetch[i])[0:2]
	
	#save to file
	for k in range(5):
		try:
			f.write("\n\t[\n\t\t{")
			data = [""]*20
			for i in range(k*20, k*20+20):
				fetch[i][0] = "\n\t\t\tword: [\"" + fetch[i][0] + "\"], "
				fetch[i][1] = "\n\t\t\tdef: [\"" + "\", \"".join(fetch[i][1].split('; ')) + "\"]"
				data[i-k*20] = "".join(fetch[i])
			f.write("\n\t\t},{".join(data).replace("<i>", "").replace("</i>","")+"\n\t\t}\n\t],")
		except: 
			pass

f.write("\n]\n-->")