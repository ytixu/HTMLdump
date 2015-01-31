using UnityEngine;
using System.Collections;

public class Door : MonoBehaviour {
	public MazeManager mm;

	void OnCollisionEnter(Collision collision)
	{
		print ("COL " + collision.collider.name);
		if(collision.collider.tag+"_w"==tag){
			print ("COLLISION");
			transform.localScale = Vector3.zero;
			mm.updateScore(1);
		}
	}
}
