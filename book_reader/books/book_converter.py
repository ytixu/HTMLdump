# use $chap$ as an indicator for chapter/sections
# user $title$ as an indocator for the title (title should be on the first chapter)

import glob

chp_code = '$chap$'
ttl_code = '$title$'

files = glob.glob('*.txt')

def add_book(title, chapters):
	return 'books.add(\"%s\", [%s]);\n' % (title, ','.join(chapters))

with open('books.js', 'w') as sink:
	for f in files:
		with open(f, 'r') as source:
			chapters = source.read().split(chp_code)
			title = chapters[0].replace(ttl_code, '').replace('\n', '')
			chapters = [chp_code.join(chapters[:2])] + [chp_code+c for c in chapters[2:]]
			chap_name = []
			# save
			for i,chap in enumerate(chapters):
				with open('%s_%d.js'%(title.replace(' ', '_'), i), 'w') as chap_sink:
					chap_sink.write('var TEXT =\'')					
					for line in chap.split('\n'):
						line = line.replace('\'', '\\\'')
						if not line.replace(' ', ''): continue
						if chp_code in line:
							line = line.replace(chp_code, '')
							chap_name.append('"'+line+'"')
							chap_sink.write('<p class="chapter">%s</p>' % line)
						elif ttl_code in line:
							line = line.replace(ttl_code, '')
							chap_sink.write('<p class="title">%s</p>' % line)
						else:
							chap_sink.write('<p class="text">%s</p>' % line)
					
					chap_sink.write('\';\n')
					chap_sink.write('document.getElementById("book").innerHTML = TEXT;')

			sink.write(add_book(title, chap_name))

