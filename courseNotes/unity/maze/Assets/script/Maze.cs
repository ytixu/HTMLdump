using UnityEngine;
using System.Collections;
using System.Collections.Generic;

/**
 * This is the script that creates a random maze
 */

public class Maze : MonoBehaviour {
	public static int width = 30;
	public static int depth = 30;
	public MazeCell aCell;
	public int RoomNumb;

	private MazeCell[,] cells;

	public static int FloorHeight = -20;
	public enum Color{
		WHITE, TURQUOIS, GREEN, PINK, YELLOW, BLACK
	}

	private List<MazeRoom> rooms;
	private IntVector2 startCell, endCell;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	// Tree for the maze
	private class MazeCellVector{
		public IntVector2 coord;
		public Color color;
		public List<MazeCellVector> children;
		public bool traversed;

		public MazeCellVector(int a, int b){
			coord = new IntVector2(a,b);
			_init_();
		}

		public MazeCellVector(IntVector2 c){
			coord = new IntVector2(c);
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
		for (int i=0; i<width; i++){
			for (int j=0; j<depth; j++){
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
	 * randomCell: get a random cell coordinate that is not colored
	 * colorRoom: color a 3x3 room in grid
	 */

	private IntVector2[] directions = new IntVector2[]{
		new IntVector2(-1,0), new IntVector2(1,0), new IntVector2(0,1), new IntVector2(0,-1)};

	private MazeCellVector getCell(IntVector2 coords, MazeCellVector[,] grid){
		// Assumes that the coords paremter has lenght 2
		return grid [coords.x, coords.z];
	}

	public static bool isInBound(IntVector2 nb){
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
		IntVector2.shuffle (output);
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

	private void addFrontier(IntVector2 v, List<IntVector2> f, MazeCellVector[,] grid){
		foreach (IntVector2 nb in getDirections(v, grid)){
			if (!getCell(nb, grid).traversed){
				f.Add(nb);
			}
		}
	}

	private IntVector2 randomCell(MazeCellVector[,] grid){
		IntVector2 cell = new IntVector2 (Random.Range (0, width), Random.Range (0, depth));
		if (getCell(cell, grid).color != Color.WHITE)
			return randomCell(grid);
		return cell;
	}
	
	private void colorRoom(IntVector2 roomC, Color c, MazeCellVector[,] grid){
		for (int i=roomC.x-MazeRoom.sizeX/2; i < roomC.x+MazeRoom.sizeX/2; i++){
			for (int j=roomC.z-MazeRoom.sizeX/2; i < roomC.x+MazeRoom.sizeX/2; i++){
				grid[i,j].color = c;
				grid[i,j].traversed = true;
			}
		}
	}

	/**
	 * This algorithm randomly selects 3 sets of connected room pairs in the grid.
	 * Primary rooms have color GREEN, PINK and YELLOW.
	 * Secondary rooms have color BLACK.
	 */
	private void roomPartitioner(MazeCellVector[,] grid){
		Color[] roomsCol = new Color[] {Color.GREEN, Color.PINK, Color.YELLOW};
		rooms = new List<MazeRoom>();
		while (rooms.Count < RoomNumb){
			IntVector2 randC = randomCell(grid);
			bool isIntersecting = false;
			foreach (MazeRoom r in rooms){
				if (r.intersects(randC)){
					isIntersecting = true;
					break;
				}
			}
			if (isIntersecting) continue;
			IntVector2 sRoom = null;
			IntVector2 temp;
			foreach(IntVector2 v in MazeRoom.getSecondPos()){
				isIntersecting = false;
				temp = v.add(randC);
				foreach (MazeRoom r in rooms){
					if (r.intersects(temp)){
						isIntersecting = true;
						break;
					}
				}
				if (!isIntersecting){
					sRoom = temp;
					break;
				}
			}
			if (sRoom != null){
				rooms.Add (new MazeRoom(randC, sRoom));
				// color 
				colorRoom (randC, roomsCol[rooms.Count-1], grid);
				colorRoom (sRoom, Color.BLACK, grid);
			}
		}
	}

	// get the goal cell using the first secondary room in the list of rooms
	private void getEndCell(List<IntVector2> f, MazeCellVector[,] grid){
		MazeRoom temp = new MazeRoom (rooms [0].secondCenter, rooms [0].center);
		IntVector2 door = temp.randomRoomDoor ();
		List<IntVector2> branch = randomBranch (door, grid);
		endCell = branch [branch.Count - 1];
		getCell (endCell, grid).color = Color.TURQUOIS;
		foreach (IntVector2 b in branch){
			addFrontier(b, f, grid);
		}
	}

	// The algorithm that generate random maze without the rooms. 
	private void AldowsBroderWilson(MazeCellVector[,] grid){
		roomPartitioner (grid);
		List<IntVector2> frontier = new List<IntVector2>();
		// set up ending position
		getEndCell (frontier, grid);
		// find the furthest "leaf" as the starting position
		startCell = endCell;
		int maxDist = 0;
		// iteratively add branches
		IntVector2 temp;
		while (frontier.Count > 0) {
			temp = frontier[Random.Range(0, frontier.Count)];
			frontier.Remove(temp);
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
			// update starting position
			IntVector2 leaf = branch[branch.Count-1];
			int newDist = startCell.mDistance(leaf);
			if (newDist > maxDist){
				maxDist = newDist;
				startCell = leaf;
			}
		}
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
		AldowsBroderWilson (grid);
		//traverseMaze (twoCells[0]);
	}
}