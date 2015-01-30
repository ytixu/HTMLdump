using UnityEngine;
using System.Collections;

public class MazeCell : MonoBehaviour {
	public int x, y, z;
	public MazeWall doorWall;
	public MazeWall plainWall;

	/**
	 * Each cell has four wall.
	 */
	public MazeWall eastWall;
	public MazeWall southWall;
	public MazeWall westWall;
	public MazeWall northWall;

	public MazeWall ceil;

	private void instantiateWall(bool door, Maze.Color c, Material m, MazeWall side){
		if (side.transform.childCount > 0)
						return;
		MazeWall w;
		if (door){
			w = Instantiate (doorWall) as MazeWall;
			w.door.renderer.material = m;
			w.door.tag = c.ToString();
			side.setColor (c);
		}else{
			w = Instantiate (plainWall) as MazeWall;
			w.renderer.material = m;
		}
		w.transform.parent = side.transform;
		w.transform.localScale = new Vector3 (1, 1, 1);
		w.transform.localPosition = Vector3.zero;
		w.transform.localRotation = Quaternion.identity;
		side.collider.isTrigger = false;
	}

	private void addEastWall(bool door, Maze.Color c, Material m){
		instantiateWall (door, c, m, eastWall);
	}

	private void addSouthWall(bool door, Maze.Color c, Material m){
		instantiateWall (door, c, m, southWall);
	}	

	private void addNorthWall(bool door, Maze.Color c, Material m){
		instantiateWall (door, c, m, northWall);
	}

	private void addWestWall(bool door, Maze.Color c, Material m){
		instantiateWall (door, c, m, westWall);
	}

	public void addWall(IntVector2 d, bool door, Maze.Color c, Material m){
		if (d.x < 0) addEastWall (door, c, m);
		else if (d.x > 0) addWestWall (door, c, m);
		else if (d.z < 0) addNorthWall(door, c, m);
		else addSouthWall(door, c, m);
	}

	public void addBoarders(int i, int j, Maze.Color c, Material m){
		if (i==0) addEastWall (false, c, m);
		if (j==0) addNorthWall (false, c, m);
		if (j==Maze.depth-1) addSouthWall (false, c, m);
		if (i==Maze.width-1) addWestWall (false, c, m);
	}

	public void addWall(int i, int j, IntVector2 d, bool door, Maze.Color c, Material m){
		addWall (d, door, c, m);
		addBoarders (i, j, c, m);
	}

	public void addWall(IntVector2 coord, IntVector2 d, bool door, Maze.Color c, Material m){
		addWall (coord.x, coord.z, d, door, c, m);
	}

	public void colorCell(Material m){
		transform.GetChild(0).GetComponent<Renderer>().material = m;
	}

	public void removeCeil(){
		ceil.transform.localScale = new Vector3 (0, 0, 0);
	}
}
