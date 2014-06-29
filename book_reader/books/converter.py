# assuming that title in on the first non-empty line

import glob

files = glob.glob('*.txt')

def add_book(title, chapters, file):
	return 'books.add(\"%s\", [%s], \"%s\");\n' % (title, ','.join(chapters), file)

with open('books.js', 'w') as sink:
	for f in files:
		with open(f, 'r') as source:
			name = f.replace('.txt', '')
			chapters = []
			chap_count = 0
			lines = source.read().split('\n')
			file = '%s.js'%name
			title = ''
			with open(file, 'w') as book:
				# book.write('<!DOCTYPE html><html><head><link rel="stylesheet" type="text/css" href="text.css"></head><body>')
				book.write('var TEXT =\'')
				# find title
				ind = 0
				for line in lines:
					ind += 1
					if line.replace(' ', ''):
						line = line.replace('\'', '\\\'')
						book.write('<p class="title">%s</p>' % line)
						title = line
						break

				for line in lines[ind:]:
					line = line.replace('\'', '\\\'')
					#check if line is empty
					if not line.replace(' ', ''): continue
					#check if line is chapter name
					start = line.split(' ')[0]
					if start.lower() == 'chapter':
						chapters.append('\"%s\"'%line)
						book.write('<a name="%schap%d"></a><p class="chapter">%s</p>' % (name, chap_count, line))
						chap_count+=1
					else:
						book.write('<p class="text">%s</p>' % line)
				# book.write('</body></html>')
				book.write('\';\n')
				book.write('document.getElementById("book").innerHTML = TEXT;')
			sink.write(add_book(title, chapters, name))

#<script type="text/javascript" src="bookmark.js"></script>