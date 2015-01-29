﻿using UnityEngine;
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
				item.initTransform(gun.getNuzzlePos(), transform.forward);
				item.fire();
			}else{
				testBullet.initTransform(gun.getNuzzlePos(), transform.forward);
				testBullet.fire();
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
		item.transform.parent = gun.transform;
		item.transform.localPosition = new Vector3(-0.5f, 0.7f, 0);
		item.transform.localScale = new Vector3(0.5f,0.1f,0.5f);
		item.transform.localRotation = Quaternion.Euler(0,0,0);
	}
}
