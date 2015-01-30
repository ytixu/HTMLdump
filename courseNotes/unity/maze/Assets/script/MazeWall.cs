using UnityEngine;
using System.Collections;

public class MazeWall : MonoBehaviour {
	public Door door;
	public Maze.Color color = Maze.Color.WHITE;

	public void setColor(Maze.Color c){
		color = c;
	}

	////public void OnTriggerEnter(Collider collider)
	//{	
		//print (collider.collider.name + " " + color.ToString()); 
		//if (color.Equals(Maze.Color.WHITE)) return;
		//if ((collider.name.Equals("PinkBullet") && color.Equals(Maze.Color.PINK)) ||
		 //   (collider.name.Equals("GreenBullet") && color.Equals(Maze.Color.GREEN)) ||
		//    (collider.name.Equals("YellowBullet") && color.Equals(Maze.Color.YELLOW)) ||
		//    (collider.name.Equals("TurqBullet") && color.Equals(Maze.Color.TURQUOIS))){
		//	transform.localScale = Vector3.zero;
		//}
	//}


}
