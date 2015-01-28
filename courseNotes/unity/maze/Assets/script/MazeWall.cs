using UnityEngine;
using System.Collections;

public class MazeWall : MonoBehaviour {
	public GameObject door;
	private Maze.Color color = Maze.Color.WHITE;

	public void setColor(Maze.Color c){
		color = c;
	}
}
