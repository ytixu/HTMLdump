using UnityEngine;
using System.Collections;

public class Maze : MonoBehaviour {
	public int width, depth;
	public MazeCell aCell;
	private MazeCell[,] grid;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public void initializeMazeCell(){
		grid = new MazeCell[width, depth];
		for (int i=0; i<depth; i++){
			for (int j=0; j<width; j++){
				MazeCell newCell = Instantiate(aCell) as MazeCell;
				grid[i,j] = newCell;
				newCell.name = "cell"+i+"-"+j;
				newCell.transform.parent = transform;
				newCell.transform.localPosition = new Vector3(i*newCell.width, -20f, j*newCell.depth);
			}
		}
	}
}

