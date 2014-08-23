import requests

import zen

URL = 'http://quizlet.com/47571/barrons-gre-wordlist-4759-words-flash-cards/'
wrd_loc = ['<span class='qWord lang-en'>', '</span>']
def_loc = ['<span class='qDef lang-en'>', '</span>']

class gre_nexus:
	def __init__(self):
		self.G = zen.Graph()
		self.build()
		return self.G

	def add_pair(self, w, def_lst):
		if self.G.__contains__(w):
			self.G.set_node_data(w, def_lst)
		else:
			self.G.add_node(w, data=def_lst)
		for d in def_lst:
			if not self.G.__contains__(def):
				self.G.add_node(d)
			self.G.add_edge(w, d)

	def is_def(self, d):
		return self.G.node_data(d) == None

	def collapse(self):
		for w in self.G.nodes_iter():
			if self.is_def(w):
				neigh_lst = self.G.neighbors(w)
				l = len(neigh_lst)
				for i in xrange(l):
					for j xrange(i+1, l)::
						try:
							self.G.add_edge(neigh_lst[i], neigh_lst[j])
						except(ZenException):
							self.G.set_weight(neigh_lst[i], neigh_lst[j], 
											  self.G.weight(neigh_lst[i], neigh_lst[j]))
				self.G.rm_node(w)

	def build(self):
		res = requests.get(URL).text.split(wrd_loc[0])[1:]
		for r in res:
			wrd, rr = r.split(wrd_loc[1], 1)
			defs,_ = rr.text.split(def_loc[0], 1)[1].split(def_loc[1], 1)
			def_lst = defs.split(';')
			self.add_pair(wrd, def_lst)
		self.collapse()


gre_nexus()