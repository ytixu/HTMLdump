using UnityEngine;
using System.Collections;

public class Bullet : MonoBehaviour {
	public Maze.Color c;

	private float speed = 0.5f;
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
			//if (transform.localScale.z > 10) return;
			//transform.localScale += new Vector3(transform.localScale.z*speed, transform.localScale.y*speed, transform.localScale.z*speed);
		}
	}

	public void initTransform(Vector3 pos, Vector3 fow){
		aFoward = new Vector3 (fow.x, fow.y, fow.z);
		transform.localScale = new Vector3 (0.25f, 0.25f, 0.25f);
		transform.position = pos;
		transform.localRotation = Quaternion.Euler(0,0,0);
	}

	public void fire(){
		fired = true;
	}
	
	void OnTriggerEnter(Collider collider)
	{	if (fired)
			transform.localScale = Vector3.zero;
		//GUI.Label (textbox, "Hello World!");
		//print (collider.collider.name);//if (collisionInfo.collider.GetType);
	}

	//void OnGUI () {
		//GUI.Label (n "Hello World!");
	//}
}
