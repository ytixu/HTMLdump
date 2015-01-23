using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class Maze : MonoBehaviour {
	public int width, depth;
	public MazeCell aCell;
	private MazeCellVector[,] grid;

	private static int FloorHeight = -20;
	private enum Color{
		WHITE, BLUE, GREEN, RED, YELLOW, BLACK
	}

	private MazeCellVector startCell;
	
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	/**
	 * Tree for the maze.
	 */
	private class MazeCellVector{
		public int x;
		public int z;
		public Color color;
		public MazeCell drawing;
		public MazeCellVector parent;

		public MazeCellVector(int a, int b, MazeCell c){
			x = a;
			z = b;
			drawing = c;
			color = Color.WHITE;
			parent = null;
		}

		public bool equals(MazeCellVector v){
			if (x == v.x && z == v.z)
								return true;
			return false;
		}
	}

	public Vector3 convertToVector3(int x, int z){
		return new Vector3 (x * aCell.x, FloorHeight, z * aCell.z);
	}

	public void initializeMazeCell(){
		grid = new MazeCellVector[width, depth];
		for (int i=0; i<depth; i++){
			for (int j=0; j<width; j++){
				MazeCell newCell = Instantiate(aCell) as MazeCell;
				grid[i,j] = new MazeCellVector(i,j, newCell);
				newCell.name = "cell"+i+"-";
				newCell.transform.localScale = new Vector3(newCell.x, 1, newCell.z);
				newCell.transform.parent = transform;
				newCell.transform.localPosition = convertToVector3(i,j);
			}
		}
	}

	public int[,] getDirections(int i, int j){
		int[,] output = new int[,]{{i,j - 1}, {i - 1,j}, {i + 1,j}, {i,j + 1}};
		for (int k=0; k<3; k++){
			int index = Random.Range(3-k)+k;
			int[] temp = output[k];
			output[k] = output[index];
			output[index] = output[k];
		}
		return output;
	}

	/**
	 * The algorithm to construct random perfect maze. 
	 * We start at random place. The goal cell is the furtest end of a path from the start. 
	 */
	public void AldowsBroderWilson(){
		int total = width * depth;
		Queue<int[]> frontier = new Queue<int[]>();
		int sx = Random.Range (0, width);
		int sz = Random.Range (0, depth);
		startCell = grid [sx, sz];
		startCell.parent = startCell;
		frontier.Enqueue (startCell);
		MazeCellVector temp;
		while (total > 0) {
			temp = frontier.Dequeue();

		}
	}
}

