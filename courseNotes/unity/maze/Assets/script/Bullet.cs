using UnityEngine;
using System.Collections;

public class Bullet : MonoBehaviour {
	public Maze.Color c;

	private float speed = 0.3f;
	private bool fired;

	private Rect textbox = new Rect (10f, 10f, 100f, 20f);

	// Use this for initialization
	void Start () {

	}
	
	// Update is called once per frame
	void Update () {
		if (fired){
			transform.position += transform.forward*speed;
		}
	}

	public void initTransform(){
		transform.localScale = new Vector3 (0.5f, 0.25f, 0.5f);
		transform.localPosition = new Vector3(0.5f, 0.55f, 1f);
		transform.localRotation = Quaternion.Euler(0,0,0);
	}

	public void fire(){
		fired = true;
	}

	void OnCollisionStay(Collision collisionInfo)
	{		
		GUI.Label (textbox, "Hello World!");
		print (collisionInfo.collider.name);//if (collisionInfo.collider.GetType);
	}

	void OnGUI () {
		//GUI.Label (n "Hello World!");
	}
}
