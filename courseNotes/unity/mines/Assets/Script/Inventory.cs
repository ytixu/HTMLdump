using UnityEngine;
using System.Collections;

public class Inventory : MonoBehaviour {

	private bool open = false;
	private int score = 0;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public void triggerAnimation(){
		if (open){
			open = false;
			animation.Play ("notInventory");
		}else{
			open = true;
			animation.Play ("inventory");
		}
	}

	public void updateScore(int s){
		score += s;
	}
}
