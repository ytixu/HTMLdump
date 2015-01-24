using UnityEngine;
using System.Collections;

public class MazeCell : MonoBehaviour {
	public static MazeWall aWall;
	public int x, z;

	/**
	 * Each cell has four wall.
	 */
	public MazeWall eastWall;
	public MazeWall southWall;
	public MazeWall westWall;
	public MazeWall northWall;

	private MazeWall instantiateWall(Vector3 scale, Vector3 position){
		MazeWall w = Instantiate (aWall) as MazeWall;
		w.transform.parent = transform;
		w.transform.localScale = scale;
		w.transform.localPosition = position;
		return w;
	}

	public void addEastWall(){
		eastWall = instantiateWall (new Vector3 (1f, Maze.FloorHeight, z), 
		                            new Vector3 (x*0.5f - 0.5f, Maze.FloorHeight*0.5f, 0f));
	}

	public void addSouthWall(){
		southWall = instantiateWall (new Vector3 (x, Maze.FloorHeight, 1f), 
		                            new Vector3 (0f, Maze.FloorHeight*0.5f, -z*0.5f+0.5f));
	}	

	public void addNorthWall(){
		northWall = instantiateWall (new Vector3 (x, Maze.FloorHeight, 1f), 
		                             new Vector3 (0f, Maze.FloorHeight*0.5f, z*0.5f-0.5f));
	}

	public void addWestWall(){
		westWall = instantiateWall (new Vector3 (1f, Maze.FloorHeight, z), 
		                            new Vector3 (-x*0.5f + 0.5f, Maze.FloorHeight*0.5f, 0f));
	}
}
