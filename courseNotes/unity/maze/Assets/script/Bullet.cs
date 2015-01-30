using UnityEngine;
using System.Collections;

public class Bullet : MonoBehaviour {
	public Maze.Color c;

	private float speed = 0.5f;
	private float growSpeed = 0.3f;
	private bool fired;
	private Vector3 aFoward;

	private Rect textbox = new Rect (10f, 10f, 100f, 20f);

	// Use this for initialization
	void Start () {

	}
	
	// Update is called once per frame
	void Update () {
		if (fired){
			transform.position += aFoward*speed;
			if (transform.localScale.z > 5) return;
			transform.localScale += new Vector3(transform.localScale.z*growSpeed, 
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
	
	void OnTriggerEnter(Collider collider)
	{	
		if (fired && collider.tag.Equals(tag)){
			print ("COLLISION");
			collider.transform.localScale = Vector3.zero;
		}
		//GUI.Label (textbox, "Hello World!");
		//print (collider.collider.name);//if (collisionInfo.collider.GetType);
	}

	//void OnGUI () {
		//GUI.Label (n "Hello World!");
	//}
}
