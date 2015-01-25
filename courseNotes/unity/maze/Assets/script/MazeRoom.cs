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
		if (lowX < 0) lowX = 0;
		if (highX > Maze.width) highX = Maze.width-1;
		if (lowZ < 0) lowZ = 0;
		if (highZ > Maze.depth) highZ = Maze.depth-1;
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

	public IntVector2 randomSecondRoomDoor(){
		int lowX = center.x - sizeX / 2;
		int highX = center.x + sizeX / 2 + 1;
		int lowZ = center.z - sizeZ / 2;
		int highZ = center.z - sizeZ / 2 + 1;
		if (center.x < secondCenter.x) lowX = highX;
		if (center.x > secondCenter.x) highX = lowX;
		if (center.z < secondCenter.z) lowZ = highZ;
		if (center.z > secondCenter.z) highZ = lowZ;
		return randomDoor (lowX, highX, lowZ, highZ);
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
