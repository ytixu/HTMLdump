using UnityEngine;
using System.Collections;
using System.Collections.Generic;

/**
 * This script manage the generation of maze when starting, restarting and ending game.
 */

public class MazeManager : MonoBehaviour {
	public Maze aMaze;
	public Player player;
	// in the order of the enum in Maze
	// green, pink, yellow, turq
	public List<Bullet> bulletItems;
	public Status stat;
	
	private int thr = 10;
	private int score = 0; // this keeps track if a bullet is used for nothing


	// enviromnent 
	public buildings b;

	// Use this for initialization
	void Start () {
		CreateMaze ();
	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetKey(KeyCode.Comma)){
			Bullet b = player.drop();
			if (b!= null){
				Vector3 pos = player.transform.position;
				resizeBullet(b, new Vector3(pos.x, pos.y, pos.z));
				Vector3 temp = player.transform.position;
				b.transform.position = new Vector3(temp.x, temp.y, temp.z);
			}
		}else if (Input.GetKey(KeyCode.Period)){
			checkPickUp();
		}else if (Input.GetKeyDown (KeyCode.Space)){
		//}else if (Input.GetMouseButton(0)){
			Bullet b = player.fire();
			if (b != null){
				bulletItems.Remove(b);
			}
		}
	}

	private void checkPickUp(){
		Vector3 p = player.transform.position;
		foreach (Bullet b in bulletItems){
			Vector3 bp = b.transform.position;
			print (Vector3.Distance(p,bp).ToString());
			if (Vector3.Distance(p,bp) < thr){
				player.pickUp(b);
				break;
			}
		}
	}

	private void resizeBullet(Bullet b, Vector3 pos){
		b.transform.parent = aMaze.transform;
		b.transform.localPosition = pos;
		b.transform.localScale = new Vector3(5f, 5f, 5f);
	}

	public void updateScore(int n){
		score += n;
	}

	public void checkScore(){
		if (score < 0){
			stat.update ("Looks like you wasted it.");
			stat.update ("This ball was important. It's the key to determine whether you live or die.");
			stat.update ("Now you are stucked here forever........");
		}
	}

	// for 3 rooms
	private void distributeBullets(){
		int currInd = aMaze.LastRoom;
		int prevInd = 3;
		IntVector2 temp;
		Vector3 pos;
		for (int i=0; i<aMaze.RoomNumb; i++){
			temp = aMaze.rooms[currInd].secondCenter;
			pos = aMaze.cells[temp.x, temp.z].transform.position;
			resizeBullet(bulletItems[prevInd], new Vector3(pos.x, pos.y+0.1f, pos.z));
			prevInd = currInd;
			currInd = (currInd+1)%aMaze.RoomNumb;
		}
		temp = aMaze.startCell;
		pos = aMaze.cells[temp.x, temp.z].transform.position;
		resizeBullet(bulletItems[prevInd], new Vector3(pos.x, pos.y+0.1f, pos.z));
	}

	private void movePlayer(IntVector2 pos){
		player.transform.localPosition = new Vector3 (pos.x + 3, 1f, pos.z+3);
		player.transform.localRotation = Quaternion.Euler(new Vector3(0,-135,0));
		b.transform.localPosition = new Vector3 (pos.x-20, 70f, pos.z+10);
	}

	public void CreateMaze (){
		//aMaze = Instantiate (aMaze) as Maze;
		IntVector2 startPosition = aMaze.initializeMaze ();
		player.transform.parent = aMaze.transform;
		movePlayer (startPosition);
		distributeBullets ();
	}
}
