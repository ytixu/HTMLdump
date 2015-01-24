using UnityEngine;
using System.Collections;
using System.Collections.Generic;

/**
 * This is the script that creates a random maze
 */

public class Maze : MonoBehaviour {
	public int width, depth;
	public MazeCell aCell;
	private MazeCell[,] cells;

	private static int FloorHeight = -20;
	private enum Color{
		WHITE, BLUE, GREEN, RED, YELLOW, BLACK
	}

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
		public List<MazeCellVector> children;
		public bool connected;

		public MazeCellVector(int a, int b){
			x = a;
			z = b;
			color = Color.WHITE;
			children = new List<MazeCellVector>();
			connected = false;
		}

		public bool equals(MazeCellVector v){
			if (x == v.x && z == v.z)
								return true;
			return false;
		}

		public string toString(){
			return string.Format("{0}, {1} with {2} child/children.\n",
			                     x, z, children.Count);
		}
	}
	
	public Vector3 convertToVector3(int x, int z){
		return new Vector3 (x * aCell.x, FloorHeight, z * aCell.z);
	}

	private MazeCellVector[,] initializeMazeCell(){
		cells = new MazeCell[width, depth];
		MazeCellVector[,] grid = new MazeCellVector[width, depth];
		for (int i=0; i<depth; i++){
			for (int j=0; j<width; j++){
				MazeCell newCell = Instantiate(aCell) as MazeCell;
				cells[i,j] = newCell;
				grid[i,j] = new MazeCellVector(i,j);
				newCell.name = "cell"+i+"-";
				newCell.transform.localScale = new Vector3(newCell.x, 1, newCell.z);
				newCell.transform.parent = transform;
				newCell.transform.localPosition = convertToVector3(i,j);
			}
		}
		return grid;
	}


	/**
	 * Below are helper methods for generating a random maze
	 * getDirections: get all possible neighbours of a cell in a random order
	 * isInBound: check if a cell's coordinate is withing the valid range
	 * getCell: given grid, get the cell specified by a coordinate input in int[] format
	 * isFronter: check if a cell (assumed to be from the output of getDirections) is
	 * 			withiing the bound (calling isInBound) and is not connected
	 * randomBranch: generate a random path in the grid starting at some specified cell
	 * addFrontier: update the set of fronter cells
	 */

	private int[][] getDirections(int i, int j){
		int[][] output = new int[][]{new int[]{i,j - 1}, 
									new int[]{i - 1,j}, 
									new int[]{i + 1,j}, 
									new int[]{i,j + 1}};
		for (int k=0; k<3; k++){
			int index = Random.Range(0,3-k)+k;
			int[] temp = output[k];
			output[k] = output[index];
			output[index] = temp;
		}
		return output;
	}

	private bool isInBound(int[] nb){
		if (nb [0] >= width || nb [1] >= depth || nb [0] < 0 || nb [1] < 0) 
						return false;
		return true;
	}
	
	private MazeCellVector getCell(int[] coords, MazeCellVector[,] grid){
		// Assumes that the coords paremter has lenght 2
		return grid [coords [0], coords [1]];
	}

	private bool isFrontier(int[] nb, MazeCellVector[,] grid){
		if (!isInBound(nb) || grid [nb [0], nb [1]].connected)
						return false;
		return true;
	}

	private List<int[]> randomBranch(int x, int z, MazeCellVector[,] grid){
		double alpha = 0.95; // prbability of continueing the branch
		double epsilon = 0.9; // rate of decrease for alpha
		int tempX = x;
		int tempZ = z;
		List<int[]> output = new List<int[]> ();
		while (alpha > Random.value){ // 1-alpha chance of breacking this loop
			int[][] nbs = getDirections(grid[tempX,tempZ].x, grid[tempX,tempZ].z);
			foreach (int[] nb in nbs){
				if (isFrontier(nb, grid)){
					output.Add(nb);
					grid[tempX, tempZ].children.Add(getCell(nb, grid));
					getCell(nb, grid).connected = true;
					tempX = nb[0];
					tempZ = nb[1];
					break;
				}
			}
			alpha *= epsilon;
		}
		return output;
	}

	private void addFrontier(int x, int z, Queue<int[]> f, MazeCellVector[,] grid){
		foreach (int[] nb in getDirections(x, z)){
			if (isFrontier(nb, grid)){
				f.Enqueue(nb);
			}
		}
	}
	
	/**
	 * The algorithm to construct random perfect maze. 
	 * We start at random place. The goal cell is the furtest end of a path from the start. 
	 * Returns the starting cell (root of tree);
	 */
	private MazeCellVector AldowsBroderWilson(MazeCellVector[,] grid){
		Queue<int[]> frontier = new Queue<int[]>();
		// get starting position
		MazeCellVector startCell = grid [Random.Range (0, width), Random.Range (0, depth)];
		startCell.connected = true;
		addFrontier (startCell.x, startCell.z, frontier, grid);
		// iteratively add branches
		int[] temp;
		while (frontier.Count > 0) {
			temp = frontier.Dequeue();
			// check if it's connected
			if (getCell(temp, grid).connected) continue;
			getCell(temp, grid).connected = true;
			// get a random path in the maze
			List<int[]> branch = randomBranch(temp[0], temp[1], grid);
			// connect to a parent
			foreach (int[] nb in getDirections(temp[0], temp[1])){
				if (isInBound(nb) && getCell(nb, grid).connected){
					getCell(nb, grid).children.Add(getCell(temp, grid));
					break;
				}
			}
			// add frontier cells
			foreach (int[] b in branch){
				addFrontier(b[0], b[1], frontier, grid);
			}
		}
		return startCell;
	}

	/**
	 * Add walls
	 */
	private void traverseMaze(MazeCellVector v){
		print (v.toString ());
		foreach(MazeCellVector c in v.children){
			traverseMaze(c);
		}
	}

	public void initializeMaze(){
		MazeCellVector[,] grid = initializeMazeCell ();
		MazeCellVector startCell = AldowsBroderWilson (grid);
		traverseMaze (startCell);
	}
}