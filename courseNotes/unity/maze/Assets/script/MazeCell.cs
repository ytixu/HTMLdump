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

	private void instantiateWall(bool door, Material m, MazeWall side){
		MazeWall w;
		if (door){
			w = Instantiate (doorWall) as MazeWall;
			w.transform.FindChild("door").renderer.material = m;
		}else{
			w = Instantiate (plainWall) as MazeWall;
		}
		w.transform.parent = side.transform;
		w.transform.localScale = new Vector3 (1, 1, 1);
		w.transform.localPosition = Vector3.zero;
		w.transform.localRotation = Quaternion.identity;
	}

	private void addEastWall(bool door, Material m){
		instantiateWall (door, m, eastWall);
	}

	private void addSouthWall(bool door, Material m){
		instantiateWall (door, m, southWall);
	}	

	private void addNorthWall(bool door, Material m){
		instantiateWall (door, m, northWall);
	}

	private void addWestWall(bool door, Material m){
		instantiateWall (door, m, westWall);
	}

	public void addWall(IntVector2 d, bool door, Material m){
		if (d.x < 0) addEastWall (door, m);
		else if (d.x > 0) addWestWall (door, m);
		else if (d.z < 0) addNorthWall(door, m);
		else addSouthWall(door, m);
	}

	public void colorCell(Material m){
		transform.GetChild(0).GetComponent<Renderer>().material = m;
	}

	public void removeCeil(){
		ceil.transform.localScale = new Vector3 (0, 0, 0);
	}
}
