import requests
import re

try:
    import cPickle as pickle
except:
    import pickle

import zen

URL = 'http://quizlet.com/47571/barrons-gre-wordlist-4759-words-flash-cards/'
wrd_loc = ['<span class=\'qWord lang-en\'>', '</span>']
def_loc = ['<span class=\'qDef lang-en\'>', '</span>']

class gre_nexus:
	def __init__(self):
		self.G = zen.Graph()
		self.build()
		pickle.dump(self.G, open("network_.die", "wb"), protocol=2)

	def add_pair(self, w, def_lst, def_str):
		w = w.strip().lower()
		if self.G.__contains__(w):
			self.G.set_node_data(w, def_str)
		else:
			self.G.add_node(w, data=def_str)
		for d_raw in def_lst:
			d = d_raw.strip().lower()
			if not self.G.__contains__(d):
				self.G.add_node(d)
			try:
				self.G.add_edge(w, d)
			except(zen.exceptions.ZenException):
				pass

	def is_def(self, d):
		return self.G.node_data(d) == None

	def collapse(self):
		nodes = self.G.nodes()
		for w in nodes:
			if self.is_def(w):
				neigh_lst = self.G.neighbors(w)
				l = len(neigh_lst)
				for i in xrange(l):
					for j in xrange(i+1, l):
						try:
							self.G.add_edge(neigh_lst[i], neigh_lst[j])
						except(zen.exceptions.ZenException):
							self.G.set_weight(neigh_lst[i], neigh_lst[j], 
											  self.G.weight(neigh_lst[i], neigh_lst[j]))
				self.G.rm_node(w)

	def build(self):
		res = requests.get(URL).text.split(wrd_loc[0])[1:]
		for r in res:
			wrd, rr = r.split(wrd_loc[1], 1)
			defs,_ = rr.split(def_loc[0], 1)[1].split(def_loc[1], 1)
			def_lst = re.sub(r'\([^)]*\)', '', defs).split(';')
			self.add_pair(wrd, def_lst, defs)
		self.collapse()

if __name__=='__main__':
	G = gre_nexus()
	sink = open("network_.txt", "w")
	for w, d in G.G.nodes_iter(True):
		sink.write("%s: %s\n" % (w.encode('utf8'), d.encode('utf8')))
		sink.write("\t%s\n" % "\t".join(G.G.neighbors(w)).encode('utf8'))
	sink.close()

def load_network():
	return pickle.load(open("network_.die", "rb"))
