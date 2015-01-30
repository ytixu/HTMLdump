﻿using UnityEngine;
using System.Collections;

public class Bullet : MonoBehaviour {
	public Maze.Color c;

	private float speed = 0.5f;
	private float growSpeed = 0.3f;
	private int mazSize = 5;
	private int minSize = 1;

	private bool fired = false;
	private bool deflating = false;

	private Vector3 aFoward;
	private Vector3 lastPos;

	private Rect textbox = new Rect (10f, 10f, 100f, 20f);

	// Use this for initialization
	void Start () {

	}
	
	// Update is called once per frame
	void Update () {
		if (fired){
			Vector3 dPos = lastPos - transform.position;
			print (dPos.ToString());
			if (dPos.magnitude < 0.01){
				deflate();
				return;
			}
			lastPos = transform.position;
			transform.position += aFoward*speed;
			if (transform.localScale.z > mazSize) return;
			transform.localScale += new Vector3(transform.localScale.z*growSpeed, 
			                                    transform.localScale.y*growSpeed, 
			                                    transform.localScale.z*growSpeed);
		}else if(deflating){
			if (transform.localScale.z < minSize){
				deflating = false;
				return;
			}
			transform.localScale -= new Vector3(transform.localScale.z*growSpeed, 
				                                transform.localScale.y*growSpeed, 
				                                transform.localScale.z*growSpeed);
		}
	}

	public void fire(Vector3 pos, Vector3 fow){
		aFoward = new Vector3 (fow.x, fow.y, fow.z);
		transform.localScale = new Vector3 (0.1f, 0.1f, 0.1f);
		transform.position = pos;
		transform.localRotation = Quaternion.identity;
		fired = true;
	}

	public void deflate(){
		deflating = true;
		fired = false;
	}

	void OnCollisionEnter(Collision collision)
	{
		print ("COL " + collision.collider.name);
		if(collision.collider.tag==c.ToString()){
			print ("COLLISION");
			collision.collider.transform.localScale = Vector3.zero;
		}
	}

	//void OnTriggerEnter(Collider collider)
	//{	
	//	if (fired && collider.tag.Equals(tag)){
	//		print ("COLLISION");
	//		collider.transform.localScale = Vector3.zero;
	//	}
		//GUI.Label (textbox, "Hello World!");
		//print (collider.collider.name);//if (collisionInfo.collider.GetType);
	//}

	//void OnGUI () {
		//GUI.Label (n "Hello World!");
	//}
}
