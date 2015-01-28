using UnityEngine;
using System.Collections;

public class MazeRoom {
	public static int sizeX = 3;
	public static int sizeZ = 3;
	public IntVector2 center;
	public IntVector2 secondCenter; // secondary room

	private static IntVector2[] secondRoomPos = null;

	public MazeRoom(IntVector2 v, IntVector2 sv){
		center = new IntVector2 (v);
		secondCenter = new IntVector2 (sv);
	} 

	private IntVector2 randomDoor(int lowX, int highX, int lowZ, int highZ){
		if (lowX < 1) lowX = 1;
		if (highX > Maze.width-1) highX = Maze.width-2;
		if (lowZ < 1) lowZ = 1;
		if (highZ > Maze.depth-1) highZ = Maze.depth-2;
		return new IntVector2 (Random.Range (lowX, highX), 
		                   Random.Range (lowZ, highZ));
	}

	public IntVector2 randomRoomDoor(){
		int lowX = center.x - sizeX / 2;
		int highX = center.x + sizeX / 2 + 1;
		int lowZ = center.z - sizeZ / 2;
		int highZ = center.z - sizeZ / 2 + 1;
		if (center.x < secondCenter.x) highX -= 1;
		if (center.x > secondCenter.x) lowX += 1;
		if (center.z < secondCenter.z) highZ -= 1;
		if (center.z > secondCenter.z) lowZ += 1;
		return randomDoor (lowX, highX, lowZ, highZ);
	}

	public IntVector2[] randomSecondRoomDoor(){
		// this only works for 3x3 rooms
		int dX = center.x - secondCenter.x;
		int dZ = center.z - secondCenter.z;
		int inv;
		if ((int)Mathf.Abs (dX) == 3){
			inv = Random.Range((int)Mathf.Min(center.z, secondCenter.z), 
			                               (int)Mathf.Max(center.z, secondCenter.z));
			return new IntVector2[]{new IntVector2(center.x - dX/2, inv),
									new IntVector2(center.x - dX/3*2, inv)};
		}
		inv = Random.Range((int)Mathf.Min(center.x, secondCenter.x),
			                       (int)Mathf.Max(center.x, secondCenter.x));
		return new IntVector2[]{new IntVector2(inv, center.z - dZ/2),
									new IntVector2(inv, center.z - dZ/3*2)};
	} 

	// get all the possible relative positions where we can add the secondary room
	public static IntVector2[] getSecondPos(){
		if (secondRoomPos == null){
			secondRoomPos = new IntVector2[2*sizeX+2*sizeZ];
			for (int i=0; i<sizeX; i++){
				secondRoomPos[i] = new IntVector2(i-sizeX/2, sizeZ/2+2);
				secondRoomPos[sizeX+i] = new IntVector2(i-sizeX/2, -sizeZ/2-2);
			}
			for (int j=0; j<sizeZ; j++){
				secondRoomPos[2*sizeX+j] = new IntVector2(sizeX/2+2, j-sizeZ/2);
				secondRoomPos[2*sizeX+sizeZ+j] = new IntVector2(-sizeX/2-2, j-sizeZ/2);
			}
		}
		IntVector2.shuffle(secondRoomPos);
		return secondRoomPos;
	}

	public bool intersects(IntVector2 v){
		if (Mathf.Abs (center.x - v.x) < sizeX || 
			Mathf.Abs (center.z - v.z) < sizeZ || 
		    Mathf.Abs (secondCenter.x - v.x) < sizeX || 
		    Mathf.Abs (secondCenter.z - v.z) < sizeZ)
					return true;
		return false;
	}
}
