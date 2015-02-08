import collections as clt

letter_freq = ['E','T','A','O','I','N','S','R','H','L','D','C','U','M','F','P','G','W','Y','B','V','K','X','J','Q','Z',' ']

def swap(i,j,array):
	temp = array[i]
	array[i] = array[j] 
	array[j] = temp

def mono_sub(cipher):
	letter_dist = sorted(clt.Counter(cipher.replace(" ","")).items(), key=lambda t: t[1], reverse = True)
	print letter_dist
	letter_place = {letter_dist[i][0]:letter_freq[i] for i,_ in enumerate(letter_dist)}
	letter_place[" "] = " " 
	swap("V", "B",letter_place)
	print letter_place
	message = ""
	for i in cipher:
		message += letter_place[i]
	print message


letter_sub = {"Q":"T", "V":"H", "F":"E"}
def mono_letter_sub(cipher):
	message = ""
	for l in cipher:
		if l in letter_sub:
			message += letter_sub[l]
		else:
			message += l
	print message

mono_sub("JGRMQOYGHMVBJWRWQFPWHGFFDQGFPFZRKBEEBJIZQQOCIBZKLFAFG QVF ZFWWEOGWOPFGFHWOLPHLRLOLFDMFGQWBLWBWQOLKFWBYLBLYLFSFLJGRMQBOLWJVFPFWQVHQWFFPQO QVF PQOCFPOGFWFJIGFQVHLHLRO QVF GWJVFPFOLFHGQV QVF ILEOGQILHQFQGIQVVOSFAFGBWQVHQWIJVWJVFPFWHGFIWIHZZRQGBABHZQOCGFHX")