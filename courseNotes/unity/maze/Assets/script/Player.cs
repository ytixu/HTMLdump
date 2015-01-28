using UnityEngine;
using System.Collections;

public class Player : MonoBehaviour {
	private float speed = 0.3f;

	public Bullet aBullet;

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
		}else if (Input.GetKeyDown(KeyCode.Space)){
			Bullet b = Instantiate(aBullet) as Bullet;
			b.transform.parent = transform;
			b.initTransform();
		}
	}
	void OnCollisionStay(Collision collisionInfo)
	{			
		print (collisionInfo.collider.name);
	}
}
