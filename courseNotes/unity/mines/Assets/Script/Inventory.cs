using UnityEngine;
using System.Collections;

public class Inventory : MonoBehaviour {
	public InventDisplayer[] invDis;
	public InventDisplayer scoreDis;
	public InventDisplayer livesDis;

	private bool open = false;
	private int score = 0;
	private int lives = 10;
	public int Lives{
		get{ return lives;}
		set{ lives = value;}
	}

	private int[] invItems = new int[GameManager.ItemNumb];

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	private void updateInv(){
		for (int i=0; i< GameManager.ItemNumb; i++){
			invDis[i].GetComponent<TextMesh>().text = invItems[i].ToString();
		}
		scoreDis.GetComponent<TextMesh> ().text = score.ToString ();
		livesDis.GetComponent<TextMesh> ().text = lives.ToString ();
	}

	public void triggerAnimation(){
		if (open){
			open = false;
			animation.Play ("notInventory");
		}else{
			open = true;
			animation.Play ("inventory");
			updateInv();
		}
	}

	public void updateScore(int s, int _id, TextDisplay disp){
		disp.updateScore (s);
		score += s;
		if (s >= 0) invItems [_id] += 1;
		if (open) updateInv();
	}
}
