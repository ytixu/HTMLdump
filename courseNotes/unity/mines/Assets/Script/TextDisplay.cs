using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class TextDisplay : MonoBehaviour {
	public Text score;
	private bool isInvoked = false;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	private void clearText(){
		score.text = "";
		isInvoked = false;
	}

	public void updateScore(int s){
		if (s == 0) return;
		if (isInvoked) CancelInvoke("clearText");
		if (s>0){
			score.text = "+"+s;
		}else{
			score.text = s.ToString();
		}
		Invoke("clearText", 1f);
	}

}
