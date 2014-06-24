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
			file = '%s.html'%name
			title = ''
			with open(file, 'w') as book:
				book.write('<!DOCTYPE html><html><head><link rel="stylesheet" type="text/css" href="text.css"></head><body>')
				# find title
				ind = 0
				for line in lines:
					ind += 1
					if line.replace(' ', ''):
						book.write('<p class=\'title\'>%s</p>\n' % line)
						title = line
						break

				for line in lines[ind:]:
					#check if line is empty
					if not line.replace(' ', ''): continue
					#check if line is chapter name
					start = line.split(' ')[0]
					if start.lower() == 'chapter':
						chapters.append('\"%s\"'%line)
						book.write('<a name=\'chap%d\'></a><p class=\'chapter\'>%s</p>\n' % (chap_count, line))
						chap_count+=1
					else:
						book.write('<p class=\'text\'>%s</p>\n' % line)
				book.write('</body><script type="text/javascript" src="book.js"></script></html>')
			sink.write(add_book(title, chapters, file))
