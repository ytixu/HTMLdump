using UnityEngine;
using System.Collections;

public class Maze : MonoBehaviour {
	public int width, depth;
	public MazeCell aCell;
	private MazeCell[,] grid;
	private static int FloorHeight = -20;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	private struct MazeVector2{
		public int x;
		public int z;
		public MazeVector2(int a, int b){
			x = a;
			z = b;
		}
	}

	private MazeVector2 randomCoordinate(){
		return new MazeVector2 (Random.Range (0, width), Random.Range (0, depth));
	}

	public Vector3 convertToVector3(int x, int z){
		return new Vector3 (x * aCell.x, FloorHeight, z * aCell.z);
	}

	private Vector3 convertToVector3(MazeVector2 v){
		return convertToVector3 (v.x, v.z);
	}

	public void initializeMazeCell(){
		grid = new MazeCell[width, depth];
		for (int i=0; i<depth; i++){
			for (int j=0; j<width; j++){
				MazeCell newCell = Instantiate(aCell) as MazeCell;
				grid[i,j] = newCell;
				newCell.name = "cell"+i+"-"+j;
				newCell.transform.parent = transform;
				newCell.transform.localPosition = convertToVector3(i,j);
			}
		}
	}
}

