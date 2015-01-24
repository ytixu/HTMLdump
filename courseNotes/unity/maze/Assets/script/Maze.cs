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

	public static int FloorHeight = -20;
	public enum Color{
		WHITE, BLUE, GREEN, RED, YELLOW, BLACK
	}

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	// 2D vector of integers
	private struct IntVector2{
		public int x;
		public int z;

		public IntVector2(int a, int b){
			x = a;
			z = b;
		}

		// Manhattan distance
		public int mDistance(IntVector2 v){
			return (int)(Mathf.Abs (x - v.x) + Mathf.Abs (z - v.z));
		}

		public IntVector2 add(IntVector2 v){
			return new IntVector2 (v.x + x, v.z + z);
		}
	}

	// Tree for the maze
	private class MazeCellVector{
		public IntVector2 coord;
		public Color color;
		public List<MazeCellVector> children;
		public bool traversed;

		public MazeCellVector(int a, int b){
			coord.x = a;
			coord.z = b;
			_init_();
		}

		public MazeCellVector(IntVector2 c){
			coord.z = c.z;
			coord.x = c.x;
			_init_();
		}

		private void _init_(){
			color = Color.WHITE;
			children = new List<MazeCellVector>();
			traversed = false;
		}

		public void addFamily(MazeCellVector v){
			v.children.Add (this);
			children.Add (v);
		}

		public string toString(){
			return string.Format("{0}, {1} with {2} child/children.\n",
			                     coord.x, coord.z, children.Count);
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
	 * IntVector2[] directions is a list of all the relative directions where player can moving at a cell;
	 * getCell: given grid, get the cell specified by a coordinate input in IntVector2 format
	 * isInBound: check if a cell's coordinate is withing the valid range
	 * getDirections: get all possible neighbours of a cell in a random order
	 * randomBranch: generate a random path in the grid starting at some specified cell
	 * addFrontier: update the set of fronter cells
	 */

	private IntVector2[] directions = new IntVector2[]{
		new IntVector2(-1,0), new IntVector2(1,0), new IntVector2(0,1), new IntVector2(0,-1)};

	private MazeCellVector getCell(IntVector2 coords, MazeCellVector[,] grid){
		// Assumes that the coords paremter has lenght 2
		return grid [coords.x, coords.z];
	}

	private bool isInBound(IntVector2 nb){
		if (nb.x >= width || nb.z >= depth || nb.x < 0 || nb.z < 0) 
			return false;
		return true;
	}

	private List<IntVector2> getDirections(IntVector2 v, MazeCellVector[,] grid){
		List<IntVector2> output = new List<IntVector2>();
		foreach (IntVector2 d in directions){
			IntVector2 t = v.add(d);
			if (isInBound(t)){
				output.Add(getCell(t, grid).coord);
			}
		}
		// shuffle 
		int l = output.Count;
		for (int k=0; k<l-1; k++){
			int index = Random.Range(0,l-k)+k;
			IntVector2 temp = output[k];
			output[k] = output[index];
			output[index] = temp;
		}
		return output;
	}

	private List<IntVector2> randomBranch(IntVector2 v, MazeCellVector[,] grid){
		double alpha = 0.95; // prbability of continueing the branch
		double epsilon = 0.9; // rate of decrease for alpha
		// with this combination, length of a branch is around 0-7 
		IntVector2 temp = v;
		List<IntVector2> output = new List<IntVector2> ();
		//int length = 0;
		while (alpha > Random.value){ // 1-alpha chance of breacking this loop
			//length += 1;
			List<IntVector2> nbs = getDirections(getCell(temp, grid).coord, grid);
			foreach (IntVector2 nb in nbs){
				if (!getCell(nb, grid).traversed){
					output.Add(nb);
					getCell(temp, grid).addFamily(getCell(nb, grid));
					getCell(nb, grid).traversed = true;
					temp = nb;
					break;
				}
			}
			alpha *= epsilon;
		}
		//print (length);
		return output;
	}

	private void addFrontier(IntVector2 v, Queue<IntVector2> f, MazeCellVector[,] grid){
		foreach (IntVector2 nb in getDirections(v, grid)){
			if (!getCell(nb, grid).traversed){
				f.Enqueue(nb);
			}
		}
	}

	/**
	 * The algorithm to construct random perfect maze. 
	 * We start at random place. The goal cell is the furtest end of a path from the start. 
	 * Returns the starting cell (root of tree) and ending cell.
	 * Create a list of potential dead end cells to make rooms.
	 */
	private IntVector2[] AldowsBroderWilson(MazeCellVector[,] grid){
		Queue<IntVector2> frontier = new Queue<IntVector2>();
		List<IntVector2> deadEnds = new List<IntVector2>();
		// get starting position
		IntVector2 startCell = grid [Random.Range (0, width), Random.Range (0, depth)].coord;
		getCell (startCell, grid).traversed = true;
		addFrontier (startCell, frontier, grid);
		// set up ending position 
		IntVector2 endCell = startCell;
		int maxDist = startCell.mDistance (endCell);
		int newDist;
		// iteratively add branches
		IntVector2 temp;
		while (frontier.Count > 0) {
			temp = frontier.Dequeue();
			// check if it's connected
			if (getCell(temp, grid).traversed) continue;
			getCell(temp, grid).traversed = true;
			// connect to a parent
			foreach (IntVector2 nb in getDirections(temp, grid)){
				if (getCell(nb, grid).traversed){
					getCell(nb, grid).addFamily(getCell(temp, grid));
					break;
				}
			}
			// get a random path in the maze
			List<IntVector2> branch = randomBranch(temp, grid);
			if (branch.Count == 0) continue;
			// add frontier cells
			foreach (IntVector2 b in branch){
				addFrontier(b, frontier, grid);
			}
			// update ending cell
			int lastInd = branch.Count-1;
			newDist = startCell.mDistance(branch[lastInd]);
			if (newDist > maxDist){
				endCell = branch[lastInd];
				maxDist = newDist;
			}
			// update deadEnds
			deadEnds.Add(branch[lastInd]);
		}
		return new IntVector2[] {startCell, endCell};
	}

	/**
	 * This algorithm finds 3 primary rooms in the maze by removing dead ends.
	 * And it randomly picks a cell in each room to be the secondary room.
	 * Start cell is always 
	 */
	private void roomPartitioner(List<IntVector2> deadends, IntVector2[] startEndCells, 
	                             MazeCellVector[,] grid){

	}

	/**
	 * frunctions for traversing the graph
	 */

	private void resetGridTraverse(MazeCellVector[,] grid){
		for (int i=0; i<width; i++){
			for (int j=0; j<depth; j++){
				grid[i,j].traversed = false;
			}
		}
	}

	// add walls
	private void traverseWallAdded(){

	}

	// for debugging purposes
	private void traverseMaze(MazeCellVector v){
		print (v.toString ());
		foreach(MazeCellVector c in v.children){
			if (!c.traversed){
				c.traversed = true;
				traverseMaze(c);
			}
		}
	}

	// the function to call by MazeManager
	public void initializeMaze(){
		MazeCellVector[,] grid = initializeMazeCell ();
		IntVector2[] twoCells = AldowsBroderWilson (grid);
		//traverseMaze (twoCells[0]);
	}
}