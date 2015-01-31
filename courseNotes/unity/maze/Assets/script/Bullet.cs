using UnityEngine;
using System.Collections;

/**
 * The projectile, once fired, deflates when it stops moving. 
 */

public class Bullet : MonoBehaviour {
	public Maze.Color c;

	private float speed = 0.5f;
	private float growSpeed = 0.3f;
	private int mazSize = 5;
	private int minSize = 1;

	private bool fired = false;
	private bool deflated = false;

	private Vector3 aFoward;
	private Vector3 lastPos;
	
	// Update is called once per frame
	void Update () {
		if (fired){
			if(deflated){
				transform.localScale -= new Vector3(transform.localScale.z*growSpeed, 
				                                    transform.localScale.y*growSpeed, 
				                                    transform.localScale.z*growSpeed);
				if (transform.localScale.z < minSize){
					tag = "deflated";
					fired = false;
					return;
				}
				return;
			}
			Vector3 dPos = lastPos - transform.position;
			print (dPos.ToString());
			if (dPos.magnitude < 0.01){
				deflated = true;
				return;
			}
			lastPos = transform.position;
			transform.position += aFoward*speed;
			if (transform.localScale.z > mazSize) return;
			transform.localScale += new Vector3(transform.localScale.z*growSpeed, 
			                                    transform.localScale.y*growSpeed, 
			                                    transform.localScale.z*growSpeed);
		}
	}

	public void fire(Vector3 pos, Vector3 fow){
		tag = c.ToString ();
		aFoward = new Vector3 (fow.x, fow.y, fow.z);
		transform.localScale = new Vector3 (0.1f, 0.1f, 0.1f);
		transform.position = pos;
		transform.localRotation = Quaternion.identity;
		fired = true;
	}

	void OnCollisionEnter(Collision collision)
	{
		if (deflated) return;
		print ("COL " + collision.collider.name);
		if(collision.collider.tag==c.ToString()+"_w"){
			print ("COLLISION");
			collision.collider.transform.localScale = Vector3.zero;
		}
	}
}
