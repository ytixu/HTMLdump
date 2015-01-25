using UnityEngine;
using System.Collections;

public class MazeCell : MonoBehaviour {
	public MazeWall aWall;
	public int x, z;
	public Material[] roomColors;

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

	private void addEastWall(){
		eastWall = instantiateWall (new Vector3 (1f, Maze.FloorHeight, z), 
		                            new Vector3 (x*0.5f - 0.5f, Maze.FloorHeight*0.5f, 0f));
	}

	private void addSouthWall(){
		southWall = instantiateWall (new Vector3 (x, Maze.FloorHeight, 1f), 
		                            new Vector3 (0f, Maze.FloorHeight*0.5f, -z*0.5f+0.5f));
	}	

	private void addNorthWall(){
		northWall = instantiateWall (new Vector3 (x, Maze.FloorHeight, 1f), 
		                             new Vector3 (0f, Maze.FloorHeight*0.5f, z*0.5f-0.5f));
	}

	private void addWestWall(){
		westWall = instantiateWall (new Vector3 (1f, Maze.FloorHeight, z), 
		                            new Vector3 (-x*0.5f + 0.5f, Maze.FloorHeight*0.5f, 0f));
	}

	public void addWall(IntVector2 d){
		if (d.x < 0) addWestWall ();
		else if (d.x > 0) addEastWall ();
		else if (d.z < 0) addNorthWall();
		else addSouthWall();
	}

	public void colorCell(Maze.Color c){
		print (c.ToString());
		if (c.Equals(Maze.Color.BLACK)){
			transform.GetChild(0).GetComponent<Renderer>().material = roomColors[0];
		}else if (c.Equals(Maze.Color.GREEN)){
			transform.GetChild(0).GetComponent<Renderer>().material = roomColors[1];
		}else if (c.Equals(Maze.Color.PINK)){
			transform.GetChild(0).GetComponent<Renderer>().material = roomColors[2];
		}else if (c.Equals(Maze.Color.TURQUOIS)){
			transform.GetChild(0).GetComponent<Renderer>().material = roomColors[3];
		}else if (c.Equals(Maze.Color.YELLOW)){
			transform.GetChild(0).GetComponent<Renderer>().material = roomColors[4];
		}
	}
}
