using UnityEngine;
using System.Collections;

public class Player : MonoBehaviour {
	public Status stat;
	public Gun gun;

	private float speed = 0.4f;

	private Bullet item = null;

	public Bullet testBullet;

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
				item.rigidbody.useGravity = true;
				item.rigidbody.WakeUp();
				item.fire(gun.getNuzzlePos(), transform.forward);
			}else{
				testBullet.fire(gun.getNuzzlePos(), transform.forward);
			}
		}
	}
	//void OnCollisionStay(Collision collisionInfo)
	//{			
	//	print (collisionInfo.collider.name);
	//}

	public Bullet drop(){
		print ("Dropping");
		if (item!= null){
			Bullet t = item;
			t.rigidbody.useGravity = true;
			t.rigidbody.WakeUp();
			item = null;
			return t;
		}
		return null;
	}

	public void pickUp(Bullet b){
		print ("Picking");
		item = b;
		b.rigidbody.useGravity = false;
		b.rigidbody.Sleep();
		b.transform.localScale = Vector3.zero;
		gun.loadBullet (b);
	}
}
