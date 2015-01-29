using UnityEngine;
using System.Collections;

public class Player : MonoBehaviour {
	private float speed = 0.3f;

	private Bullet item = null;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetKey (KeyCode.UpArrow)) {
			transform.localPosition += transform.forward*speed;
		} else if (Input.GetKey (KeyCode.DownArrow)) {
			transform.localPosition -= transform.forward*speed;
		} else if (Input.GetKey (KeyCode.LeftArrow)) {
			transform.Rotate (new Vector3 (0, -1, 0));
		}else if (Input.GetKey (KeyCode.RightArrow)){
			transform.Rotate(new Vector3(0,1,0));
		}else if (Input.GetMouseButton(0)){
			if (item != null){
				item.transform.parent = transform;
				item.initTransform();
				item.fire();
			}
		}
	}
	//void OnCollisionStay(Collision collisionInfo)
	//{			
	//	print (collisionInfo.collider.name);
	//}

	public void drop(Maze m){
		print ("Dropping");
		if (item!= null){
			item.transform.parent = m.transform;
			item.transform.position = new Vector3(transform.position.x, transform.position.y, transform.position.z);
		}
	}

	public void pickUp(Bullet b){
		print ("Picking");
		item = b;
	}
}
