using UnityEngine;
using System.Collections;

/**
 * This script manage the generation of maze when starting, restarting and ending game.
 */

public class MazeManager : MonoBehaviour {
	public Maze aMaze;
	private Maze generatedMaze;
	public Player player;

	// Use this for initialization
	void Start () {
		CreateMaze ();
	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetKeyDown(KeyCode.Tab)) {
			Restart();
		}
	}

	public void Restart(){
		Destroy (generatedMaze.gameObject);
		CreateMaze ();
	}

	private void movePlayer(IntVector2 pos){
		player.transform.localPosition = new Vector3 (pos.x+10, 0.5f, pos.z-20);
	}

	public void CreateMaze (){
		generatedMaze = Instantiate (aMaze) as Maze;
		IntVector2 startPosition = generatedMaze.initializeMaze ();
		player.transform.parent = aMaze.transform;
		movePlayer (startPosition);
	}
}
