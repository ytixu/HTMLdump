using UnityEngine;
using System.Collections;

public class Door : MonoBehaviour {
	public MazeManager mm;

	/**
	 * If hit by a projectile of the same color, then open. 
	 */
	void OnCollisionEnter(Collision collision)
	{
		if(collision.collider.tag+"_w"==tag){
			transform.localScale = Vector3.zero;
			mm.updateScore(1);
		}
	}
}
