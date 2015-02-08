using UnityEngine;
using System.Collections;

/**
 * This stores a set of two connected rooms. 
 * for 3x3 rooms
 */

public class MazeRoom {
	// size of the room 
	public static int sizeX = 3;
	public static int sizeZ = 3;

	public IntVector2 center; // center of primary room
	private MazeRoom secondRoom; // secondary room (if this object is a primary room)
	
	public MazeRoom(IntVector2 v){
		center = new IntVector2 (v);
	} 

	public MazeRoom SecondRoom{
		get{ return secondRoom;}
		set{ secondRoom = value;}
	}

	// generate a random cell at the middle of any of the 4 walls as a door;
	public IntVector2 randomDoor(){
		int x = 0;
		int z = 0;
		if (Random.value < 0.5){
			if (Random.value < 0.5){
				x = -1;
			}else{
				x = 1;
			}
		}else{
			if (Random.value < 0.5){
				z = -1;
			}else{
				z = 1;
			}
		}
		return new IntVector2 (x, z);
	}
	
	// check if two rooms are intersecting
	// input is assumed to be another center of a room
	public bool intersects(IntVector2 v){
		if (Mathf.Abs (center.x - v.x) < sizeX || 
			Mathf.Abs (center.z - v.z) < sizeZ){
			return true;
		}else if (secondRoom != null && secondRoom.intersects(v))
					return true;
		return false;
	}
}
