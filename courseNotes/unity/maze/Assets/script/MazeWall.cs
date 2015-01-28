using UnityEngine;
using System.Collections;

public class MazeWall : MonoBehaviour {
	private Maze.Color color;

	public void setColor(Maze.Color c){
		color = c;
	}
}
