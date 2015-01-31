using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class Player : MonoBehaviour {
	public Status stat;
	public Gun gun;
	public MazeManager mm;
	
	private float speed = 0.4f;
	private Bullet item = null;

	public Bullet testBullet;


	// Use this for initialization
	void Start () {
		stat.update ("The world is going against you.");
		stat.update ("You see no where else to go except that empty swimming pool.");
	}
		
		// Update is called once per frame
	void Update () {
		if (Input.GetKey (KeyCode.UpArrow)) {
			updatePos(transform.position + transform.forward*speed);
		} else if (Input.GetKey (KeyCode.DownArrow)) {
			updatePos(transform.position - transform.forward*speed);
		} else if (Input.GetKey (KeyCode.LeftArrow)) {
			transform.Rotate (new Vector3 (0, -1, 0));
		}else if (Input.GetKey (KeyCode.RightArrow)){
			transform.Rotate(new Vector3(0,1,0));
		}
	}

	private void updatePos(Vector3 newPos){
		if (Mathf.Abs(newPos.x) < 700 && Mathf.Abs(newPos.z) < 700){
			transform.position = newPos;
		}else{
			stat.update ("You're going too far in this small universe.");
		}
	}

	public Bullet fire(){
		if (item != null){
			Bullet b = item;
			item.rigidbody.useGravity = true;
			item.rigidbody.WakeUp();
			item.fire(gun.getNuzzlePos(), transform.forward);
			item = null;
			gun.disload();
			mm.updateScore(-1);
			return b;
		}else{
			// for testing
			//testBullet.fire(gun.getNuzzlePos(), transform.forward);
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
		stat.emptyQueue();
		stat.update ("So pretty~~ This must be used for something important. CLINK to fire (when you need to) and press \",\" to drop.");
	}



	void OnTriggerEnter(Collider collision)
	{
		if (collision.collider.tag == "bullet"){
				//stat.emptyQueue();
				stat.update ("This big ball looks perfect to fit your pink gun. Try press \".\" to pick it up.");
		}else if (collision.collider.tag == "YELLOW_w" || 
		          collision.collider.tag == "GREEN_w" || 
		          collision.collider.tag == "PINK_w" || 
		          collision.collider.tag == "TURQUOIS_w"){
			//stat.emptyQueue();
			stat.update ("The color of the door boarder is the same as your gun. So pretty~~ :3");
			if (item == null){
				stat.update ("Unfortunartely your gun is empty now.");
			}
		}else if (collision.collider.tag == "deflated"){
			stat.update ("Deflated, it can no longer fit your gun.");
			mm.checkScore();
		}else if (collision.collider.tag == "Finish"){
			stat.update ("The end! Finally free~~~");
		}
	}
}
