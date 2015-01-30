using UnityEngine;
using System.Collections;

public class Door : MonoBehaviour {

	void OnCollisionEnter(Collision collision)
	{
		print ("COL " + collision.collider.name);
		if(collision.collider.tag==tag){
			print ("COLLISION");
			transform.localScale = Vector3.zero;
		}
	}
}
