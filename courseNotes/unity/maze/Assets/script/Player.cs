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
		}
	}
	//void OnCollisionStay(Collision collisionInfo)
	//{			
	//	print (collisionInfo.collider.name);
	//}

	public Bullet fire(){
		if (item != null){
			Bullet b = item;
			item.rigidbody.useGravity = true;
			item.rigidbody.WakeUp();
			item.fire(gun.getNuzzlePos(), transform.forward);
			item = null;
			gun.disload();
			return b;
		}else{
			// for testing
			testBullet.fire(gun.getNuzzlePos(), transform.forward);
			return null;
		}
	}

	public Bullet drop(){
		print ("Dropping");
		if (item!= null){
			Bullet t = item;
			t.rigidbody.useGravity = true;
			t.rigidbody.WakeUp();
			item = null;
			gun.disload();
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
