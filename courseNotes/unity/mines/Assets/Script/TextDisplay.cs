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

	private void scheduleClear(float time){
		Invoke("clearText", time);
	}

	public void updateScore(int s){
		if (s == 0) return;
		if (isInvoked) CancelInvoke("clearText");
		if (s>0){
			score.text = "+"+s;
		}else{
			score.text = s.ToString();
		}
		scheduleClear(1);
	}

	public void displayBadMove(){
		score.text = "Maybe that was a stupid move.";
		scheduleClear(Player.tGround);
	}

	public void displayNoCubi(){
		score.text = "And you have been so greedy that there's no cubi for you to go back.";
		scheduleClear(5);
	}

	public void displayDeath(){
		score.text = "No more life for you to go back.";
		scheduleClear(5);
	}
}
