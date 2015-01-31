using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;

public class Status : MonoBehaviour {
	private Text textField;
	private Queue<string> textQueue;
	private int ind = 0;
	private bool writing = false;

	void Start(){
		textField = GetComponent<Text>();
		textQueue = new Queue<string> ();
	}

	void Update(){
		if (textQueue.Count > 0 && !writing){
			writing = true;
			updateText();
		}
	}

	private void updateText(){
		if (textQueue.Count == 0){
			ind = 0;
			writing = false;
			return;
		}
		if(ind > textQueue.Peek ().Length){
			textQueue.Dequeue();
			ind = 0;
			Invoke("updateText", 1f);
			return;
		}
		textField.text = textQueue.Peek ().Substring(0,ind);
		ind += 1;
		Invoke("updateText", 0.05f);
	}

	public void emptyQueue(){
		textQueue.Clear ();
		writing = false;
		ind = 0;
	}

	public void update(string s){
		if (textQueue.Contains (s))
						return;
		textQueue.Enqueue(s);
	}

}
