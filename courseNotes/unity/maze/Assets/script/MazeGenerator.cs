using UnityEngine;
using System.Collections;

public class MazeGenerator : MonoBehaviour {
	public Maze aMaze;
	private Maze generatedMaze;

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

	public void CreateMaze (){
		generatedMaze = Instantiate (aMaze) as Maze;
		generatedMaze.initializeMaze ();
	}
}
