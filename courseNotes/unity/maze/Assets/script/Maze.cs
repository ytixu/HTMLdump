using UnityEngine;
using System.Collections;
using System.Collections.Generic;

/**
 * This is the script that creates a random maze
 */

public class Maze : MonoBehaviour {
	// size of maze
	public static int width = 30;
	public static int depth = 30;
	public int RoomNumb;
	
	public MazeCell aCell;
	public Material[] roomColors;
	public MazeCell[,] cells;
	public Goal goal;

	public static int FloorHeight = -20;

	// color for the rooms and cooridoors
	public enum Color{
		GREEN, PINK, YELLOW, BLACK, TURQUOIS, WHITE
	}

	public Material getColorMat(Color c){
		return roomColors[(int) c];
	}

	public List<MazeRoom> rooms;
	public int LastRoom;
	public IntVector2 startCell, endCell;

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
		public List<IntVector2> children;
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
			children = new List<IntVector2>();
			traversed = false;
		}

		public void addFamily(MazeCellVector v){
			v.children.Add (coord);
			children.Add (v.coord);
		}

		public string toString(){
			return string.Format("{0}, {1} with {2} child/children.\n",
			                     coord.x, coord.z, children.Count);
		}
	}

	// convert relative cell coordinate in maze to coordinates in the game environment
	public Vector3 convertToVector3(int x, int z){
		return new Vector3 (x * aCell.x, FloorHeight, z * aCell.z);
	}


	// set up the cells
	private MazeCellVector[,] initializeMazeCell(){
		cells = new MazeCell[width, depth];
		MazeCellVector[,] grid = new MazeCellVector[width, depth];
		for (int i=0; i<width; i++){
			for (int j=0; j<depth; j++){
				MazeCell newCell = Instantiate(aCell) as MazeCell;
				cells[i,j] = newCell;
				grid[i,j] = new MazeCellVector(i,j);
				newCell.name = "cell"+i+"-"+j;
				newCell.transform.localScale = new Vector3(newCell.x, newCell.y, newCell.z);
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
	 * randomRoom: get a random cell coordinate that is not colored and that can be the center of a room
	 * colorBranch: color a branch (hallway) in TURQUOISE
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
		double alpha = 1.0; // prbability of continueing the branch
		double epsilon = 0.95; // rate of decrease for alpha
		// with this combination, length of a branch is around 0-7 
		IntVector2 temp = v;
		List<IntVector2> output = new List<IntVector2> ();
		//int length = 0;
		while (alpha > Random.value){ // 1-alpha chance of breacking this loop
			List<IntVector2> nbs = getDirections(getCell(temp, grid).coord, grid);
			foreach (IntVector2 nb in nbs){
				if (!getCell(nb, grid).traversed || // the following condition makes the maze braided
				    	(getCell (nb, grid).color.Equals(Color.WHITE) && Random.value < 0.05)){
					output.Add(nb);
					getCell(temp, grid).addFamily(getCell(nb, grid));
					getCell(nb, grid).traversed = true;
					temp = nb;
					//length += 1;
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
	
	private void colorRoom(IntVector2 roomC, Color c, MazeCellVector[,] grid){
		for (int i=roomC.x-MazeRoom.sizeX/2; i < roomC.x+MazeRoom.sizeX/2+1; i++){
			for (int j=roomC.z-MazeRoom.sizeZ/2; j < roomC.z+MazeRoom.sizeZ/2+1; j++){
				print (i+" " + j + " " + roomC.toString());
				grid[i,j].color = c;
				grid[i,j].traversed = true;
			}
		}
	}

	private void colorBranch(List<IntVector2> branch, MazeCellVector[,] grid){
		foreach (IntVector2 b in branch){
			getCell (b, grid).color = Color.TURQUOIS;
		}
	}

	private IntVector2 randomRoom(MazeCellVector[,] grid){
		IntVector2 cell = new IntVector2 (Random.Range (MazeRoom.sizeX/2+2, width-MazeRoom.sizeX/2-1), // avoid generating at the boarder of the maze
		                                  Random.Range (MazeRoom.sizeZ/2+2, depth-MazeRoom.sizeZ/2-1));
		if (getCell(cell, grid).color != Color.WHITE)
			return randomRoom(grid);
		print (cell.toString() + "+++++");
		return cell;
	}

	/**
	 * This algorithm randomly selects 3 sets of connected room pairs in the grid.
	 * Primary rooms have color GREEN, PINK and YELLOW.
	 * Secondary rooms have color BLACK.
	 */
	private void roomPartitioner(MazeCellVector[,] grid){
		rooms = new List<MazeRoom>();
		while (rooms.Count < RoomNumb){
			IntVector2 randC = randomRoom(grid);
			bool isIntersecting = false;
			// check if it's intesecting with rooms that we have previously added 
			foreach (MazeRoom r in rooms){
				if (r.intersects(randC)){
					isIntersecting = true;
					break;
				}
			}
			if (isIntersecting) continue;
			// get a door for the secondary room
			MazeRoom room = new MazeRoom(randC);
			IntVector2 doorID = room.randomDoor(); // relative position to the center
			IntVector2 doorI = doorID.add(room.center); // cell inside the room
			IntVector2 door = doorID.mult(2).add(room.center); // cell outside of the room
			// get a branch out of this door
			List<IntVector2> branch = randomBranch(door, grid);
			// try five times to get a branch with at least two cell
			for (int j=0; j<5; j++){
				if (branch.Count > 1) break;
				branch = randomBranch (door, grid);
			}
			if (branch.Count < 2) continue;
			IntVector2 end = branch[branch.Count-1]; // the last one in the branch
			if (room.intersects(end)) continue;
			foreach (MazeRoom r in rooms){
				if (r.intersects(end)){
					isIntersecting = true;
					break;
				}
			}
			if (isIntersecting) continue;
			// this room is valid
			room.SecondRoom = new MazeRoom(end);
			rooms.Add (room);
			// color 
			colorBranch(branch, grid);
			colorRoom (room.center, (Color) rooms.Count-1, grid);
			colorRoom (room.SecondRoom.center, Color.BLACK, grid);
			// update grid
			getCell (door, grid).addFamily(getCell(doorI, grid));
			// add door 
			cells[doorI.x, doorI.z].addWall(doorID, true, (Color) rooms.Count-1, getColorMat( (Color) rooms.Count-1));
		}
	}

	/**
	 * These algorithms set up the position of the goal cell
	 * Creates a door at the opposite end of the door from the primary room to the secondary room
	 * It colors the branch in TURQUOISE.
	 */

	// this find where's the entrance of the secondary room
	private IntVector2 findDoor(MazeRoom r, MazeCellVector[,] grid){
		IntVector2 roomC = r.center;
		IntVector2 temp = null;
		for (int i=roomC.x-MazeRoom.sizeX/2; i < roomC.x+MazeRoom.sizeX/2+1; i++){
			for (int j=roomC.z-MazeRoom.sizeZ/2; j < roomC.z+MazeRoom.sizeZ/2+1; j++){
				if (roomC.equals(i,j)) continue;
				if (grid[i,j].children.Count > 0){
					if (temp == null || grid[i,j].children.Contains(temp)){ 
						temp = new IntVector2(i,j);
					}
				}
			}
		}
		return temp;
	}

	// this finds the exit
	private void getEndCell(MazeCellVector[,] grid){
		for (int i = 0; i< RoomNumb ;i++){
			MazeRoom temp = rooms [i].SecondRoom;
			// door at the opposite end 
			IntVector2 enterDoor = findDoor(temp, grid);
			IntVector2 door = new IntVector2(-enterDoor.x, -enterDoor.z);
			List<IntVector2> branch = randomBranch (door, grid);
			// try five times to get a branch with at least two cell
			for (int j=0; j<5; j++){
				if (branch.Count > 1) break;
				branch = randomBranch (door, grid);
			}
			if (branch.Count < 2) continue;
			endCell = branch [branch.Count - 1]; // goal cell
			// check if putting a room there intersects with another room
			bool isIntersecting = false;
			foreach (MazeRoom r in rooms){
				if (r.intersects(endCell)) 
					isIntersecting = true;
			}
			if (isIntersecting) continue;
			// coloring
			colorBranch(branch, grid);
			colorRoom(endCell, Color.TURQUOIS, grid);
			// add door
			cells[door.x, door.z].addWall(branch[0].sub (door), true, Color.TURQUOIS,
			                              getColorMat(Color.TURQUOIS));
			LastRoom = i;
			break;
		}
	}

	/**
	 * The algorithm that generate random maze. 
	 * It first pick the rooms, then the exit, then use the remaining cells to 
	 * generate the braided maze. It sets up the entrance as, from the exit, the furthest end 
	 * of a random branch generated during the process on the condition that it is at most
	 * 5 cells aways from the boarder of the maze. It colors the start with TURQUOISE.
	 */
	private void AldousBroderWilson(MazeCellVector[,] grid){
		roomPartitioner (grid);
		List<IntVector2> frontier = new List<IntVector2>();
		// set up ending position
		getEndCell(grid);
		// find the furthest "leaf" as the starting position
		startCell = endCell;
		int maxDist = 0;
		// iteratively add branches
		frontier.Add (randomRoom (grid));
		IntVector2 temp;
		while (frontier.Count > 0) {
			temp = frontier[Random.Range(0, frontier.Count)];
			frontier.Remove(temp);
			// check if it's connected
			if (getCell(temp, grid).traversed) continue;
			getCell(temp, grid).traversed = true;
			// connect to a parent
			foreach (IntVector2 nb in getDirections(temp, grid)){
				if (getCell(nb, grid).traversed && getCell(nb, grid).color.Equals(Color.WHITE)){
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
			if (leaf.x > width-5 || leaf.x <5 || leaf.z > depth-5 || leaf.z < 5) continue;
			int newDist = endCell.mDistance(leaf);
			if (newDist > maxDist){
				maxDist = newDist;
				startCell = leaf;
			}
		}
		getCell (startCell, grid).color = Color.TURQUOIS;
	}



	/**
	 * Below are for setting up the walls.
	 */

	// Create random doorways for the primary room.
	private void addRoomEntrance(MazeCellVector[,] grid){
		foreach (MazeRoom r in rooms){
			int count = 0;
			float alpha = 1;
			while (count == 0 || Random.value < alpha){
				IntVector2 doorID = r.randomDoor(); // relative position to the center
				IntVector2 doorI = doorID.add(r.center); // cell inside the room
				IntVector2 door = doorID.mult(2).add(r.center); // cell outside of the room
				if (getCell(doorI, grid).children.Count == 0){ // if it wasn't linked to a secondary room
					if (!getCell(door, grid).traversed) continue; // this may happen with small probability
					getCell (door, grid).addFamily(getCell (doorI, grid));
					count += 1;
				}
				alpha *= 0.5f;
			}
		}
	}

	// add walls
	private void addWalls(MazeCellVector[,] grid){
		// add doorways
		addRoomEntrance (grid);
		// for each cell we check its right and bottom neighbours
		IntVector2[] dir = new IntVector2[]{new IntVector2 (0, 1), new IntVector2 (1, 0)};
		for (int i=0; i<width; i++){
			for (int j=0; j<depth; j++){
				foreach (IntVector2 d in dir){
					bool clear = false;
					IntVector2 temp = grid[i,j].coord.add(d); // neighbour coordinate
					if (temp.x >= width || temp.z >= depth) continue;
					if (!grid[i,j].color.Equals(Color.WHITE) && !grid[i,j].color.Equals(Color.TURQUOIS) && 
						getCell (temp, grid).color.Equals(grid[i,j].color)){ // if they are both part of the same room
						clear = true;
					}
					if (!clear){
						foreach (IntVector2 c in grid[i,j].children){ // check children in tree
							if (temp.equals(c)){
								clear = true;
								break;
							}
						}
					}
					if (!clear){ 
						// add wall and color
						cells[i,j].addWall(i, j, d, false, grid[i,j].color, getColorMat(grid[i,j].color));
						cells[temp.x,temp.z].addWall(temp, d.mult(-1), false,  getCell (temp, grid).color, getColorMat(getCell (temp, grid).color));
					}else{ 
						// add wall if cell is at the boarder of the maze
						cells[i,j].addBoarders(i,j, getCell (temp, grid).color, getColorMat(getCell (temp, grid).color));
					}
				}
			}
		}
		// for tile 29, 29
		cells[29,29].addBoarders(29,29, grid[29,29].color, getColorMat(grid[29,29].color));
	}
	
	// the function to call by MazeManager
	public IntVector2 initializeMaze(){
		MazeCellVector[,] grid = initializeMazeCell ();
		AldousBroderWilson (grid);
		addWalls (grid);
		//print (startCell.toString ());
		//print (endCell.toString ());
		//print (rooms [0].center.toString ());
		cells [endCell.x, endCell.z].lowerCeil (roomColors[(int)Color.TURQUOIS], goal, cells [startCell.x, startCell.z].removeCeil ());
		// return center coordinate of the start position
		return new IntVector2(startCell.x*aCell.x + aCell.x/2, 
		                      startCell.z*aCell.z + aCell.z/2);
	}
}