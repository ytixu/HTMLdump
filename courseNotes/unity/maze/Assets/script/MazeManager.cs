using UnityEngine;
using System.Collections;
using System.Collections.Generic;

/**
 * This script manage the generation of maze when starting, restarting and ending game.
 */

public class MazeManager : MonoBehaviour {
	public Maze aMaze;
	private Maze generatedMaze;
	public Player player;
	// in the order of the enum in Maze
	public Bullet[] bulletItems;

	private int thr = 5;

	// enviromnent 
	public buildings b;

	// Use this for initialization
	void Start () {
		CreateMaze ();
	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetKeyDown(KeyCode.Tab)) {
			Restart();
		}else if (Input.GetKey(KeyCode.Comma)){
			player.drop(aMaze);
		}else if (Input.GetKey(KeyCode.Period)){
			checkPickUp();
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


	public void Restart(){
		Destroy (generatedMaze.gameObject);
		CreateMaze ();
	}

	// for 3 rooms
	private void distributeBullets(){
		int currInd = aMaze.LastRoom;
		int prevInd = 3;
		IntVector2 temp;
		for (int i=0; i<aMaze.RoomNumb; i++){
			temp = aMaze.rooms[currInd].secondCenter;
			bulletItems[prevInd].transform.parent = aMaze.cells[temp.x, temp.z].transform;
			bulletItems [prevInd].transform.localPosition = new Vector3(0,0.1f,0);
			prevInd = currInd;
			currInd = (currInd+1)%aMaze.RoomNumb;
		}
		temp = aMaze.startCell;
		bulletItems [prevInd].transform.parent = aMaze.cells [temp.x, temp.z].transform;
		bulletItems [prevInd].transform.localPosition = new Vector3(0,0.1f,0);
	}

	private void movePlayer(IntVector2 pos){
		player.transform.localPosition = new Vector3 (pos.x + 3, 1f, pos.z+3);
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
